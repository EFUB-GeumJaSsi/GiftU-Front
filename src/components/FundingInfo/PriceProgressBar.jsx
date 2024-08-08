import styled from 'styled-components';
import { C2 } from '../../styles/font';
import { useEffect, useState } from 'react';

const getColor = (props) => {
  if (props.$percent == 100 && props.$length === props.$idx - 1)
    return props.$color;

  if (props.$nextIdx === props.$idx) return 'var(--gray-500)';

  if (props.$idx === 'join') return 'var(--orange-pri)';

  if (props.$type === 'info' || props.$num !== props.$length)
    return 'var(--gray-300)';

  return props.$color;
};

const getBackgroundColor = (props) => {
  if (props.$num !== props.$length && props.$type === 'add')
    return 'var(--gray-300)';

  if (props.$type === 'add') return 'var(--jade-pri)';

  if (props.id === 'join') return 'var(--orange-pri)';

  if (props.$price <= props.$balance) return props.$color;

  return 'var(--gray-300)';
};

const getOpacity = (props) => {
  if (
    props.$idx == props.$selected ||
    (props.$percent == 100 && props.$length === props.$idx - 1)
  )
    return '1';

  if (props.$joinPrice && props.$idx !== 'join') return '0';

  if (
    props.$idx === props.$nextIdx ||
    props.$idx === 'join' ||
    props.$num === props.$length
  ) {
    return '1';
  }

  return '0';
};

const PriceProgressBar = ({ type, color, giftList, balance, joinPrice }) => {
  const maxPrice =
    giftList && giftList.length > 0 && giftList[giftList.length - 1].price;
  const nowPrice = maxPrice - balance;
  const percent = balance
    ? Math.round(((maxPrice - balance) / maxPrice) * 100)
    : 0;
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
    <SPointContainer
      onClick={handleOnClick}
      $price={it.price}
      $max={maxPrice}
      $length={giftList && giftList.length - 1}
      $num={it.num && it.num}
      $selected={selected}
    >
      <SPointSpan
        $idx={idx === 'join' ? idx : idx + 1}
        $type={type}
        $color={color}
        $length={giftList && giftList.length - 1}
        $num={it.num && it.num}
        $joinPrice={joinPrice}
        $nextIdx={nextPrice.idx}
        $selected={selected}
        $percent={percent}
        $getColor={getColor}
        $getOpacity={getOpacity}
      >
        {it.price?.toLocaleString()}원
      </SPointSpan>
      <SCircleDiv
        id={idx && idx + 1}
        onClick={handleOnClick}
        $type={type}
        $color={color}
        $length={giftList && giftList.length - 1}
        $num={it.num && it.num}
        $price={it.price}
        $balance={nowPrice}
        $getBackgroundColor={getBackgroundColor}
      />
    </SPointContainer>
  );

  return (
    <SContainer>
      <SSlider
        className='progress'
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
    props.$price === 0
      ? '6px'
      : `${(1 - (props.$max - props.$price) / props.$max) * 226 + 6}px`};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: ${(props) =>
    props.$selected ? '990' : props.$length === props.$num ? '500' : '0'};
`;
const SPointSpan = styled.span`
  min-height: 15px;
  min-width: 50px;
  margin: 0 8px;

  background: var(--white);

  ${C2}
  color: ${(props) => props.$getColor(props)};
  text-align: center;

  cursor: default;
  white-space: nowrap;

  visibility: ${(props) => (props.$type === 'none' ? 'hidden' : 'visible')};
  opacity: ${(props) => props.$getOpacity(props)};

  z-index: ${(props) =>
    props.$selected ? '999' : props.$length === props.$num ? '500' : '100'};
  &:hover {
    opacity: 1;
    z-index: 999;
  }
`;
const SCircleDiv = styled.div`
  width: 14px;
  height: 14px;

  border-radius: 50%;
  background-color: ${(props) => props.$getBackgroundColor(props)};

  cursor: pointer;
`;

export default PriceProgressBar;
