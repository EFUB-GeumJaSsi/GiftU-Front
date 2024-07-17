import React, { useState } from 'react';
import styled from 'styled-components';
import BackHeader from '../../components/common/BackHeader';
import Button from '../../components/common/Button';
import BottomBackground from '../../components/common/BottomBackground';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
const Btn = (
  <Button
    btnInfo={{
      text: '수정하기',
      width: '335px',
      color: 'orange',
    }}
  ></Button>
);
const tempList = [
  {
    name: '이름은최대8글자',
    message:
      '축하 메시지가 표시될 거예요 메시지는 여러 줄이어도 모두 표시되도록 설정해 주세요',
    price: '40,000원',
  },
  {
    name: '김이화',
    message: '생일 축하해!',
  },
  {
    name: '이름은최대8글자',
    message:
      '축하 메시지가 표시될 거예요 메시지는 여러 줄이어도 모두 표시되도록 설정해 주세요',
  },
];
const MessageEditPage = () => {
  const [MsgText, setMsgText] = useState(tempList[0].message);

  const handleInputChange = (e) => {
    setMsgText(e.target.value);
  };
  return (
    <>
      <BackHeader text=''></BackHeader>
      <SLayout>
        <SContentsContainer>
          <FundingPercentage color='orange'></FundingPercentage>
          <SSmallContentContainer>
            <STitleContainer>
              금액 <span style={{ color: 'var(--orange-pri)' }}>*</span>
            </STitleContainer>
            <SSmallTextBoxWrapper>{tempList[0].price}</SSmallTextBoxWrapper>
          </SSmallContentContainer>
          <SSmallContentContainer>
            <STitleContainer>
              이름 <span style={{ color: 'var(--orange-pri)' }}>*</span>
            </STitleContainer>
            <SSmallTextBoxWrapper>{tempList[0].name}</SSmallTextBoxWrapper>
          </SSmallContentContainer>
          <SBigContentContainer>
            <STitleContainer>축하메세지</STitleContainer>
            <SBigTextBoxWrapper
              onChange={handleInputChange}
              value={MsgText}
            ></SBigTextBoxWrapper>
          </SBigContentContainer>
        </SContentsContainer>
      </SLayout>
      <SBtnWrapper>
        <BottomBackground Button={Btn} />
      </SBtnWrapper>
    </>
  );
};
export default MessageEditPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0px 16px 130px 16px;
`;
const SContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;

  width: 335px;
  margin-top: 24px;
`;
const SSmallContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  width: 335px;
  height: 94px;
`;
const SBigContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  width: 335px;
  height: 210px;
`;

const STitleContainer = styled.div`
  display: flex;
  width: 76px;
  height: 22px;
  gap: 8px;

  padding: 0px 8px 0px 8px;

  color: var(--black);
  font-size: 16px;
  font-weight: 500;
`;
const SSmallTextBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 64px;

  padding: 20px;

  border: 2px solid transparent;
  border-radius: 16px;
  background-color: var(--gray-100);

  color: var(--black);
  font-weight: 500;
  font-size: 16px;
`;
const SBigTextBoxWrapper = styled.textarea`
  display: flex;
  flex-direction: column;

  height: 180px;
  padding: 20px;

  border: 2px solid transparent;
  border-radius: 16px;
  background-color: var(--gray-100);

  color: var(--black);
  font-weight: 500;
  font-size: 16px;

  resize: none;
  &:focus {
    border: 2px solid var(--orange-pri);
    outline: none;
  }
`;
const SBtnWrapper = styled.div`
  position: fixed;
  bottom: 0;
`;
