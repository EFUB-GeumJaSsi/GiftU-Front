import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../../assets/common/search.svg';
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
const SearchResults = ({ results }) => {
  return (
    <SResultsContainer>
      {results.length === 0 ? (
        <SNoresultsWrapper>'검색결과가 없어요'</SNoresultsWrapper>
      ) : (
        results.map((result, index) => (
          <SResultItem key={index}>
            <SImageWrapper>
              <img src={result.image}></img>
            </SImageWrapper>
            <SContentWrapper>
              <div id='title'>{result.title}</div>
              <div id='name'>
                <SBoldWrapper>개설</SBoldWrapper> {result.name}
              </div>
              <div id='endDate'>
                <SBoldWrapper>마감</SBoldWrapper>
                {result.endDate}
              </div>
              <div id='tag'>
                <div id='stateTag'>{result.stateTag}</div>
                <div id='isFriend'>{result.isFriend}</div>
              </div>
            </SContentWrapper>
          </SResultItem>
        ))
      )}
    </SResultsContainer>
  );
};
export default SearchPage;
SearchResults;

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
  height: 22px;
  width: 210px;
  size: 16px;
  weight: 500;
  margin-left: 5px;
  background-color: #f3f4f5;
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
const SResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
const SNoresultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  color: var(--gray-500);
`;
const SResultItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  height: 136px;
  width: 335px;
  img {
    width: 120px;
    height: 120px;
    background-color: var(--gray-300);
    border-radius: 16px;
  }
`;

const SImageWrapper = styled.div``;
const SContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  #title {
    font-weight: 700;
    font-size: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  #name {
    display: flex;
    flex-direction: row;
    gap: 4px;
  }
  #endDate {
    display: flex;
    flex-direction: row;
    gap: 4px;
  }
  #tag {
    display: flex;
    flex-direction: row;
    gap: 7px;
    margin-top: 3px;
    #stateTag {
      background-color: var(--jade-sec);
      color: var(--jade-pri);
      border-radius: 20px;
      padding: 4px 8px 4px 8px;
    }
    #isFriend {
      background-color: var(--orange-sec);
      color: var(--orange-pri);
      border-radius: 20px;
      padding: 4px 8px 4px 8px;
    }
  }
`;
const SBoldWrapper = styled.div`
  color: var(--gray-500);
  font-weight: 500;
`;
