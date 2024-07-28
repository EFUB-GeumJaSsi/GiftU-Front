/*
<SFundingContainer>
  {fundingList.map((funding, index) => (
      <FundingComponent
        result={funding}
        key={index}
        onClick={() => handleClick(funding)}
       />
  ))}
</SFundingContainer>
겉을 SFundingListContainer로 감싸고 map을 이용하면 됩니다. 

fundingList를 api로 받아와 fundingList로 넣어주면 됩니다. 
const handleClick = (funding) => {
    funding.status === 'IN_PROGRESS'
      ? navigate(`/funding-detail/${funding.fundingId}/isOngoing`)
      : navigate(`/funding-detail/${funding.fundingId}/end`);
  };
handleClick 부분은 이렇게 클릭하면 해당 펀딩의 세부 페이지로 가도록 연결해줍니다. 

*/

import styled from 'styled-components';
import TagComponent from './TagComponent';
import { useNavigate } from 'react-router-dom';

const FundingComponent = ({ result, ...props }) => {
  return (
    <SFundingContainer {...props}>
      <SImageContainer>
        <img src={result.fundingImageUrl} alt='funding' />
        <STagWrapper>
          {result.status === 'IN_PROGRESS' ? (
            <TagComponent text='진행 중' color='jade' />
          ) : (
            <TagComponent text='종료' color='gray' />
          )}
        </STagWrapper>
      </SImageContainer>
      <STitleWrapper>{result.fundingTitle}</STitleWrapper>
      <STextContainer>
        <STextWrapper id='label'>
          <p id='label'>개설</p>
          <p>{result.launcherNickname}</p>
        </STextWrapper>
        <STextWrapper>
          <p id='label'>마감</p>
          <p>{result.fundingEndDate}</p>
        </STextWrapper>
      </STextContainer>
    </SFundingContainer>
  );
};

const SFundingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 164px;
  height: 266px;

  cursor: pointer;
`;
const SImageContainer = styled.div`
  position: relative;

  width: 148px;
  height: 148px;
  margin-top: 8px;

  border-radius: 16px;
`;
const STagWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;
const STitleWrapper = styled.p`
  width: 140px;
  height: 40px;
  margin-top: 12px;

  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;

  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;

  p {
    color: var(--black);
  }
  #label {
    color: var(--gray-500);
  }
`;

export default FundingComponent;
