// 축하메시지 수정 페이지에서 사용할 때 color, nowMoney, giftList, joinPrice 넘겨주세요!
// color(string): 프로그레스 바 색
// nowMoney(number): 지금까지 펀딩된 금액
// giftList(list): 가격대별 선물 리스트, 가격 오름차순 정렬
// joinPrice(number): 펀딩 참여자가 참여한 금액

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import PriceProgressBar from './PriceProgressBar';
import DeleteBtn from './DeleteBtn';
import { ReactComponent as Fold } from '../../assets/FundingInfo/fold 1.svg';

const FundingPercentage = ({
  type,
  color = 'var(--gray-400)',
  nowMoney,
  giftList,
  joinPrice,
  setIsTrue,
  giftData,
  imageData,
}) => {
  const maxPrice =
    giftList && giftList.length > 0 && giftList[giftList.length - 1].price;
  const percent = Math.round((nowMoney / maxPrice) * 100);
  const balance = nowMoney ? maxPrice - nowMoney : maxPrice;
  const [isClicked, setIsClicked] = useState(type === 'add' ? true : false);
  const [list, setList] = useState(type === 'add' ? addKeytoGiftData(giftData) : []);

  // 선물 데이터 오름차순 정렬
  function sortGiftData(array) {
    return array && array.sort((a, b) => a.price - b.price);
  }

  // GiftAddPage 선물 정렬
  function addKeytoGiftData(array) {
    const addNum = [...array].map((it, idx) => {
      return { ...it, num: idx, giftImage: imageData[idx] };
    });
    return sortGiftData(addNum);
  }

  // GiftAddPage 삭제버튼핸들러
  const handleItemDelete = (e) => {
    // 이벤트 버블링 방지
    e.stopPropagation();

    const { id } = e.target;
    const targetIdx = list.findIndex((it, idx) => idx === parseInt(id) - 1);

    if (targetIdx >= 0) {
      const targetNum = list[targetIdx].num;

      // splice 원본 배열 변경
      giftData.splice(targetNum, 1);
      imageData.splice(targetNum, 1);
      setList(addKeytoGiftData(giftData));
    }
  };

  // GiftAddPage 펀딩 만들기 버튼 활성화/비활성화 여부
  useEffect(() => {
    if (setIsTrue) {
      if (list && list.length === 0) {
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
          <SBoldTextSpan $joinPrice={joinPrice}>
            {balance?.toLocaleString()}원
          </SBoldTextSpan>{' '}
          남았어요
        </STextSpan>
      </>
    );

    const AddGiftText = (
      <SSmallTextSpan>총 {list ? list.length : 0}개의 선물</SSmallTextSpan>
    );

    return type === 'add'
      ? AddGiftText
      : parseInt(balance) === 0
        ? EndedText
        : OngoingText;
  };

  const GiftItem = ({ it, idx, length }) => (
    <SItemContainer $idx={idx + 1} $length={length}>
      {it.giftImageUrl ? (
        <SImg src={it.giftImageUrl} alt='img' />
      ) : (
        <SImg src={URL.createObjectURL(it.giftImage)} />
      )}
      <SItemTextContainer>
        <SItemTextSpan>{it.giftName}</SItemTextSpan>
        <SItemTextSpan>{it.price?.toLocaleString()}원</SItemTextSpan>
      </SItemTextContainer>
      {type === 'add' && <DeleteBtn id={idx + 1} onClick={handleItemDelete} />}
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
        giftList={giftList ? giftList : list}
        joinPrice={joinPrice}
        balance={balance}
      />
      <SButtonContainer onClick={() => setIsClicked(!isClicked)}>
        <SBtn $clicked={isClicked} $color={color}>
          가격대별 선물 보기
        </SBtn>
        <FoldBtn $clicked={isClicked} $color={color} />
      </SButtonContainer>
      {isClicked && (
        <SItemLayout>
          {giftList ? (
            sortGiftData(giftList).map((it, idx) => (
              <GiftItem key={idx} it={it} idx={idx} length={giftList.length} />
            ))
          ) : list && list.length === 0 ? (
            <SNoGiftSpan>추가된 선물이 없습니다</SNoGiftSpan>
          ) : (
            list &&
            list.map((it, idx) => (
              <GiftItem key={idx} it={it} idx={idx} length={list.length} />
            ))
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
  color: ${(props) => (props.$joinPrice ? 'var(--orange-pri)' : 'var(--black)')};
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
  color: ${(props) => (props.$clicked ? props.$color : 'var(--gray-400)')};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;

  cursor: pointer;
`;
const FoldBtn = styled(Fold)`
  fill: ${(props) => (props.$clicked ? props.$color : 'var(--gray-400)')};
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
    props.$idx !== props.$length ? '1px solid var(--gray-300)' : '0'};
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
