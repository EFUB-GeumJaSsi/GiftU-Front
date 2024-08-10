import { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { postFundingJoin } from '../../api/funding';
import FundingJoinPage from './FundingJoinPage';
import CompletePage from './CompletePage';
import PaymentLandingPage from './PaymentLandingPage';
import HomePage from '../Home/HomePage';

// 데이터 관리
const DataContext = createContext();
const DataProvider = ({ children }) => {
  const sessionData = JSON.parse(sessionStorage.getItem('fundingData'));
  const [fundingJoinData, setFundingJoinData] = useState(
    sessionData
      ? sessionData
      : {
          fundingId: null,
          contributionAmount: null,
          anonymity: null,
          message: '',
        },
  );
  const [errorMsg, setErrorMsg] = useState('');
  const [toastShow, setToastShow] = useState(false);

  return (
    <DataContext.Provider
      value={{
        fundingJoinData,
        setFundingJoinData,
        errorMsg,
        setErrorMsg,
        toastShow,
        setToastShow,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// 페이지 관리
const PageContext = createContext();
const PageProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const imp_success = searchParams.get('imp_success');
  const [currentPage, setCurrentPage] = useState(
    imp_success ? 'PaymentLandingPage' : 'FundingJoinPage',
  );

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
      console.error(e);
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
        sessionStorage.clear();
        return <CompletePage />;
      } else {
        return <FundingJoinPage />;
      }
    default:
      sessionStorage.clear();
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
