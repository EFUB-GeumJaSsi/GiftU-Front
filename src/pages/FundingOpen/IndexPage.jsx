import { createContext, useContext, useState } from 'react';
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
  const { giftData, imageData } = useContext(DataContext);

  /*여기부터 이찬희 작성*/
  const handleFundingSubmission = async () => {
    const request = { ...fundingData, gifts: giftData };
    try {
      const response = await postFunding(request, imageData);
      console.log('펀딩 생성 성공', response.data);
      setCurrentPage('HomePage');
    } catch (error) {
      console.error('펀딩 생성 오류', error);
    }
  };
  /*여기까지*/

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
      /*여기부터 이찬희 작성*/
      handleFundingSubmission();
      /*여기까지*/
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
