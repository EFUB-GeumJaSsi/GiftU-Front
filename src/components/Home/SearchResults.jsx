import styled from 'styled-components';
import TagComponent from '../common/TagComponent';
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
              <div>
                {result.stateTag == '진행중' ? (
                  <TagComponent text='진행중' color='orange'></TagComponent>
                ) : (
                  <TagComponent text='종료' color='gray'></TagComponent>
                )}
              </div>
            </SContentWrapper>
          </SResultItem>
        ))
      )}
    </SResultsContainer>
  );
};

export default SearchResults;

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
    border-radius: 16px;
    background-color: var(--gray-300);
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
