import styled from 'styled-components';
import { useEffect, useState } from 'react';
import BackHeader from '../../components/common/BackHeader';
import BottomBackground from '../../components/common/BottomBackground';
import Button from '../../components/common/ButtonComponent';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import { ReactComponent as OnRadio } from '../../assets/FundingJoin/btn_radio_on.svg';
import { ReactComponent as OffRadio } from '../../assets/FundingJoin/btn_radio_off.svg';
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
  const [isChecked, setIsChecked] = useState(true);
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
    setIsChecked(!isChecked);
    setName(e.target.name);
  };

  const RadioBtn = ({ checked }) => {
    return checked ? <OnRadio /> : <OffRadio />;
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
              <SButtonWrapperL
                name='nickname'
                checked={isChecked}
                onClick={handleRadioClick}
              >
                <RadioBtn checked={isChecked} />
                닉네임
              </SButtonWrapperL>
              <SButtonWrapperR
                name='anony'
                checked={!isChecked}
                onClick={handleRadioClick}
              >
                <RadioBtn checked={!isChecked} />
                익명
              </SButtonWrapperR>
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

export default FundingJoinPage;

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
  gap: 8px;
`;

const STextWrapper = styled.span`
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
  display: flex;
  gap: 8px;

  input {
    visibility: hidden;
  }
`;

const SButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;

  border-radius: 16px;
  background: ${(props) =>
    props.checked ? 'var(--orange-sec)' : 'var(--gray-100)'};

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const SButtonWrapperL = styled(SButtonWrapper)`
  padding: 20px 121px 20px 16px;
`;

const SButtonWrapperR = styled(SButtonWrapper)`
  padding: 20px 24px 20px 16px;
`;
