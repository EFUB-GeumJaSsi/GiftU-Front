import styled from 'styled-components';
import { useRef, useState } from 'react';
import BackHeader from '../../components/common/BackHeader';
import FundingSpan from '../../components/FundingInfo/FundingSpan';
import TopFundingInfo from '../../components/FundingInfo/TopFundingInfo';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import CongratsMessage from '../../components/FundingInfo/CongratsMessage';
import BottomBackground from '../../components/common/BottomBackground';
import Button from '../../components/common/ButtonComponent';
import Modal from '../../components/common/ModalComponent';
import {
  GoWriteCommentButton,
  GoWriteMessageButton,
} from '../../components/FundingInfo/GoWriteButton';
import FundingParticipants from '../../components/FundingInfo/FundingParticipants';
import FundingComment from '../../components/FundingInfo/FundingComment';

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

const Btn = (funding, isEnd, setModalShow) => {
  switch (funding) {
    // 내가 참여한 펀딩
    case 'join':
      return (
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
    // 내가 개설한 펀딩
    case 'open':
      if (isEnd) {
        return (
          <Button btnInfo={{ text: '선물 후기 작성하기', color: 'jade' }} />
        );
      } else {
        return (
          <Button
            btnInfo={{
              text: '개설 취소하기',
              onClick: () => setModalShow(true),
            }}
          />
        );
      }
    default:
      return <Button btnInfo={{ text: '선물하기', color: 'orange' }} />;
  }
};

const ModalContent = () => (
  <SModalContainer>
    <SBigTextWrapper>펀딩 개설을 취소하시겠어요?</SBigTextWrapper>
    <SSmallTextWrapper>
      펀딩에 참여한 친구들에게 알림이 전송돼요
    </SSmallTextWrapper>
  </SModalContainer>
);

const FundingInfoPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [wroteMessage, setWroteMessage] = useState(false);
  const messageRef = useRef(null);

  // 상세 정보 조회 후 userId가 로그인 한 유저와 일치하는지 비교
  // 일치하면 open, 불일치 시 contributers에서 유저 정보와 일치하는 userId가 있는지 확인 후 있으면 'join' 없으면 ''
  const [funding, setFunding] = useState('join');
  // 상세 정보 조회 후 fundingEndDate와 오늘 날짜 비교 후 태그 저장
  const [isEnd, setIsEnd] = useState(false);

  const tag = isEnd ? '종료' : 'D-10';
  const color = funding === 'open' ? 'jade' : 'orange';

  const onFocusMessage = () => {
    messageRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <BackHeader />
      <SLayout isend={isEnd.toString()}>
        <TopFundingInfo color={color} tag={tag} />
        {isCommented && isEnd && <FundingComment color={color} />}
        {funding === 'join' ? (
          <GoWriteMessageButton
            color={color}
            price='15,000'
            onClick={onFocusMessage}
            wroteMessage={wroteMessage}
            isEnd={isEnd}
          />
        ) : (
          funding === 'open' && isEnd && <GoWriteCommentButton color={color} />
        )}
        <FundingSpan color={color} />
        <FundingPercentage color={color} />
        {funding === 'open' && <FundingParticipants />}
        <CongratsMessage list={tempList} ref={messageRef} />
      </SLayout>
      {!(isEnd && funding !== 'open') && (
        <BottomBackground Button={Btn(funding, isEnd, setModalShow)} />
      )}
      {modalShow && (
        <Modal actionText='취소하기' setModalShow={setModalShow}>
          <ModalContent />
        </Modal>
      )}
    </>
  );
};

export default FundingInfoPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  padding: ${(props) =>
    props.isend === 'true' ? '16px 16px 40px 16px' : '16px 16px 120px 16px'};
`;

const SBtnContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const SModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;

  padding: 32px 0 28px 0;
`;

const SBigTextWrapper = styled.span`
  color: var(--black);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;

const SSmallTextWrapper = styled(SBigTextWrapper)`
  color: var(--gray-500);
  font-size: 12px;
  line-height: 120%;
`;
