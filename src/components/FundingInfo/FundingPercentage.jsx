import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as Fold } from '../../assets/FundingInfo/fold 1.svg';

const FundingPercentage = ({
  type,
  color,
  percent = '60',
  balance = '30,000',
  itemList = [
    { image: '', title: '선물 제목', price: '20,000' },
    { image: '', title: '선물 제목', price: '65,000' },
    { image: '', title: '선물 제목', price: '130,000' },
  ],
}) => {
  const [isClicked, setIsClicked] = useState(false);

  // 임시 값
  const tempPercent =
    ((parseInt(itemList[itemList.length - 1].price) - parseInt(balance)) /
      parseInt(itemList[itemList.length - 1].price)) *
    100;

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
        <SBoldTextWrapper type={type}>{balance}원</SBoldTextWrapper> 남았어요
      </STextWrapper>
    </>
  );

  const ProgressPoint = (it, idx) => (
    <SPointContainer
      key={idx}
      idx={idx + 1}
      length={itemList.length}
      max={parseInt(itemList[itemList.length - 1].price) * 1000}
      price={parseInt(it.price) * 1000}
    >
      <SPointTextWrapper type={type}>{it.price}원</SPointTextWrapper>
      <SPointCircleWrapper
        color={color}
        price={parseInt(it.price) * 1000}
        balance={
          (parseInt(itemList[itemList.length - 1].price) - parseInt(balance)) *
          1000
        }
      />
    </SPointContainer>
  );

  const GiftItem = (it, idx) => (
    <SItemContainer key={idx} idx={idx + 1} length={itemList.length}>
      <SImageWrapper src={it.image} alt='img' />
      <SItemTextContainer>
        <SItemTextWrapper>{it.title}</SItemTextWrapper>
        <SItemTextWrapper>{it.price}원</SItemTextWrapper>
      </SItemTextContainer>
    </SItemContainer>
  );

  return (
    <SLayout>
      <STextContainer>
        {balance == '0' ? EndedText : OngoingText}
      </STextContainer>
      <SSliderContainer>
        <SSliderWrapper
          class='progress'
          id='progress'
          value={tempPercent}
          min='0'
          max='100'
          color={color}
        ></SSliderWrapper>
        {itemList.map((it, idx) => ProgressPoint(it, idx))}
      </SSliderContainer>
      <SButtonContainer onClick={() => setIsClicked(!isClicked)}>
        <SButtonWrapper clicked={isClicked} color={color}>
          가격대별 선물 보기
        </SButtonWrapper>
        <FoldBtn clicked={isClicked} color={color} />
      </SButtonContainer>
      {isClicked && (
        <SItemLayout>
          {itemList.map((it, idx) => GiftItem(it, idx))}
        </SItemLayout>
      )}
    </SLayout>
  );
};

export default FundingPercentage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 178px;
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
  color: ${(props) => (props.type ? 'var(--gray-300)' : 'var(--gray-500)')};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

const SBoldTextWrapper = styled(STextWrapper)`
  color: ${(props) => (props.type ? 'var(--orange-pri)' : 'var(--black)')};
`;

const SSliderContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  width: 311px;
  height: 64px;
  margin: 16px 14px 20px 14px;

  border-radius: 10px;
  background-color: var(--white);
`;

const SSliderWrapper = styled.progress`
  position: absolute;
  top: 62%;
  left: 10.5%;

  appearance: none;

  &::-webkit-progress-bar {
    background: var(--gray-300);
    border-radius: 20px;

    height: 8px;
    width: 240px;

    overflow: hidden;
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
      ? '240px'
      : `${(1 - (props.max - props.price) / props.max) * 235 + 12}px`};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const SPointTextWrapper = styled.span`
  background: var(--white);
  border-radius: 10px;

  color: var(--gray-500);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;

  cursor: default;

  &:hover {
    z-index: 999;
  }
`;

const SPointCircleWrapper = styled.div`
  width: 14px;
  height: 14px;

  border-radius: 50%;

  background-color: ${(props) =>
    props.price <= props.balance
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
