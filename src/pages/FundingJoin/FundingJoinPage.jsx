import styled from 'styled-components';
import { useEffect, useState } from 'react';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import { addComma } from '../../components/FundingInfo/FundingPercentage';
import PriceInputComponent from '../../components/common/PriceInputComponent';

const giftList = [
  { image: '', title: '선물 제목', price: 200000 },
  { image: '', title: '선물 제목', price: 500000 },
  { image: '', title: '선물 제목', price: 840000 },
  { image: '', title: '선물 제목', price: 1000000 },
];

const FundingJoinPage = () => {
  const [balance, setBalance] = useState(84000);
  const [price, setPrice] = useState(null);
  const [message, setMessage] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [name, setName] = useState('nickname');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleRadioChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    price <= balance ? setIsDone(true) : setIsDone(false);
  }, [price, balance]);

  return (
    <>
      <BackHeaderComponent />
      <SLayout>
        <FundingPercentage
          type='info'
          color='var(--orange-pri)'
          balance={price ? balance - parseInt(price) : balance}
          giftList={giftList}
          joinPrice={price && isDone ? price : undefined}
        />
        <SForm>
          <SContainer>
            <STextBox htmlFor='price'>
              <STextWrapper>금액</STextWrapper>
              <SStarWrapper>*</SStarWrapper>
            </STextBox>
            <PriceInputComponent
              focusColor='var(--orange-pri)'
              price={price}
              setPrice={setPrice}
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
              <SButtonWrapper htmlFor='nickname' checked={name === 'nickname'}>
                <input
                  id='nickname'
                  type='radio'
                  value='nickname'
                  checked={name === 'nickname'}
                  onChange={handleRadioChange}
                />
                닉네임
              </SButtonWrapper>
              <SButtonWrapper htmlFor='anony' checked={name === 'anony'}>
                <input
                  id='anony'
                  type='radio'
                  value='anony'
                  checked={name === 'anony'}
                  onChange={handleRadioChange}
                />
                익명
              </SButtonWrapper>
            </SButtonContainer>
          </SContainer>
          <SContainer>
            <STextWrapper htmlFor='message'>축하메시지</STextWrapper>
            <STextareaWrapper
              id='message'
              value={message}
              onChange={handleMessageChange}
              placeholder='친구에게 전달될 메시지를 입력해 주세요'
            />
          </SContainer>
        </SForm>
      </SLayout>
      <BottomBackgroundComponent
        Button={
          <ButtonComponent
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
const SForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

const SContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const STextBox = styled.label`
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

  &::placeholder {
    color: var(--gray-400);
  }

  &:focus {
    outline: 2px solid var(--orange-pri);
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
