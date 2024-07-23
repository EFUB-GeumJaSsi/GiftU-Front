// 이 주석을 지우고 컴포넌트 사용법을 적어주세요

import styled from 'styled-components';
import TagComponent from './TagComponent';
import { useNavigate } from 'react-router-dom';

const FundingComponent = ({ results = [], message, filter }) => {
  const navigate = useNavigate();

  const handleClick = (result) => {
    result.isOngoing
      ? navigate(`/funding-detail/${result.name}/isOngoing`)
      : navigate(`/funding-detail/${result.name}/end`);
  };

  return (
    <SLayout>
      {results.length === 0 ? (
        <SNoResultsWrapper>
          <p>{filter === '전체' && { message }}</p>
        </SNoResultsWrapper>
      ) : (
        <SFundingsContainer>
          {results.map((result, index) => (
            <SFundingContainer key={index} onClick={() => handleClick(result)}>
              <SImageContainer>
                <img src={result.image} alt='funding' />
                <STagWrapper>
                  {result.isOngoing ? (
                    <TagComponent text='진행 중' color='jade' />
                  ) : (
                    <TagComponent text='종료' color='gray' />
                  )}
                </STagWrapper>
              </SImageContainer>
              <STitleWrapper>
                <p>{result.title}</p>
              </STitleWrapper>
              <STextContainer>
                <STextWrapper>
                  <p id='label'>개설</p>
                  <p>{result.name}</p>
                </STextWrapper>
                <STextWrapper>
                  <p id='label'>마감</p>
                  <p>{result.endDate}</p>
                </STextWrapper>
              </STextContainer>
            </SFundingContainer>
          ))}
        </SFundingsContainer>
      )}
    </SLayout>
  );
};

const SLayout = styled.div`
  width: 100%;
`;
const SFundingsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  column-gap: 7px;
  row-gap: 8px;
  width: 335px;
  background-color: white;
  cursor: pointer;
`;
const SNoResultsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 663px;
  background-color: var(--gray-100);
  p {
    color: var(--gray-500);
    font-size: 16px;
    font-weight: 500;
    line-height: 140%;
  }
`;
const SFundingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 164px;
  height: 266px;
  background-color: white;
  cursor: pointer;
`;
const SImageContainer = styled.div`
  position: relative;
  width: 148px;
  height: 148px;
  margin-top: 8px;
  border-radius: 16px;
  background: #d4d4d4;
`;
const STagWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;
const STitleWrapper = styled.div`
  width: 140px;
  height: 40px;
  margin-top: 12px;
  margin-bottom: 12px;
  p {
    font-size: 17px;
    font-weight: 700;
    line-height: 120%;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const STextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 140px;
`;
const STextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  p {
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 120%;
    color: var(--black);
  }
  #label {
    color: var(--gray-500);
  }
`;

export default FundingComponent;
