import styled from 'styled-components';
import { B1, B3, T1 } from '../../styles/font';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchItem from '../../components/Search/SearchItem';
import search from '../../assets/common/search.svg';
import { getSearch } from '../../api/search';

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const toHome = () => {
    navigate('/');
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
        <SExitBtn onClick={toHome}>닫기</SExitBtn>
      </SHeader>
      {results.length === 0 ? (
        <SNoResultsP>검색 결과가 없어요</SNoResultsP>
      ) : (
        <SOl>
          {results &&
            results.map((result, index) => (
              <SearchItem
                key={index}
                image={result.fundingImageUrl}
                name={result.userNickname}
                date={result.fundingEndDate}
                status={result.status}
                title={result.fundingTitle}
                onClick={() => navigate(`/funding/${result.fundingId}`)}
              />
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

  ${B1}
  color: var(--black);

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

  ${B1}
  color: var(--black);
`;
const SNoResultsP = styled.p`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  ${B1}
  color: var(--gray-500);
`;
const SOl = styled.ol`
  display: flex;
  flex-flow: column nowrap;

  width: fit-content;
  margin: 0 auto;
  padding-bottom: 40px;
  gap: 20px;
`;

export default SearchPage;
