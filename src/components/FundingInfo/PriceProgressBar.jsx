import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { addComma } from '../../components/FundingInfo/FundingPercentage';
import { getColor, getBackgroundColor, getOpacity } from './stylefunction';

const PriceProgressBar = ({ type, color, giftList, balance, joinPrice }) => {
  const maxPrice = giftList && giftList[giftList.length - 1].price;
  const nowPrice = maxPrice - balance;
  const percent = Math.round(((maxPrice - balance) / maxPrice) * 100);
  const [nextPrice, setNextPrice] = useState({
    idx: null,
    price: null,
  });
  const [selected, setSelected] = useState(null);

  // 현재 달성한 금액과 가장 가까운 다음 달성 목표 찾기
  const findNextPrice = () => {
    const nextItem = giftList && giftList.find((it) => it.price > nowPrice);
    const nextIdx =
      giftList && giftList.findIndex((it) => it.price > nowPrice) + 1;
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
      <SPointSpan
        idx={idx === 'join' ? idx : idx + 1}
        type={type}
        color={color}
        getColor={getColor}
        getOpacity={getOpacity}
        length={giftList && giftList.length - 1}
        num={it.num && it.num}
        joinPrice={joinPrice}
        $nextIdx={nextPrice.idx}
        selected={selected}
        percent={percent}
      >
        {addComma(it.price)}원
      </SPointSpan>
      <SCircleDiv
        id={idx + 1}
        type={type}
        color={color}
        getBackgroundColor={getBackgroundColor}
        length={giftList && giftList.length - 1}
        num={it.num && it.num}
        price={it.price}
        balance={nowPrice}
        onClick={handleOnClick}
      />
    </SPointContainer>
  );

  return (
    <SContainer>
      <SSlider
        class='progress'
        id='progress'
        value={percent}
        min='0'
        max='100'
        color={color}
      />
      <ProgressPoint it={{ price: 0 }} type='none' />
      {giftList &&
        giftList.map((it, idx) => (
          <ProgressPoint key={idx} it={it} idx={idx} type={type} />
        ))}
      {joinPrice > 0 && nowPrice <= maxPrice && (
        <ProgressPoint it={{ price: nowPrice }} idx='join' type={type} />
      )}
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  width: 311px;
  height: 64px;
  margin: 16px 12px 20px 12px;

  border-radius: 10px;
  background-color: var(--white);
`;
const SSlider = styled.progress`
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
const SPointSpan = styled.span`
  min-height: 15px;
  min-width: 50px;
  margin: 0 8px;

  background: var(--white);

  color: ${(props) => props.getColor(props)};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-align: center;

  cursor: default;
  white-space: nowrap;

  visibility: ${(props) => (props.type === 'none' ? 'hidden' : 'visible')};
  opacity: ${(props) => getOpacity(props)};

  &:hover {
    opacity: 1;
    z-index: 999;
  }
`;
const SCircleDiv = styled.div`
  width: 14px;
  height: 14px;

  border-radius: 50%;
  background-color: ${(props) => props.getBackgroundColor(props)};

  cursor: pointer;
`;

export default PriceProgressBar;
