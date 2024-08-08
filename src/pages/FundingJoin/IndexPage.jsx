import { createContext, useContext, useState } from 'react';
import { postFundingJoin } from '../../api/funding';
import FundingJoinPage from './FundingJoinPage';
import CompletePage from './CompletePage';
import PaymentLandingPage from './PaymentLandingPage';

// 데이터 관리
const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [fundingJoinData, setFundingJoinData] = useState({
    fundingId: null,
    contributionAmount: null,
    anonymity: null,
    message: '',
  });

  return (
    <DataContext.Provider
      value={{
        fundingJoinData,
        setFundingJoinData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// 페이지 관리
const PageContext = createContext();
const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('FundingJoinPage');

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};
const PageRenderer = () => {
  const { currentPage } = useContext(PageContext);
  const { fundingJoinData } = useContext(DataContext);

  // 펀딩 참여 데이터 전달
  const createFundingJoin = async () => {
    try {
      await postFundingJoin(
        fundingJoinData.fundingId,
        fundingJoinData.contributionAmount,
        fundingJoinData.anonymity,
        fundingJoinData.message,
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  switch (currentPage) {
    case 'FundingJoinPage':
      return <FundingJoinPage />;
    case 'PaymentLandingPage':
      return <PaymentLandingPage />;
    case 'CompletePage':
      const res = createFundingJoin();
      if (res) {
        return <CompletePage />;
      } else {
        return <FundingJoinPage />;
      }
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
