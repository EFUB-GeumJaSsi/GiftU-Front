import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../../assets/common/search.svg';
import SearchResults from '../../components/Home/SearchResults';
const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const Results = [
    {
      image: '',
      title:
        '두 줄보다 긴 펀딩 제목은 이렇게 보이도록 설정할 거예요 ㅎㅎㅎㅎㅎㅎㅎ',
      name: '김이화',
      endDate: '2024.09.16',
      stateTag: '진행중',
      isFriend: '친구',
    },
    {
      image: '',
      title:
        '두 줄보다 긴 펀딩 제목은 이렇게 보이도록 설정할 거예요 제목입니다제목입니다 이 제목은 두 줄이 넘습니다',
      name: '김이화',
      endDate: '2024.09.16',
      stateTag: '진행중',
      isFriend: '친구',
    },
  ];
  const onChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      setResults([]);
    } else {
      setResults(Results);
    }
  };
  return (
    <SLayout>
      <SSearchContainer>
        <SSearchBoxContainer>
          <Search></Search>
          <STextBoxWrapper
            type='text'
            placeholder='펀딩 이름,친구를 검색해보세요'
            value={search}
            onChange={onChange}
          ></STextBoxWrapper>
        </SSearchBoxContainer>
        <SBtnWrapper>닫기</SBtnWrapper>
      </SSearchContainer>
      <HLine></HLine>
      <SearchResults results={results}></SearchResults>
    </SLayout>
  );
};

export default SearchPage;

const SLayout = styled.div``;
const SSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const SSearchBoxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 280px;
  height: 40px;
  margin-top: 40px;
  padding-left: 15px;
  border-radius: 40px;
  background-color: #f3f4f5;
`;
const STextBoxWrapper = styled.input`
  width: 210px;
  height: 22px;
  size: 16px;
  margin-left: 5px;
  background-color: #f3f4f5;
  weight: 500;
`;
const SBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 44px;
  height: 38px;
  margin-top: 43px;
  margin-left: 6px;
  padding: 8px;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
`;
const HLine = styled.div`
  width: 375px;
  border: 1px solid #f3f4f5;
  margin-bottom: 10px;
`;
