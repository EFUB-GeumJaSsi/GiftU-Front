import { createContext, useContext, useState, useEffect } from 'react';
import GiftSetPage from './GiftSetPage';
import GiftAddPage from './GiftAddPage';
import FundingSetPage from './FundingSetPage';
import PasswordSetPage from './PasswordSetPage';
import CompletePage from './CompletePage';
import HomePage from '../Home/HomePage';
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
  const { currentPage } = useContext(PageContext);
  const { fundingData, giftData, imageData } = useContext(DataContext);

  const handleFundingSubmission = async () => {
    console.log('펀딩데이터', fundingData);
    console.log('선물데이터', giftData);
    console.log('이미지데이터', imageData);
    const request = { ...fundingData, gifts: giftData };
    console.log('request', request);
    try {
      const response = await postFunding(request, imageData);
      console.log('response', response);
      console.log('펀딩 생성 성공', response.data);
      setCurrentPage('HomePage');
    } catch (error) {
      console.error('펀딩 생성 오류', error);
    }
  };

  useEffect(() => {
    if (currentPage === 'CompletePage') {
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
