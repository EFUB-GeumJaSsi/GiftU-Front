import styled from 'styled-components';
import { createContext, useContext, useState, useEffect } from 'react';
import { postFunding } from '../../api/funding';
import GiftSetPage from './GiftSetPage';
import GiftAddPage from './GiftAddPage';
import FundingSetPage from './FundingSetPage';
import PasswordSetPage from './PasswordSetPage';
import CompletePage from './CompletePage';
import HomePage from '../Home/HomePage';
import SpinnerComponent from '../../components/common/SpinnerComponent';
import ToastComponent from '../../components/common/ToastComponent';

// 데이터 관리
const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [fundingData, setFundingData] = useState({});
  const [giftData, setGiftData] = useState([]);
  const [imageData, setImageData] = useState([]);

  return (
    <DataContext.Provider
      value={{
        fundingData,
        setFundingData,
        giftData,
        setGiftData,
        imageData,
        setImageData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// 페이지 관리
const PageContext = createContext();
const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('GiftSetPage');

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};

const PageRenderer = () => {
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const { fundingData, giftData, imageData } = useContext(DataContext);
  const [toastShow, setToastShow] = useState(false);

  const handleFundingSubmit = async () => {
    const request = { ...fundingData, gifts: giftData };
    try {
      const response = await postFunding(request, imageData);
      setCurrentPage('CompletePage');
    } catch (error) {
      console.error('펀딩 생성 오류', error);
      setToastShow(true);
      setCurrentPage('HomePage');
      window.history.replaceState(null, null, '/home');
    }
  };

  useEffect(() => {
    if (currentPage === 'Submit') handleFundingSubmit();
  }, [currentPage]);

  const Page = () => {
    switch (currentPage) {
      case 'GiftSetPage':
        return <GiftSetPage />;
      case 'GiftSetPage-back':
        return (
          <GiftSetPage
            lastGiftData={giftData[giftData.length - 1]}
            lastImageData={imageData[imageData.length - 1]}
          />
        );
      case 'GiftAddPage':
        return <GiftAddPage />;
      case 'FundingSetPage':
        return <FundingSetPage />;
      case 'PasswordSetPage':
        return <PasswordSetPage />;
      case 'Submit':
        return (
          <SLayout>
            <SpinnerComponent />
          </SLayout>
        );
      case 'CompletePage':
        return <CompletePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      {Page()}
      {toastShow && (
        <ToastComponent setToastShow={setToastShow}>
          {`펀딩 개설을 실패했어요.\n다시 시도해 주세요.`}
        </ToastComponent>
      )}
    </>
  );
};

const IndexPage = () => {
  return (
    <DataProvider>
      <PageProvider>
        <PageRenderer />
      </PageProvider>
    </DataProvider>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

export default IndexPage;
export { DataContext, PageContext };
