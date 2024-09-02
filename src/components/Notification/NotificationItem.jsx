import styled from 'styled-components';
import { B1, B2, C2 } from '../../styles/font';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postFriendAccept, postFriendReject } from '../../api/friend';
import DialogComponent from '../../components/common/DialogComponent';
import icn_profile_default from '../../assets/common/profile_default.svg';
import icn_info from '../../assets/Friend/icn_info.svg';

// 친구 요청 수락 API 연결
const createFriendAccept = async (friendTableId) => {
  try {
    const response = await postFriendAccept(friendTableId);
    location.reload(true);
  } catch (error) {
    console.error(error);
  }
};
// 친구 요청 거절 API 연결
const createFriendReject = async (friendTableId) => {
  try {
    const response = await postFriendReject(friendTableId);
    location.reload(true);
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
  const [dialogShow, setDialogShow] = useState(false);
  const handleNotiClick = {
    friend: () => setDialogShow(true),
    fundingDueDate: () => navigate(`/funding/${data.id}`),
    fundingAchieve: () => navigate(`/funding/${data.id}`),
  };
  const image = {
    friend: data.image || icn_profile_default,
    fundingDueDate: data.image,
    fundingAchieve: data.image,
  };
  const message = {
    friend: `님이 친구 요청을 보냈습니다`,
    fundingDueDate:
      formatDday(data.endDate) === 0
        ? '펀딩 오늘 종료'
        : `펀딩 종료 ${formatDday(data.endDate)}일 전`,
    fundingAchieve: `펀딩 ${Number(data.percent).toFixed(1)}% 달성`,
  };

  return (
    <>
      <SNotiContainer onClick={handleNotiClick[data.tag]}>
        <SNotiImg src={image[data.tag]} />
        <SNotiTextContainer>
          <SNotiNameSpan>{data.name} </SNotiNameSpan>
          <SNotiMessageSpan>{message[data.tag]}</SNotiMessageSpan>
          <SNotiTimeSpan>{formatNotiTime(data.rawTime)}</SNotiTimeSpan>
        </SNotiTextContainer>
      </SNotiContainer>
      {dialogShow && (
        <DialogComponent
          cancelText='거절하기'
          onClickCancel={() => createFriendReject(data.id)}
          actionText='추가하기'
          onClickAction={() => createFriendAccept(data.id)}
          setDialogShow={setDialogShow}
        >
          <SDialogContainer>
            <SDialogImg src={image[data.tag]} />
            <SDialogNameSpan>{data.name}</SDialogNameSpan>
            <SDialogHeadingSpan>친구를 추가하시겠어요?</SDialogHeadingSpan>
            <SDialogBodySpan>
              추가된 친구는 [내 친구]에서 확인할 수 있어요
            </SDialogBodySpan>
          </SDialogContainer>
        </DialogComponent>
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

// Dialog
const SDialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  padding-top: 24px;
  padding-bottom: 24px;
`;
const SDialogImg = styled.img`
  width: 40px;
  height: 40px;

  background-color: var(--gray-300);
  border-radius: 50%;
`;
const SDialogNameSpan = styled(SNameSpan)`
  color: var(--gray-500);
`;
const SDialogHeadingSpan = styled.span`
  ${B1}
  color: var(--black);
`;
const SDialogBodySpan = styled.span`
  ${C2}
  color: var(--gray-500);

  &::before {
    content: url(${icn_info});
    vertical-align: text-top;
    margin-right: 4px;
  }
`;

export default NotificationItem;
