import { createContext, useContext, useState } from 'react';
import FundingJoinPage from './FundingJoinPage';
import CompletePage from './CompletePage';

// 데이터 관리
const DataContext = createContext();
const DataProvider = ({ children }) => {
  // 데이터

  return (
    <DataContext.Provider
      value={
        {
          // 데이터
        }
      }
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

  switch (currentPage) {
    case 'FundingJoinPage':
      return <FundingJoinPage />;
    case '결제랜딩페이지':
      // 랜딩 페이지 만들 때 SpinnerComponent 쓰세요 빙글빙글 돌아갑니다
      return;
    case 'CompletePage':
      // 결제 후에 펀딩 참여 POST
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
