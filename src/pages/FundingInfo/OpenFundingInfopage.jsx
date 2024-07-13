import styled from 'styled-components';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BackHeader from '../../components/common/BackHeader';
import BottomBackground from '../../components/common/BottomBackground';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import CongratsMessage from '../../components/FundingInfo/CongratsMessage';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import FundingSpan from '../../components/FundingInfo/FundingSpan';
import TopFundingInfo from '../../components/FundingInfo/TopFundingInfo';
import { GoWriteButton } from '../../components/FundingInfo/GoWriteButton';
import FundingComment from '../../components/FundingInfo/FundingComment';
import FundingParticipants from '../../components/FundingInfo/FundingParticipants';

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

const OpenFundingInfoPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = searchParams.get('sort');

  const tag = params === 'end' ? '종료' : 'D-10';

  const Btn =
    params === 'end' ? (
      <Button btnInfo={{ text: '선물 후기 작성하기', color: 'jade' }} />
    ) : (
      <Button
        btnInfo={{ text: '개설 취소하기', onClick: () => setModalShow(true) }}
      />
    );

  return (
    <>
      <BackHeader />
      <SLayout>
        <TopFundingInfo tag={tag} />
        {params !== 'end' ? (
          <></>
        ) : isCommented ? (
          <FundingComment />
        ) : (
          <GoWriteButton />
        )}
        <FundingSpan />
        <FundingPercentage />
        <FundingParticipants />
        <CongratsMessage list={tempList} />
      </SLayout>
      <BottomBackground Button={Btn} />
      {modalShow && (
        <Modal actionText='취소하기' setModalShow={setModalShow}>
          <SModalContainer>
            <SBigTextWrapper>펀딩 개설을 취소하시겠어요?</SBigTextWrapper>
            <SSmallTextWrapper>
              펀딩에 참여한 친구들에게 알림이 전송돼요
            </SSmallTextWrapper>
          </SModalContainer>
        </Modal>
      )}
    </>
  );
};

export default OpenFundingInfoPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  padding: 16px 16px 40px 16px;
`;

const SModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
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
