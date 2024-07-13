import styled from 'styled-components';
import { useState, useRef } from 'react';
import BackHeader from '../../components/common/BackHeader';
import TopFundingInfo from '../../components/FundingInfo/TopFundingInfo';
import FundingComment from '../../components/FundingInfo/FundingComment';
import {
  GoWriteButton,
  GoWriteButtonRead,
} from '../../components/FundingInfo/GoWriteButton';
import FundingSpan from '../../components/FundingInfo/FundingSpan';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import CongratsMessage from '../../components/FundingInfo/CongratsMessage';
import Button from '../../components/common/Button';
import BottomBackground from '../../components/common/BottomBackground';

const tempList = [
  {
    name: '이름은최대8글자',
    message:
      '축하 메시지가 표시될 거예요 메시지는 여러 줄이어도 모두 표시되도록 설정해 주세요',
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

const JoinFundingInfopage = () => {
  const [isEnd, setIsEnd] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const messageRef = useRef(null);

  const onFocusMessage = () => {
    messageRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const Btn = (
    <SBtnContainer>
      <Button btnInfo={{ text: '참여 취소', width: '104px' }}></Button>
      <Button
        btnInfo={{
          text: '축하 메시지 수정하기',
          width: '223px',
          color: 'orange',
        }}
      ></Button>
    </SBtnContainer>
  );

  return (
    <>
      <BackHeader />
      <SLayout>
        <TopFundingInfo color='orange' tag='D-10' />
        {isCommented && <FundingComment color='orange' />}
        {isEnd ? (
          <GoWriteButtonRead
            color='orange'
            price='15,000'
            onClick={onFocusMessage}
          />
        ) : (
          <GoWriteButton color='orange' />
        )}
        <FundingSpan color='orange' />
        <FundingPercentage color='orange' />
        <CongratsMessage list={tempList} ref={messageRef} />
      </SLayout>
      {/* 종료된 펀딩의 경우 하단 없음 */}
      {!isEnd && <BottomBackground Button={Btn} />}
    </>
  );
};

export default JoinFundingInfopage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  padding: 16px 16px 40px 16px;
`;

const SBtnContainer = styled.div`
  display: flex;
  gap: 8px;
`;
