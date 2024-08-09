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
  const [dir, setDir] = useState(true);

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage, dir, setDir }}>
      {children}
    </PageContext.Provider>
  );
};

const PageRenderer = () => {
  const { currentPage, setCurrentPage, dir } = useContext(PageContext);
  const { fundingData, giftData, imageData } = useContext(DataContext);
  const [toastShow, setToastShow] = useState(false);

  const handleFundingSubmission = async () => {
    const request = { ...fundingData, gifts: giftData };
    try {
      const response = await postFunding(request, imageData);
      console.log('펀딩 생성 성공', response.data);
      setCurrentPage('CompletePage');
    } catch (error) {
      console.error('펀딩 생성 오류', error);
      setCurrentPage('HomePage');
      setToastShow(true);
    }
  };

  useEffect(() => {
    if (dir === false) {
      handleFundingSubmission();
    }
  }, [dir]);

  return (
    <>
      {currentPage === 'GiftSetPage' && <GiftSetPage />}
      {currentPage === 'GiftSetPage-back' && (
        <GiftSetPage
          lastGiftData={giftData[giftData.length - 1]}
          lastImageData={imageData[giftData.length - 1]}
        />
      )}
      {currentPage === 'GiftAddPage' && <GiftAddPage />}
      {currentPage === 'FundingSetPage' && <FundingSetPage />}
      {currentPage === 'PasswordSetPage' && <PasswordSetPage />}
      {currentPage === 'CompletePage' && <CompletePage />}
      {currentPage === 'HomePage' && <HomePage />}

      {toastShow && (
        <ToastComponent setToastShow={setToastShow}>
          펀딩 개설에 실패했어요.
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

export default IndexPage;
export { DataContext, PageContext };
