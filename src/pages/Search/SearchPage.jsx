import styled from 'styled-components';
import { useState } from 'react';
import TagComponent from '../../components/common/TagComponent';
import search from '../../assets/common/search.svg';

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
    },
    {
      image: '',
      title:
        '두 줄보다 긴 펀딩 제목은 이렇게 보이도록 설정할 거예요 제목입니다제목입니다 이 제목은 두 줄이 넘습니다',
      name: '김이화',
      endDate: '2024.09.16',
      stateTag: '진행중',
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
      <SHeader>
        <SInput
          type='search'
          name='q'
          placeholder='펀딩 이름, 친구를 검색해 보세요'
          value={search}
          onChange={onChange}
        />
        <SExitBtn>닫기</SExitBtn>
      </SHeader>
      {results.length === 0 ? (
        <SNoResultsP>검색 결과가 없어요</SNoResultsP>
      ) : (
        <SOl>
          {results.map((result, index) => (
            <SResultItem key={index}>
              <SImg src={result.image} />
              <SContentWrapper>
                <div id='title'>{result.title}</div>
                <div id='name'>
                  <SBoldWrapper>개설</SBoldWrapper> {result.name}
                </div>
                <div id='endDate'>
                  <SBoldWrapper>마감</SBoldWrapper>
                  {result.endDate}
                </div>
                <div>
                  {result.stateTag == '진행중' ? (
                    <TagComponent text='진행중' color='orange' />
                  ) : (
                    <TagComponent text='종료' color='gray' />
                  )}
                </div>
              </SContentWrapper>
            </SResultItem>
          ))}
        </SOl>
      )}
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;

  height: 100%;
  padding: 40px 0;

  box-sizing: border-box;
`;
const SHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  margin-bottom: 24px;
  padding: 0 20px 16px 20px;

  border-bottom: 1px solid var(--gray-100);
`;
const SInput = styled.input`
  width: 280px;
  height: 40px;
  padding-left: 49px;

  border-radius: 40px;
  background-color: var(--gray-100);
  background-image: url(${search});
  background-repeat: no-repeat;
  background-position: 20px center;

  color: var(--black);
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;

  box-sizing: border-box;

  &::placeholder {
    color: var(--gray-400);
    font-size: 16px;
    font-weight: 500;
    line-height: 140%;
  }
`;
const SExitBtn = styled.button`
  padding: 8px;
  gap: 8px;

  color: var(--black);
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;
const SNoResultsP = styled.p`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  color: var(--gray-500);
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;
const SOl = styled.ol`
  display: flex;
  flex-flow: column nowrap;

  width: fit-content;
  margin: 0 auto;
  gap: 20px;
`;
const SResultItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 332px;
  gap: 15px;
`;
const SImg = styled.img`
  width: 120px;
  height: 120px;

  border-radius: 16px;
  background-color: var(--gray-300);
`;
const SContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  #title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 700;
    font-size: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
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
`;
const SBoldWrapper = styled.div`
  color: var(--gray-500);
  font-weight: 500;
`;

export default SearchPage;
