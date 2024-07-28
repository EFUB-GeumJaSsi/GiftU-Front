import styled from 'styled-components';
import { useState } from 'react';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
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
const Btn = (
  <ButtonComponent
    btnInfo={{
      text: '수정하기',
      width: '335px',
      color: 'orange',
    }}
  />
);
const MessageEditPage = () => {
  const [MsgText, setMsgText] = useState(tempList[0].message);
  const handleInputChange = (e) => {
    setMsgText(e.target.value);
  };
  return (
    <SLayout>
      <BackHeaderComponent text='축하메세지' />
      <SForm>
        <FundingPercentage color='orange' />
        <SFieldset>
          <SRequiredLegend>금액</SRequiredLegend>
          <SInput type='text' value={tempList[0].price} readonly />
        </SFieldset>
        <SFieldset>
          <SRequiredLegend>이름</SRequiredLegend>
          <SInput type='text' value={tempList[0].name} readonly />
        </SFieldset>
        <SFieldset>
          <SOptionalLegend>축하메세지</SOptionalLegend>
          <SBigTextarea onChange={handleInputChange} value={MsgText} />
        </SFieldset>
      </SForm>
      <BottomBackgroundComponent Button={Btn} />
    </SLayout>
  );
};
const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
const SForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;

  width: fit-content;
`;
const SFieldset = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;
const SOptionalLegend = styled.legend`
  display: flex;
  gap: 8px;

  width: 76px;
  height: 22px;
  padding: 0px 8px 0px 8px;

  color: var(--black);
  font-size: 16px;
  font-weight: 500;
`;
const SRequiredLegend = styled(SOptionalLegend)`
  &::after {
    content: '*';
    color: var(--orange-pri);
  }
`;
const SInput = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 64px;
  padding: 0px 24px 0px 24px;

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

export default MessageEditPage;
