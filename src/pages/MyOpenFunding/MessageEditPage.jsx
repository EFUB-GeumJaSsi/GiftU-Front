import styled from 'styled-components';
import { useState } from 'react';
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
    <SLayout>
      <BackHeader text=''></BackHeader>
      <SContentContainer>
        <FundingPercentage color='orange'></FundingPercentage>
        <SSmallForm>
          <SRequiredLegend>금액</SRequiredLegend>
          <SSmallTextarea>{tempList[0].price}</SSmallTextarea>
        </SSmallForm>
        <SSmallForm>
          <SRequiredLegend>이름</SRequiredLegend>
          <SSmallTextarea>{tempList[0].name}</SSmallTextarea>
        </SSmallForm>
        <SBigForm>
          <SOptionalLegend>축하메세지</SOptionalLegend>
          <SBigTextarea
            onChange={handleInputChange}
            value={MsgText}
          ></SBigTextarea>
        </SBigForm>
      </SContentContainer>
      <SBtnWrapper>
        <BottomBackground Button={Btn} />
      </SBtnWrapper>
    </SLayout>
  );
};
export default MessageEditPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;

  width: fit-content;
`;
const SSmallForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  width: 335px;
  height: 94px;
`;
const SRequiredLegend = styled.legend`
  display: flex;
  width: 76px;
  height: 22px;
  gap: 8px;

  padding: 0px 8px 0px 8px;

  color: var(--black);
  font-size: 16px;
  font-weight: 500;

  &::after {
    content: '*';
    color: var(--orange-pri);
  }
`;
const SBigForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  width: 335px;
  height: 210px;
`;
const SOptionalLegend = styled.legend`
  display: flex;
  width: 76px;
  height: 22px;
  gap: 8px;

  padding: 0px 8px 0px 8px;

  color: var(--black);
  font-size: 16px;
  font-weight: 500;
`;
const SSmallTextarea = styled.textarea`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 64px;

  padding: 24px;

  border: 2px solid transparent;
  border-radius: 16px;
  background-color: var(--gray-100);

  color: var(--black);
  font-weight: 500;
  font-size: 16px;

  resize: none;
`;
const SBigTextarea = styled.textarea`
  display: flex;
  flex-direction: column;

  height: 180px;
  padding: 24px;

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
