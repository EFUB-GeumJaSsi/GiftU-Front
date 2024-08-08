import styled from 'styled-components';
import { B1, B2, C2 } from '../../styles/font';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postFriendAccept, postFriendReject } from '../../api/friend';
import Modal from '../../components/common/ModalComponent';
import icn_profile_default from '../../assets/common/profile_default.svg';
import icn_info from '../../assets/Friend/icn_info.svg';

// 친구 요청 수락 API 연결
const createFriendAccept = async (friendTableId) => {
  try {
    const response = await postFriendAccept(friendTableId);
    location.reload(true);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
// 친구 요청 거절 API 연결
const createFriendReject = async (friendTableId) => {
  try {
    const response = await postFriendReject(friendTableId);
    location.reload(true);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const formatNotiTime = (rawTime) => {
  const now = new Date();
  const past = new Date(rawTime);

  const diff = Math.floor((now - past) / 1000);
  const days = Math.floor(diff / (3600 * 24));
  const hours = Math.floor((diff % (3600 * 24)) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);

  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `방금 전`;
  }
};
const formatDday = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);

  const diff = end.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return daysRemaining;
};

const NotificationItem = ({ data }) => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const handleNotiClick = () => {
    switch (data.tag) {
      case 'friend':
        return setModalShow(true);
      case 'fundingDueDate':
        return navigate(`/funding/${data.id}`);
      case 'fundingAchieve':
        return navigate(`/funding/${data.id}`);
    }
  };
  const image = () => {
    switch (data.tag) {
      case 'friend':
        return data.image || icn_profile_default;
      case 'fundingDueDate':
        return data.image;
      case 'fundingAchieve':
        return data.image;
    }
  };
  const message = () => {
    switch (data.tag) {
      case 'friend':
        return `님이 친구 요청을 보냈습니다`;
      case 'fundingDueDate':
        return formatDday(data.endDate) === 0
          ? '오늘 펀딩 종료'
          : `펀딩 종료 ${formatDday(data.endDate)}일 전`;
      case 'fundingAchieve':
        return `펀딩 ${Number(data.percent).toFixed(1)}% 달성`;
    }
  };

  return (
    <>
      <SNotiContainer onClick={handleNotiClick}>
        <SNotiImg src={image()} />
        <SNotiTextContainer>
          <SNotiNameSpan>{data.name} </SNotiNameSpan>
          <SNotiMessageSpan>{message()}</SNotiMessageSpan>
          <SNotiTimeSpan>{formatNotiTime(data.rawTime)}</SNotiTimeSpan>
        </SNotiTextContainer>
      </SNotiContainer>
      {modalShow && (
        <Modal
          cancelText='거절하기'
          onClickCancel={() => createFriendReject(data.id)}
          actionText='추가하기'
          onClickAction={() => createFriendAccept(data.id)}
          setModalShow={setModalShow}
        >
          <SModalContainer>
            <SModalImg src={image()} />
            <SModalNameSpan>{data.name}</SModalNameSpan>
            <SModalHeadingSpan>친구를 추가하시겠어요?</SModalHeadingSpan>
            <SModalBodySpan>
              추가된 친구는 [내 친구]에서 확인할 수 있어요
            </SModalBodySpan>
          </SModalContainer>
        </Modal>
      )}
    </>
  );
};

// 공통 스타일
const SNameSpan = styled.span`
  overflow: hidden;

  ${B1}
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// NotiItem
const SNotiContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  width: 335px;
  height: 72px;

  border-bottom: 1px solid var(--gray-100);

  cursor: pointer;
`;
const SNotiImg = styled.img`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background-color: #d4d4d4;
`;
const SNotiTextContainer = styled.div`
  display: grid;
  grid-template-areas:
    'name message'
    'time time';
  gap: 4px;
`;
const SNotiNameSpan = styled(SNameSpan)`
  grid-area: name;
`;
const SNotiMessageSpan = styled.span`
  overflow: hidden;
  grid-area: message;

  ${B2}
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const SNotiTimeSpan = styled.span`
  grid-area: time;

  ${C2}
  color: var(--gray-500);
`;

// Modal
const SModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  padding-top: 24px;
  padding-bottom: 24px;
`;
const SModalImg = styled.img`
  width: 40px;
  height: 40px;

  background-color: var(--gray-300);
  border-radius: 50%;
`;
const SModalNameSpan = styled(SNameSpan)`
  color: var(--gray-500);
`;
const SModalHeadingSpan = styled.span`
  ${B1}
  color: var(--black);
`;
const SModalBodySpan = styled.span`
  ${C2}
  color: var(--gray-500);

  &::before {
    content: url(${icn_info});
    vertical-align: text-top;
    margin-right: 4px;
  }
`;

export default NotificationItem;
