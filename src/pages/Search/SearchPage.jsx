import styled from 'styled-components';
import { useState, useEffect } from 'react';
import TagComponent from '../../components/common/TagComponent';
import search from '../../assets/common/search.svg';
import { getSearch } from '../../api/search';

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search) {
      readSearchList(search);
    } else {
      setResults([]);
    }
  }, [search]);

  //API 연결
  const readSearchList = async (search) => {
    try {
      const response = await getSearch(search);
      setResults(Array.isArray(response.data) ? response.data : []);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SLayout>
      <SHeader>
        <SInput
          type='search'
          name='q'
          autoFocus
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
          {results &&
            results.map((result, index) => (
              <SResultItem key={index}>
                <SImg src={result.fundingImageUrl} />
                <SContentWrapper>
                  <div id='title'>{result.fundingTitle}</div>
                  <div id='name'>
                    <SBoldWrapper>개설</SBoldWrapper> {result.userNickname}
                  </div>
                  <div id='endDate'>
                    <SBoldWrapper>마감</SBoldWrapper>
                    {result.fundingEndDate}
                  </div>
                  <div>
                    {result.status == 'IN_PROGRESS' ? (
                      <TagComponent text='진행 중' color='jade' />
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
  padding-left: 45px;
  padding-right: 14px;

  border-radius: 40px;
  background-color: var(--gray-100);
  background-image: url(${search});
  background-repeat: no-repeat;
  background-position: 14px center;

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

  width: 187px;

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
