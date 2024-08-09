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

  const handleFundingSubmission = async () => {
    const request = { ...fundingData, gifts: giftData };
    try {
      const response = await postFunding(request, imageData);
      console.log('펀딩 생성 성공', response.data);
      setCurrentPage('CompletePage');
    } catch (error) {
      console.error('펀딩 생성 오류', error);
      setCurrentPage('HomePage');

      setTimeout(() => {
        alert('펀딩 생성에 실패했어요. 펀딩을 다시 만들어주세요.');
      }, 0);
    }
  };

  useEffect(() => {
    if (dir === false) {
      handleFundingSubmission();
    }
  }, [dir]);

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
