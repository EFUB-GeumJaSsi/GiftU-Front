import styled from 'styled-components';
import { ReactComponent as Next } from '../../assets/FundingInfo/icn_back.svg';

// 후기 작성
const GoWriteCommentButton = ({ color, onClick }) => {
  return (
    <SLayout color={color} onClick={onClick}>
      <SContainer>
        <STextSpan>펀딩이 100% 달성되었어요</STextSpan>
        <SBigTextSpan>선물해 준 친구들에게 마음을 전해볼까요?</SBigTextSpan>
      </SContainer>
      <NextBtn color={color} />
    </SLayout>
  );
};

// 축하메시지 작성
const GoWriteMessageButton = ({
  color,
  price = '5,000',
  onClick,
  wroteMessage,
  isEnd,
}) => {
  return (
    <SLayout color={color} onClick={onClick}>
      <SContainer>
        {wroteMessage || isEnd ? (
          <>
            <STextSpan color={color}>
              펀딩에 <SEmphaSpan>{price}원</SEmphaSpan> 기여했어요
            </STextSpan>
            <SBigTextSpan color={color}>
              친구에게 남긴 메시지를 확인해 보세요!
            </SBigTextSpan>
          </>
        ) : (
          <>
            <STextSpan color={color}>
              펀딩에 <SEmphaSpan>{price}원</SEmphaSpan> 기여했어요
            </STextSpan>
            <SBigTextSpan color={color}>
              선물 받을 친구에게 메시지를 남겨보세요!
            </SBigTextSpan>
          </>
        )}
      </SContainer>
      <NextBtn color={color} />
    </SLayout>
  );
};

const SLayout = styled.button`
  display: flex;
  height: 74px;
  justify-content: space-between;
  align-items: center;

  padding-left: 28px;
  padding-right: 16px;

  border-radius: 16px;
  background: ${(props) =>
    props.color === 'orange' ? 'var(--orange-sec)' : 'var(--jade-pri)'};
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const STextSpan = styled.span`
  color: ${(props) => (props.color ? 'var(--gray-500)' : 'var(--white)')};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  text-align: left;

  cursor: pointer;
`;
const SEmphaSpan = styled(STextSpan)`
  color: var(--orange-pri);
  font-weight: 500;
`;
const SBigTextSpan = styled(STextSpan)`
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
`;
const NextBtn = styled(Next)`
  fill: ${(props) =>
    props.color === 'orange' ? 'var(--orange-pri)' : 'var(--white)'};
`;

export { GoWriteCommentButton, GoWriteMessageButton };
