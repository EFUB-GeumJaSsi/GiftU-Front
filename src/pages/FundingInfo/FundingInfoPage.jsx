import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteFunding,
  deleteParticipation,
  getFundingInfo,
} from '../../api/funding';
import { getUserInfo } from '../../api/user';
import { getReview } from '../../api/review';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import FundingSpan from '../../components/FundingInfo/FundingSpan';
import TopFundingInfo from '../../components/FundingInfo/TopFundingInfo';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import CongratsMessage from '../../components/FundingInfo/CongratsMessage';
import FundingParticipants from '../../components/FundingInfo/FundingParticipants';
import FundingComment from '../../components/FundingInfo/FundingComment';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import Modal from '../../components/common/ModalComponent';
import {
  GoWriteCommentButton,
  GoWriteMessageButton,
} from '../../components/FundingInfo/GoWriteButton';
import PasswordComponent from '../../components/common/PasswordComponent';
import ToastComponent from '../../components/common/ToastComponent';

const FundingInfoPage = () => {
  const navigate = useNavigate();
  const messageRef = useRef(null);
  const { fundingId } = useParams();
  const [data, setData] = useState({});
  const [contributers, setContributers] = useState([]);
  const [contributed, setContributed] = useState({});
  const [review, setReview] = useState('');
  const [isEnd, setIsEnd] = useState(false);
  const [funding, setFunding] = useState('');
  const [tag, setTag] = useState('');
  const [color, setColor] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);

  // 축하메시지 컴포넌트 포커싱
  const onFocusMessage = () => {
    messageRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // 펀딩 진행 중 or 종료 데이터 저장
  const handleSetStatus = (status, fundingEndDate) => {
    if (status === 'IN_PROGRESS') {
      setIsEnd(false);
      const today = new Date();
      const endDate = new Date(fundingEndDate);
      const diff = Math.abs(endDate.getTime() - today.getTime());
      setTag(`D-${Math.ceil(diff / (1000 * 60 * 60 * 24))}`);
    } else {
      setIsEnd(true);
      setTag('종료');
    }
  };

  // 펀딩 오픈, 참여, 미참여 and 색상 저장
  // 펀딩 개설 userId와 로그인 한 userId 비교, 일치하면 open
  // 불일치 시 contributers에서 userId와 동일한 userId가 있는지 ? 'joined' : 'pre'
  const handleSetType = async (userId, contributers) => {
    try {
      const response = await getUserInfo();
      const data = response.data;

      if (data.userId == userId) {
        setFunding('open');
        setColor('var(--jade-pri)');
        return;
      }

      const item =
        contributers &&
        contributers.find((it) => it.nickname === data.nickname);
      if (item) {
        setFunding('joined');
        setColor('var(--orange-pri)');
        setContributed(item);
        return;
      }

      setFunding('pre');
      setColor('var(--orange-pri)');
    } catch (e) {
      console.log(e);
    }
  };

  // 펀딩 상세 정보 조회
  const readFundingInfo = async () => {
    try {
      const res = await getFundingInfo(fundingId);
      const data = res.data;
      console.log(data);
      data.contributers && setContributers(data.contributers);
      handleSetStatus(data.status, data.fundingEndDate);
      handleSetType(data.userId, data.contributers);
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  // 리뷰 조회
  const readReview = async () => {
    try {
      const res = await getReview(data.fundingId);
      setReview(res.data.reviewContent);
    } catch (e) {
      console.log(e);
    }
  };

  // 펀딩 개설 취소
  const delFunding = async () => {
    try {
      const res = await deleteFunding(data.fundingId);
      navigate('/my/funding/open');
    } catch (e) {
      console.log(e);
    }
  };

  // 펀딩 참여 취소
  const delParticipation = async () => {
    try {
      const res = await deleteParticipation(contributed.participationId);
      window.location.reload();
      setToastShow(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (data.password) {
      setBottomSheetShow(true);
    }
  }, [data.password]);

  // 최초 렌더링 api 호출
  useEffect(() => {
    if (fundingId) {
      readFundingInfo();
    }
  }, [fundingId]);

  // 종료되었고 리뷰 존재하면 readReview()
  useEffect(() => {
    if (isEnd && data.existedReview) {
      readReview();
    }
  }, [funding, isEnd, data.existedReview]);

  const Btn = () => {
    // 내가 참여한
    if (funding === 'joined') {
      return (
        <SBtnContainer>
          <ButtonComponent
            btnInfo={{ text: '참여 취소', width: '104px' }}
            onClick={delParticipation}
          />
          <ButtonComponent
            btnInfo={{
              text: '축하 메시지 수정하기',
              width: '223px',
              color: 'orange',
            }}
            onClick={() => navigate(`/funding/${fundingId}/message/edit`)}
          />
        </SBtnContainer>
      );
    }
    // 내가 개설한
    if (funding === 'open') {
      if (isEnd) {
        return (
          <ButtonComponent
            btnInfo={{
              text: data.existedReview
                ? '선물 후기 수정하기'
                : ' 선물 후기 작성하기',
              color: 'jade',
            }}
            onClick={() => navigate(`/funding/${fundingId}/review/edit`)}
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
    }
    // 미참여
    return (
      <ButtonComponent
        btnInfo={{ text: '선물하기', color: 'orange' }}
        onClick={() => navigate(`/funding/${fundingId}/join`)}
      />
    );
  };

  return (
    <>
      <BackHeaderComponent />
      <SLayout $isEnd={isEnd && funding !== 'open'}>
        {data.password && bottomSheetShow && funding === 'pre' ? (
          <>
            <TopFundingInfo
              color={color}
              tag={tag}
              title={data.fundingTitle}
              image={data.fundingImageUrl}
            />
            <SSmallDiv />
            <SDiv />
          </>
        ) : (
          <>
            <TopFundingInfo
              color={color}
              tag={tag}
              title={data.fundingTitle}
              infoText={data.fundingContent}
              image={data.fundingImageUrl}
            />
            {data.existedReview && isEnd && (
              <FundingComment color={color} comment={review} />
            )}
            {funding === 'joined' ? (
              <GoWriteMessageButton
                color={color}
                isEnd={isEnd}
                price={contributed.contributionAmount}
                wroteMessage={contributed.message}
                onClick={onFocusMessage}
              />
            ) : (
              funding === 'open' &&
              !data.existedReview &&
              isEnd && <GoWriteCommentButton color={color} />
            )}
            <FundingSpan
              color={color}
              name={data.nickname}
              startDate={data.createdAt && data.createdAt.split('T')[0]}
              endDate={data.fundingEndDate}
            />
            <FundingPercentage
              type='info'
              color={color}
              giftList={data.giftList}
              nowMoney={data.nowMoney}
            />
            {funding === 'open' && <FundingParticipants list={contributers} />}
            {contributers.length > 0 && (
              <CongratsMessage list={contributers} ref={messageRef} />
            )}
          </>
        )}
      </SLayout>
      {!(isEnd && funding !== 'open') && funding && (
        <BottomBackgroundComponent Button={<Btn />} />
      )}
      {modalShow && (
        <Modal
          actionText='취소하기'
          onClickAction={delFunding}
          setModalShow={setModalShow}
        >
          <SModalContainer>
            <SBigSpan>펀딩 개설을 취소하시겠어요?</SBigSpan>
            <SSmallSpan>펀딩에 참여한 친구들에게 알림이 전송돼요</SSmallSpan>
          </SModalContainer>
        </Modal>
      )}
      {funding === 'pre' && bottomSheetShow && (
        <PasswordComponent
          color='orange'
          fundingId={fundingId}
          name={data.nickname}
          validPassword={() => setBottomSheetShow(false)}
          action='back' // 바텀시트 cross 버튼 클릭 시 뒤로가기 + background 이벤트리스너 비활성화
          setBottomSheetShow={setBottomSheetShow}
        />
      )}
      {toastShow && (
        <ToastComponent setToastShow={setToastShow}>
          펀딩 참여가 취소되었어요
        </ToastComponent>
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
    props.$isEnd === true ? '16px 16px 40px 16px' : '16px 16px 120px 16px'};
`;
const SDiv = styled.div`
  width: 335px;
  height: 200px;

  border-radius: 16px;
  background-color: var(--gray-100);
`;
const SSmallDiv = styled(SDiv)`
  height: 74px;
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
