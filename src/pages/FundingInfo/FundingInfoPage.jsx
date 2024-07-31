import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import FundingSpan from '../../components/FundingInfo/FundingSpan';
import TopFundingInfo from '../../components/FundingInfo/TopFundingInfo';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import CongratsMessage from '../../components/FundingInfo/CongratsMessage';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import Modal from '../../components/common/ModalComponent';
import {
  GoWriteCommentButton,
  GoWriteMessageButton,
} from '../../components/FundingInfo/GoWriteButton';
import FundingParticipants from '../../components/FundingInfo/FundingParticipants';
import FundingComment from '../../components/FundingInfo/FundingComment';
import PasswordComponent from '../../components/common/PasswordComponent';

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

const giftList = [
  { image: '', title: '선물 제목', price: 30000 },
  { image: '', title: '선물 제목', price: 65000 },
  { image: '', title: '선물 제목', price: 84000 },
  { image: '', title: '선물 제목', price: 130000 },
];

const FundingInfoPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [wroteMessage, setWroteMessage] = useState(false);
  const [getPassword, setGetPassword] = useState('1234');
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  // 펀딩 개설자 유저 정보 조회 후 저장
  const [name, setName] = useState('김이화');
  const messageRef = useRef(null);
  const [image, setImage] = useState(
    'https://image.vans.co.kr/cmsstatic/product/VN000CSE5T21_VN000CSE5T21_primary.jpg?browse',
  );
  // 상세 정보 조회 후 userId가 로그인 한 유저와 일치하는지 비교
  // 일치하면 open, 불일치 시 contributers에서 유저 정보와 일치하는 userId가 있는지 확인 후 있으면 'joined' 없으면 'pre'
  const [funding, setFunding] = useState('pre');
  // 상세 정보 조회 후 fundingStatus 확인
  const [isEnd, setIsEnd] = useState(false);
  const [tag, setTag] = useState(isEnd ? '종료' : 'D-10');
  const [color, setColor] = useState(
    funding === 'open' ? 'var(--jade-pri)' : 'var(--orange-pri)',
  );

  const onFocusMessage = () => {
    messageRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (getPassword) {
      setBottomSheetShow(true);
    }
  }, [getPassword]);

  const Btn = () => {
    switch (funding) {
      // 내가 참여한 펀딩
      case 'joined':
        return (
          <SBtnContainer>
            <ButtonComponent btnInfo={{ text: '참여 취소', width: '104px' }} />
            <ButtonComponent
              btnInfo={{
                text: '축하 메시지 수정하기',
                width: '223px',
                color: 'orange',
              }}
            />
          </SBtnContainer>
        );
      // 내가 개설한 펀딩
      case 'open':
        if (isEnd) {
          return (
            <ButtonComponent
              btnInfo={{ text: '선물 후기 작성하기', color: 'jade' }}
            />
          );
        } else {
          return (
            <ButtonComponent
              btnInfo={{
                text: '개설 취소하기',
              }}
              onClick={() => setModalShow(true)}
            />
          );
        }
      default:
        return (
          <ButtonComponent btnInfo={{ text: '선물하기', color: 'orange' }} />
        );
    }
  };

  const ModalContent = () => (
    <SModalContainer>
      <SBigSpan>펀딩 개설을 취소하시겠어요?</SBigSpan>
      <SSmallSpan>펀딩에 참여한 친구들에게 알림이 전송돼요</SSmallSpan>
    </SModalContainer>
  );

  return (
    <>
      <BackHeaderComponent />
      <SLayout $isEnd={isEnd.toString()}>
        <TopFundingInfo color={color} tag={tag} image={image} />
        {isCommented && isEnd && <FundingComment color={color} />}
        {funding === 'joined' ? (
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

        <FundingPercentage
          type='info'
          color={color}
          giftList={giftList}
          balance={84000}
        />
        {funding === 'open' && <FundingParticipants />}
        <CongratsMessage list={tempList} ref={messageRef} />
      </SLayout>
      {!(isEnd && funding !== 'open') && (
        <BottomBackgroundComponent Button={Btn()} />
      )}
      {modalShow && (
        <Modal actionText='취소하기' setModalShow={setModalShow}>
          <ModalContent />
        </Modal>
      )}
      {funding === 'pre' && bottomSheetShow && (
        <PasswordComponent
          passwordExact={getPassword}
          setBottomSheetShow={setBottomSheetShow}
          validPassword={() => setBottomSheetShow(false)}
          name={name}
          color='orange'
        />
      )}
    </>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  padding: ${(props) =>
    props.$isEnd === 'true' ? '16px 16px 40px 16px' : '16px 16px 120px 16px'};
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
const SBigSpan = styled.span`
  color: var(--black);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;
const SSmallSpan = styled(SBigSpan)`
  color: var(--gray-500);
  font-size: 12px;
  line-height: 120%;
`;

export default FundingInfoPage;
