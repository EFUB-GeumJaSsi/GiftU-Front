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
import { useEffect, useState } from 'react';
import PriceProgressBar from './PriceProgressBar';
import DeleteBtn from './DeleteBtn';
import { ReactComponent as Fold } from '../../assets/FundingInfo/fold 1.svg';

const FundingPercentage = ({
  type,
  color,
  balance,
  giftList,
  joinPrice,
  setIsTrue,
}) => {
  const maxPrice = giftList[giftList.length - 1].price;
  const percent = Math.round(((maxPrice - balance) / maxPrice) * 100);
  const [list, setList] = useState(giftList ? giftList : []);
  const [isClicked, setIsClicked] = useState(type === 'add' ? true : false);

  // GiftAddPage 삭제버튼핸들러
  const handleItemDelete = (e) => {
    const { id } = e.target;
    const targetIdx = list.findIndex((it, idx) => idx === parseInt(id) - 1);

    if (targetIdx >= 0) {
      updateList(targetIdx, id);
    }
  };

  // GiftAddPage 삭제할 아이템 제외 리스트 정리
  const updateList = (targetIdx, id) => {
    const targetNum = list[targetIdx].num;

    const newList = list.reduce((result, it, idx) => {
      if (idx === parseInt(id) - 1) return result;
      if (it.num >= targetNum) {
        result.push({ ...it, num: it.num - 1 });
      } else {
        result.push(it);
      }
      return result;
    }, []);

    setList(newList);
  };

  // GiftAddPage 펀딩 만들기 버튼 활성화/비활성화 여부
  useEffect(() => {
    if (setIsTrue) {
      if (list.length === 0) {
        setIsTrue(false);
      } else {
        setIsTrue(true);
      }
    }
  }, [setIsTrue, list]);

  const Text = () => {
    const EndedText = (
      <>
        <STitleSpan>100% 달성</STitleSpan>
        <STextSpan>펀딩 목표를 달성했어요</STextSpan>
      </>
    );

    const OngoingText = (
      <>
        <STitleSpan>{percent}% 달성</STitleSpan>
        <STextSpan>
          100% 달성까지{' '}
          <SBoldTextSpan joinPrice={joinPrice}>
            {addComma(balance)}원
          </SBoldTextSpan>{' '}
          남았어요
        </STextSpan>
      </>
    );

    const AddGiftText = (
      <SSmallTextSpan>총 {list.length}개의 선물</SSmallTextSpan>
    );

    return type === 'add'
      ? AddGiftText
      : balance == 0
        ? EndedText
        : OngoingText;
  };

  const GiftItem = ({ it, idx }) => (
    <SItemContainer idx={idx + 1} length={list.length}>
      <SImg src={it.image} alt='img' />
      <SItemTextContainer>
        <SItemTextSpan>{it.title}</SItemTextSpan>
        <SItemTextSpan>{addComma(it.price)}원</SItemTextSpan>
      </SItemTextContainer>
      {type === 'add' && (
        <DeleteBtn id={idx + 1} idx={idx + 1} onClick={handleItemDelete} />
      )}
    </SItemContainer>
  );

  return (
    <SLayout>
      <STextContainer>
        <Text />
      </STextContainer>
      <PriceProgressBar
        type={type}
        color={color}
        giftList={list}
        balance={balance}
        joinPrice={joinPrice}
      />
      <SButtonContainer onClick={() => setIsClicked(!isClicked)}>
        <SBtn clicked={isClicked} color={color}>
          가격대별 선물 보기
        </SBtn>
        <FoldBtn clicked={isClicked} color={color} />
      </SButtonContainer>
      {isClicked && (
        <SItemLayout>
          {list.length === 0 ? (
            <SNoGiftSpan>추가된 선물이 없습니다</SNoGiftSpan>
          ) : (
            list.map((it, idx) => <GiftItem key={idx} it={it} idx={idx} />)
          )}
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
const STitleSpan = styled.span`
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
`;
const STextSpan = styled.span`
  color: var(--gray-500);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
const SBoldTextSpan = styled(STextSpan)`
  color: ${(props) => (props.joinPrice ? 'var(--orange-pri)' : 'var(--black)')};
`;
const SSmallTextSpan = styled.span`
  margin-top: -4px;

  color: var(--gray-500);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
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
const SBtn = styled.span`
  color: ${(props) => (props.clicked ? props.color : 'var(--gray-400)')};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;

  cursor: pointer;
`;
const FoldBtn = styled(Fold)`
  fill: ${(props) => (props.clicked ? props.color : 'var(--gray-400)')};
`;
const SNoGiftSpan = styled.span`
  color: var(--gray-300);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
const SItemLayout = styled.div`
  display: flex;
  flex-direction: column;

  margin: 16px 14px 0 14px;
`;
const SItemContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 16px;

  height: 64px;
  border-bottom: ${(props) =>
    props.idx !== props.length ? '1px solid var(--gray-300)' : '0'};
`;
const SImg = styled.img`
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
const SItemTextSpan = styled.span`
  color: var(--black);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

export default FundingPercentage;
export { addComma };
