import { createContext, useContext, useState, useEffect } from 'react';
import GiftSetPage from './GiftSetPage';
import GiftAddPage from './GiftAddPage';
import FundingSetPage from './FundingSetPage';
import PasswordSetPage from './PasswordSetPage';
import CompletePage from './CompletePage';
import HomePage from '../Home/HomePage';
import ToastComponent from '../../components/common/ToastComponent';
import { postFunding } from '../../api/funding';

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
  const [setToastShow] = useState(false);

  useEffect(() => {
    if (currentPage === 'CompletePage') {
      const handleFundingSubmission = async () => {
        const request = { ...fundingData, gifts: giftData };
        try {
          const response = await postFunding(request, imageData);
          console.log('펀딩 생성 성공', response.data);
        } catch (error) {
          console.error('펀딩 생성 오류', error);
          setCurrentPage('HomePage');
          setToastShow(true);
        }
      };

      handleFundingSubmission();
    }
  }, [currentPage]);

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
    case 'CompletePage':
      return <CompletePage />;
    default:
      return <HomePage />;
  }
};

const IndexPage = () => {
  const [toastShow, setToastShow] = useState(false);

  return (
    <>
      <DataProvider>
        <PageProvider>
          <PageRenderer />
        </PageProvider>
      </DataProvider>
      {toastShow && (
        <ToastComponent setToastShow={setToastShow}>
          펀딩 개설에 실패했어요.
        </ToastComponent>
      )}
    </>
  );
};

export default IndexPage;
export { DataContext, PageContext };
