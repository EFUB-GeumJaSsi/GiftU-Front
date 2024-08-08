import styled from 'styled-components';
import { B3 } from '../../styles/font';

const FundingSpan = ({ color, name, startDate, endDate }) => {
  const replaceHyphen = (it) => {
    return it && it.replaceAll('-', '.');
  };

  return (
    <SLayout>
      <SContainer>
        {color === 'var(--orange-pri)' ? (
          <STitleSpan>선물 수령인</STitleSpan>
        ) : (
          <STitleSpan>펀딩 개설자</STitleSpan>
        )}
        <STextSpan>{name}</STextSpan>
      </SContainer>
      <SContainer>
        <STitleSpan>펀딩 기간</STitleSpan>
        <STextSpan>
          {replaceHyphen(startDate)} ~ {replaceHyphen(endDate)}
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

  ${B3}
  color: var(--gray-400);
`;
const STextSpan = styled.span`
  ${B3}
  color: var(--gray-500);
`;

export default FundingSpan;
