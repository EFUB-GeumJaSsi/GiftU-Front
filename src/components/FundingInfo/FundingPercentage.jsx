// 축하메시지 수정 페이지에서 사용할 때 color, balance, giftList, joinPrice 넘겨주세요!
// color(string): 프로그레스 바 색
// balance(number): 달성까지 남은 금액
// giftList(list): 가격대별 선물 리스트, 가격 오름차순 정렬
// joinPrice(number): 펀딩 참여자가 참여한 금액

const addComma = (price) => {
  const commaPrice = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return commaPrice;
};

import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as Fold } from '../../assets/FundingInfo/fold 1.svg';

const FundingPercentage = ({
  type,
  color,
  balance = 84000,
  giftList = [
    { image: '', title: '선물 제목', price: 30000 },
    { image: '', title: '선물 제목', price: 65000 },
    { image: '', title: '선물 제목', price: 84000 },
    { image: '', title: '선물 제목', price: 130000 },
  ],
  joinPrice,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const maxPrice = giftList[giftList.length - 1].price;
  const percent = Math.round(((maxPrice - balance) / maxPrice) * 100);

  const Text = () => {
    const EndedText = (
      <>
        <STitleWrapper>100% 달성</STitleWrapper>
        <STextWrapper>펀딩 목표를 달성했어요</STextWrapper>
      </>
    );

    const OngoingText = (
      <>
        <STitleWrapper>{percent}% 달성</STitleWrapper>
        <STextWrapper>
          100% 달성까지{' '}
          <SBoldTextWrapper joinPrice={joinPrice}>
            {addComma(balance)}원
          </SBoldTextWrapper>{' '}
          남았어요
        </STextWrapper>
      </>
    );

    const AddGiftText = (
      <SSmallTextWrapper>총 {giftList.length}개의 선물</SSmallTextWrapper>
    );

    return type === 'add'
      ? AddGiftText
      : balance == 0
        ? EndedText
        : OngoingText;
  };

  const ProgressPoint = ({ it, idx, type }) => (
    <SPointContainer
      key={idx}
      idx={idx + 1}
      length={giftList.length}
      max={maxPrice}
      price={it.price}
    >
      {idx === 0 ||
      idx === giftList.length - 1 ||
      idx === 'join' ||
      it.num === giftList.length - 1 ? (
        <SPointTextWrapper
          idx={idx}
          joinPrice={joinPrice}
          color={color}
          num={it.num && it.num}
          length={giftList.length - 1}
          type={type}
        >
          {addComma(it.price)}원
        </SPointTextWrapper>
      ) : (
        <SPointTextWrapper></SPointTextWrapper>
      )}
      <SPointCircleWrapper
        color={color}
        price={it.price}
        balance={maxPrice - balance}
        type={type}
        num={it.num && it.num}
        length={giftList.length - 1}
      />
    </SPointContainer>
  );

  const GiftItem = ({ it, idx }) => (
    <SItemContainer key={idx} idx={idx + 1} length={giftList.length}>
      <SImageWrapper src={it.image} alt='img' />
      <SItemTextContainer>
        <SItemTextWrapper>{it.title}</SItemTextWrapper>
        <SItemTextWrapper>{addComma(it.price)}원</SItemTextWrapper>
      </SItemTextContainer>
    </SItemContainer>
  );

  return (
    <SLayout>
      <STextContainer>
        <Text />
      </STextContainer>
      <SSliderContainer>
        <SSliderWrapper
          class='progress'
          id='progress'
          value={percent}
          min='0'
          max='100'
          color={color}
        />
        <ProgressPoint it={{ price: 0 }} type='none' />
        {giftList.map((it, idx) => (
          <ProgressPoint it={it} idx={idx} type={type} />
        ))}
        {joinPrice && (
          <ProgressPoint it={{ price: joinPrice }} idx='join' type={type} />
        )}
      </SSliderContainer>
      <SButtonContainer onClick={() => setIsClicked(!isClicked)}>
        <SButtonWrapper clicked={isClicked} color={color}>
          가격대별 선물 보기
        </SButtonWrapper>
        <FoldBtn clicked={isClicked} color={color} />
      </SButtonContainer>
      {isClicked && (
        <SItemLayout>
          {giftList.map((it, idx) => (
            <GiftItem it={it} idx={idx} />
          ))}
        </SItemLayout>
      )}
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px 0;

  border-radius: 16px;
  background: var(--gray-100);
`;

const STextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin: 0 24px;
`;

const STitleWrapper = styled.span`
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
`;

const STextWrapper = styled.span`
  color: var(--gray-500);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

const SBoldTextWrapper = styled(STextWrapper)`
  color: ${(props) => (props.joinPrice ? 'var(--orange-pri)' : 'var(--black)')};
`;

const SSmallTextWrapper = styled.span`
  margin-top: -4px;

  color: var(--gray-500);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

const SSliderContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  width: 311px;
  height: 64px;
  margin: 16px 12px 20px 12px;

  border-radius: 10px;
  background-color: var(--white);
`;

const SSliderWrapper = styled.progress`
  position: absolute;
  top: 62%;
  left: 12%;

  appearance: none;

  &::-webkit-progress-bar {
    background: var(--gray-300);
    border-radius: 20px;

    height: 8px;
    width: 235px;
  }

  &::-webkit-progress-value {
    background: ${(props) =>
      props.color === 'orange' ? 'var(--orange-pri)' : 'var(--jade-pri)'};
    border-radius: 30px;
  }
`;

const SPointContainer = styled.div`
  display: flex;
  position: absolute;
  left: ${(props) =>
    props.idx === props.length
      ? '235px'
      : `${(1 - (props.max - props.price) / props.max) * 227 + 8}px`};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const SPointTextWrapper = styled.span`
  min-height: 15px;
  min-width: 50px;
  margin: 0 8px;

  background: transparent;
  border-radius: 10px;

  color: ${(props) =>
    props.num !== props.length && props.type === 'add'
      ? 'var(--gray-300)'
      : props.color === 'jade'
        ? 'var(--jade-pri)'
        : props.idx === 'join'
          ? 'var(--orange-pri)'
          : !props.joinPrice
            ? 'var(--gray-500)'
            : 'var(--gray-300)'};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-align: center;

  cursor: default;
  white-space: nowrap;

  &:hover {
    z-index: 999;
  }
`;

const SPointCircleWrapper = styled.div`
  width: 14px;
  height: 14px;

  border-radius: 50%;

  background-color: ${(props) =>
    props.num !== props.length && props.type === 'add'
      ? 'var(--gray-300)'
      : props.type === 'add'
        ? 'var(--jade-pri)'
        : props.price <= props.balance
          ? props.color === 'orange'
            ? 'var(--orange-pri)'
            : 'var(--jade-pri)'
          : 'var(--gray-300)'};
`;

const SButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 152px;
  padding: 8px 0;
  margin: 0 91px;

  border-radius: 20px;
  background-color: var(--white);
`;

const SButtonWrapper = styled.span`
  color: ${(props) =>
    props.clicked
      ? props.color === 'orange'
        ? 'var(--orange-pri)'
        : 'var(--jade-pri)'
      : 'var(--gray-400)'};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;

  cursor: pointer;
`;

const FoldBtn = styled(Fold)`
  fill: ${(props) =>
    props.clicked
      ? props.color === 'orange'
        ? 'var(--orange-pri)'
        : 'var(--jade-pri)'
      : 'var(--gray-400)'};
`;

const SItemLayout = styled.div`
  display: flex;
  flex-direction: column;

  margin: 16px 14px 0 14px;
`;

const SItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  height: 64px;
  border-bottom: ${(props) =>
    props.idx !== props.length ? '1px solid var(--gray-300)' : '0'};
`;

const SImageWrapper = styled.img`
  width: 48px;
  height: 48px;

  border-radius: 4px;
  background: var(--gray-300);
`;

const SItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const SItemTextWrapper = styled.span`
  color: var(--black);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

export default FundingPercentage;
export { addComma };
