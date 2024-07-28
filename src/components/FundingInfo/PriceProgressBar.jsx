import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { addComma } from '../../components/FundingInfo/FundingPercentage';

const PriceProgressBar = ({ type, color, giftList, balance, joinPrice }) => {
  const maxPrice = giftList.length > 0 && giftList[giftList.length - 1].price;
  const nowPrice = maxPrice - balance;
  const percent = Math.round(((maxPrice - balance) / maxPrice) * 100);
  const [nextPrice, setNextPrice] = useState({
    idx: null,
    price: null,
  });
  const [selected, setSelected] = useState(null);

  const findNextPrice = () => {
    const nextItem = giftList.find((it) => it.price > nowPrice);
    const nextIdx = giftList.findIndex((it) => it.price > nowPrice) + 1;
    return { nextItem, nextIdx };
  };

  const handleOnClick = (e) => {
    setSelected(e.target.id);
  };

  useEffect(() => {
    const { nextItem, nextIdx } = findNextPrice();
    nextItem &&
      setNextPrice({
        idx: nextIdx,
        price: nextItem.price,
      });
  }, [balance, selected]);

  // 프로그레스 바에서 금액이 가시적으로 표시되는 경우
  // 1. 펀딩 상세 달성 가능 다음 금액
  // 2. 펀딩 참여 금액 입력 시
  // 3. 새로운 선물 등록 시
  const ProgressPoint = ({ it, idx, type }) => (
    <SPointContainer price={it.price} max={maxPrice} onClick={handleOnClick}>
      <SPointTextWrapper
        idx={idx === 'join' ? idx : idx + 1}
        type={type}
        color={color}
        length={giftList.length - 1}
        num={it.num && it.num}
        nextIdx={nextPrice.idx}
        joinPrice={joinPrice}
        selected={selected}
      >
        {addComma(it.price)}원
      </SPointTextWrapper>
      <SPointCircleWrapper
        id={idx + 1}
        type={type}
        color={color}
        length={giftList.length - 1}
        num={it.num && it.num}
        price={it.price}
        balance={nowPrice}
        onClick={handleOnClick}
      />
    </SPointContainer>
  );

  return (
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
        <ProgressPoint key={idx} it={it} idx={idx} type={type} />
      ))}
      {joinPrice && nowPrice <= maxPrice && (
        <ProgressPoint it={{ price: nowPrice }} idx='join' type={type} />
      )}
    </SSliderContainer>
  );
};

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
  left: 11%;

  appearance: none;

  &::-webkit-progress-bar {
    background: var(--gray-300);
    border-radius: 20px;

    height: 8px;
    width: 235px;
  }

  &::-webkit-progress-value {
    background: ${(props) => props.color};
    border-radius: 30px;
  }
`;
const SPointContainer = styled.div`
  display: flex;
  position: absolute;
  left: ${(props) =>
    props.price === 0
      ? '6px'
      : `${(1 - (props.max - props.price) / props.max) * 226 + 6}px`};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
const SPointTextWrapper = styled.span`
  min-height: 15px;
  min-width: 50px;
  margin: 0 8px;

  background: var(--white);

  color: ${(props) =>
    props.nextIdx === props.idx
      ? 'var(--gray-500)'
      : props.idx === 'join'
        ? 'var(--orange-pri)'
        : props.type === 'info' || props.num !== props.length
          ? 'var(--gray-300)'
          : props.color};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-align: center;

  cursor: default;
  white-space: nowrap;

  visibility: ${(props) => (props.type === 'none' ? 'hidden' : 'visible')};
  opacity: ${(props) =>
    props.idx == props.selected
      ? '1'
      : props.joinPrice && props.idx !== 'join'
        ? '0'
        : props.idx === props.nextIdx ||
            props.idx === 'join' ||
            props.num === props.length
          ? '1'
          : '0'};

  z-index: ${(props) =>
    props.idx === props.selected
      ? '999'
      : props.idx === 'join'
        ? '900'
        : '100'};
  &:hover {
    opacity: 1;
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
        : props.id === 'join'
          ? 'var(--orange-pri)'
          : props.price <= props.balance
            ? props.color
            : 'var(--gray-300)'};

  cursor: pointer;
`;

export default PriceProgressBar;
