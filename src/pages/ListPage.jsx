import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FundingComponent from '../components/common/FundingComponent';
import TagSelectComponent from '../components/common/TagSelectComponent';
import BackHeader from '../components/common/BackHeader';

const ListPage = ({ headerText, buttons, message }) => {
  const [data, setData] = useState([]);
  const FundingList = [
    {
      image: '',
      title: '펀딩 제목은 두 줄까지 보여요 가나다라마바사 아자차카',
      name: '김이화',
      endDate: '2024.09.01',
      isOngoing: false,
    },
    {
      image: '',
      title: '펀딩 제목은 두 줄까지 보여요',
      name: '김이화',
      endDate: '2024.09.01',
      isOngoing: false,
    },
    {
      image: '',
      title: '펀딩 제목은 두 줄까지 보여요',
      name: '김이화',
      endDate: '2024.09.01',
      isOngoing: false,
    },
    {
      image: '',
      title: '펀딩 제목은 두 줄까지 보여요',
      name: '김이화',
      endDate: '2024.09.01',
      isOngoing: false,
    },
  ];

  useEffect(() => {
    setData(FundingList);
  }, []);

  const { pathname } = useLocation();
  const filter = getFilter(pathname);

  const filteredResults = filterResults(data, filter);

  console.log({ headerText });
  return (
    <SLayout>
      <BackHeader text={headerText} />
      <SNotiItemWrapper>
        <TagSelectComponent buttons={buttons} />
      </SNotiItemWrapper>
      <SListWrapper>
        <FundingComponent results={filteredResults} message={message} />
      </SListWrapper>
    </SLayout>
  );
};

const getFilter = (pathname) => {
  switch (pathname) {
    case '/isOngoing':
      return '진행';
    case '/end':
      return '종료';
    default:
      return '전체';
  }
};

const filterResults = (data, filter) => {
  return data.filter((result) => {
    if (filter === '전체') return true;
    if (filter === '진행') return result.isOngoing;
    if (filter === '종료') return !result.isOngoing;
    return false;
  });
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SNotiItemWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 20px;
`;

const SListWrapper = styled.div`
  margin: 0 auto;
`;

export default ListPage;