import styled from 'styled-components';
import { B3 } from '../../styles/font';

const FundingComment = ({ color, comment }) => {
  return (
    <SContainer color={color}>
      <STitleSpan>선물 후기</STitleSpan>
      <STextSpan>{comment}</STextSpan>
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;

  padding: 20px 20px 20px 24px;

  border-radius: 16px;
  border: ${(props) => `2px solid ${props.color}`};
  background: var(--gray-100);
`;
const STitleSpan = styled.span`
  ${B3}
  color: var(--gray-400);
`;
const STextSpan = styled.p`
  width: 291px;
  max-height: 78px;

  ${B3}
  color: var(--black);
`;

export default FundingComment;
