import styled from 'styled-components';
import { B0, B4 } from '../../styles/font';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Next } from '../../assets/FundingInfo/icn_back.svg';

// 후기 작성
const GoWriteCommentButton = ({ color, fundingId, nowMoney, giftList }) => {
  const navigate = useNavigate();
  const maxPrice = giftList.length > 0 && giftList[giftList.length - 1].price;
  const percent = maxPrice ? Math.round((nowMoney / maxPrice) * 100) : 0;

  return (
    <SLayout
      color={color}
      onClick={() => navigate(`/funding/${fundingId}/review/edit`)}
    >
      <SContainer>
        <STextSpan>펀딩이 {percent}% 달성되었어요</STextSpan>
        <SBigTextSpan>선물해 준 친구들에게 마음을 전해볼까요?</SBigTextSpan>
      </SContainer>
      <NextBtn color={color} />
    </SLayout>
  );
};

// 축하메시지 작성
const GoWriteMessageButton = ({
  color,
  price,
  onClick,
  wroteMessage,
  contributed,
  fundingId,
  isEnd,
}) => {
  const navigate = useNavigate();

  return (
    <SLayout
      color={color}
      onClick={
        wroteMessage || isEnd
          ? onClick
          : () =>
              navigate(`/funding/${fundingId}/message/edit`, {
                state: { participationId: contributed.participationId },
              })
      }
    >
      <SContainer>
        <STextSpan color={color}>
          펀딩에 <SEmphaSpan>{price}원</SEmphaSpan> 기여했어요
        </STextSpan>
        <SBigTextSpan color={color}>
          {wroteMessage || isEnd
            ? '친구에게 남긴 메시지를 확인해 보세요!'
            : '선물 받을 친구에게 메시지를 남겨보세요!'}
        </SBigTextSpan>
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
    props.color === 'var(--orange-pri)'
      ? 'var(--orange-sec)'
      : 'var(--jade-pri)'};
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const STextSpan = styled.span`
  ${B4}
  color: ${(props) =>
    props.color === 'var(--orange-pri)' ? 'var(--gray-500)' : 'var(--white)'};
  text-align: left;

  cursor: pointer;
`;
const SEmphaSpan = styled(STextSpan)`
  color: var(--orange-pri);
  font-weight: 500;
`;
const SBigTextSpan = styled(STextSpan)`
  ${B0}
`;
const NextBtn = styled(Next)`
  fill: ${(props) =>
    props.color === 'var(--orange-pri)' ? 'var(--orange-pri)' : 'var(--white)'};
`;

export { GoWriteCommentButton, GoWriteMessageButton };
