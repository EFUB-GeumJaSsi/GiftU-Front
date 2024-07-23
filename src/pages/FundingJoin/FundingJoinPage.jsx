import styled from 'styled-components';
import { useEffect, useState } from 'react';
import BackHeader from '../../components/common/BackHeader';
import BottomBackground from '../../components/common/BottomBackground';
import Button from '../../components/common/ButtonComponent';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import { addComma } from '../../components/FundingInfo/FundingPercentage';

const giftList = [
  { image: '', title: '선물 제목', price: 20000 },
  { image: '', title: '선물 제목', price: 65000 },
  { image: '', title: '선물 제목', price: 84000 },
  { image: '', title: '선물 제목', price: 130000 },
];

const FundingJoinPage = () => {
  const [balance, setBalance] = useState(84000);
  const [price, setPrice] = useState();
  const [message, setMessage] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [name, setName] = useState('nickname');
  const [formattedPrice, setFormattedPrice] = useState('');

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const finalNum = value.replace(/[^0-9]/g, '');
    setPrice(finalNum);
    setFormattedPrice(addComma(finalNum));
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handlePriceBlur = () => {
    setFormattedPrice(price ? `${addComma(price)}원` : '');
  };

  const handleRadioClick = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    price > balance ? setIsDone(false) : setIsDone(true);
  }, [price, balance]);

  return (
    <>
      <BackHeader />
      <SLayout>
        <FundingPercentage
          color='orange'
          balance={price && isDone ? balance - parseInt(price) : balance}
          giftList={giftList}
          joinPrice={
            price && isDone
              ? giftList[giftList.length - 1].price - (balance - price)
              : undefined
          }
        />
        <SSmallLayout>
          <SContainer>
            <STextBox>
              <STextWrapper>금액</STextWrapper>
              <SStarWrapper>*</SStarWrapper>
            </STextBox>
            <SInputWrapper
              value={formattedPrice}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
              placeholder='펀딩에 참여할 금액을 입력해 주세요'
            />
            {price > balance && (
              <SWarningWrapper>
                {addComma(balance)}원보다 적은 금액을 입력해 주세요
              </SWarningWrapper>
            )}
          </SContainer>
          <SContainer>
            <STextBox>
              <STextWrapper>이름</STextWrapper>
              <SStarWrapper>*</SStarWrapper>
            </STextBox>
            <SButtonContainer>
              <SButtonWrapper
                checked={name === 'nickname'}
                onClick={handleRadioClick}
              >
                <input
                  id='radio'
                  type='radio'
                  value='nickname'
                  checked={name === 'nickname'}
                  onChange={handleRadioClick}
                />
                닉네임
              </SButtonWrapper>
              <SButtonWrapper
                checked={name === 'anony'}
                onClick={handleRadioClick}
              >
                <input
                  id='radio'
                  type='radio'
                  value='anony'
                  checked={name === 'anony'}
                  onChange={handleRadioClick}
                />
                익명
              </SButtonWrapper>
            </SButtonContainer>
          </SContainer>
          <SContainer>
            <STextWrapper>축하메시지</STextWrapper>
            <STextareaWrapper
              value={message}
              onChange={handleMessageChange}
              placeholder='친구에게 전달될 메시지를 입력해 주세요'
            />
          </SContainer>
        </SSmallLayout>
      </SLayout>
      <BottomBackground
        Button={
          <Button
            btnInfo={
              price && isDone
                ? { text: '결제하기', color: 'orange' }
                : { text: '결제하기' }
            }
          />
        }
      />
    </>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  padding: 24px 20px 128px 20px;
`;
const SSmallLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const STextBox = styled.div`
  display: flex;
`;
const STextWrapper = styled.span`
  margin-left: 8px;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;
const SStarWrapper = styled(STextWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 2px;

  color: var(--orange-pri);
`;
const SInputWrapper = styled.input`
  display: flex;

  height: 61px;
  padding: 0 24px;

  border-radius: 16px;
  border: 2px solid var(--gray-100);
  background: var(--gray-100);

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;

  &:focus {
    border: 2px solid var(--orange-pri);
  }

  &::placeholder {
    color: var(--gray-400);
  }
`;
const SWarningWrapper = styled.span`
  margin-left: 8px;

  color: var(--red);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
const STextareaWrapper = styled.textarea`
  height: 132px;
  padding: 20px 24px;

  border-radius: 16px;
  border: 0;
  background: var(--gray-100);

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;

  resize: none;
  outline-color: var(--orange-pri);

  &::placeholder {
    color: var(--gray-400);
  }
`;
const SButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 8px;

  input[type='radio'] {
    -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
    -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거
    appearance: none; // 기본 브라우저에서 기본 스타일 제거
    width: 24px;
    height: 24px;
    border: 2px solid var(--orange-pri); // 체크되지 않았을 때의 테두리 색상
    border-radius: 50%;
    outline: none; // focus 시에 나타나는 기본 스타일 제거
    cursor: pointer;
  }

  input[type='radio']:checked {
    background-color: var(--orange-pri); // 체크 시 내부 원으로 표시될 색상
    border: 7px solid var(--orange-sec); // 테두리가 아닌, 테두리와 원 사이의 색상
    box-shadow: 0 0 0 2px var(--orange-pri); // 얘가 테두리가 됨
    // 그림자로 테두리를 직접 만들어야 함 (퍼지는 정도를 0으로 주면 테두리처럼 보입니다.)
    // 그림자가 없으면 그냥 설정한 색상이 꽉 찬 원으로만 나옵니다.
  }
`;
const SButtonWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 16px;

  padding-left: 16px;
  height: 64px;

  border-radius: 16px;
  background: ${(props) =>
    props.checked ? 'var(--orange-sec)' : 'var(--gray-100)'};

  color: ${(props) => (props.checked ? 'var(--black)' : 'var(--gray-400)')};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;

  cursor: pointer;
`;

export default FundingJoinPage;
