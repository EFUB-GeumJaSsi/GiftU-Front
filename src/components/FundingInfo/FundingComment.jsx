import styled from 'styled-components';

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
  border: ${(props) =>
    props.color === 'orange'
      ? '2px solid var(--orange-pri)'
      : '2px solid var(--jade-pri)'};
  background: var(--gray-100);
`;
const STitleSpan = styled.span`
  color: var(--gray-400);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
const STextSpan = styled.p`
  width: 291px;
  max-height: 78px;

  color: var(--black);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;

export default FundingComment;
