import styled from 'styled-components';

const FundingComment = ({
  color,
  comment = '내가 남긴 후기 내용이 표시되는 공간 글자수는 최대 120자까지 남길 수 있고 줄간격은 140% 스타일은 Body/B3-Medium 입니다 내가 남긴 후기 내용이 표시되는 공간 내가 남긴 후기 내용이 표시되는 공간',
}) => {
  return (
    <SContainer color={color}>
      <STitleWrapper>선물 후기</STitleWrapper>
      <STextWrapper>{comment}</STextWrapper>
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

const STitleWrapper = styled.span`
  color: var(--gray-400);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

const STextWrapper = styled.p`
  width: 291px;
  height: 78px;

  color: var(--black);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;

export default FundingComment;
