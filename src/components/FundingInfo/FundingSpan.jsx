import styled from 'styled-components';

const FundingSpan = ({
  color = 'jade',
  name = '김이화',
  startDate = '2023.04.01',
  endDate = '2023.04.25',
}) => {
  return (
    <SLayout>
      <SContainer>
        {color === 'orange' ? (
          <STitleSpan>선물 수령인</STitleSpan>
        ) : (
          <STitleSpan>펀딩 개설자</STitleSpan>
        )}
        <STextSpan>{name}</STextSpan>
      </SContainer>
      <SContainer>
        <STitleSpan>펀딩 기간</STitleSpan>
        <STextSpan>
          {startDate} ~ {endDate}
        </STextSpan>
      </SContainer>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;

  padding: 16px 0 16px 24px;

  border-radius: 16px;
  background: var(--gray-100);
`;
const SContainer = styled.div`
  display: flex;
  gap: 16px;
`;
const STitleSpan = styled.span`
  width: 64px;
  height: 17px;

  color: var(--gray-400);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
const STextSpan = styled.span`
  color: var(--gray-500);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

export default FundingSpan;
