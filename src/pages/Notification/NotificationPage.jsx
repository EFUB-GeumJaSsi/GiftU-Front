import styled from 'styled-components';
import { useState, useEffect } from 'react';
import TagSelectComponent from '../../components/common/TagSelectComponent';
import Modal from '../../components/common/ModalComponent';
import { ReactComponent as IcnInfo } from '../../assets/Friend/icn_info.svg';
import { ReactComponent as ProfileIcon } from '../../assets/common/profile_default.svg';
import { useNavigate } from 'react-router-dom';
import NavComponent from '../../components/common/NavComponent';
import {
  getAllNotice,
  getFriendNotice,
  getFundingNotice,
} from '../../api/notice';
import { postFriendAccept, postFriendReject } from '../../api/friend';

// 현재 시간에서 알림받은 시간을 빼서 보여주는 코드
const getTime = (timestamp) => {
  const current = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((current - past) / 1000);

  const days = Math.floor(diffInSeconds / (3600 * 24));
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);

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

// 종료일까지 남은 날 수 계산
const getDaysRemaining = (fundingEndDate) => {
  const now = new Date();
  const endDate = new Date(fundingEndDate);
  const diffInMilliseconds = endDate - now;
  const daysRemaining = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

  return daysRemaining;
};

// 알림 데이터를 최신순으로 정렬
const sortNotificationsByTime = (notifications) => {
  return notifications.sort(
    (a, b) => new Date(b.rawTime) - new Date(a.rawTime),
  );
};

const NotificationPage = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [tag, setTag] = useState('전체');
  const tags = ['전체', '친구', '펀딩'];
  const [friendTableId, setFriendTableId] = useState('');
  const navigate = useNavigate();

  // 친구 알림 모달창
  const friendNotiClick = (image, name) => {
    setModalContent(
      <SModalContainer>
        {image === null ? <StyledProfileIcon /> : <SImg src={image} />}
        <span>{name}</span>
        <span style={{ color: 'var(--black)' }}>친구를 추가하시겠어요?</span>
        <span style={{ fontSize: '12px' }}>
          <IcnInfo /> 추가된 친구는 [내 친구]에서 확인할 수 있어요
        </span>
      </SModalContainer>,
    );
    setModalShow(true);
  };

  // 펀딩 알림 클릭 시 해당 펀딩 페이지로 이동
  const fundingNotiClick = (fundingId) => {
    navigate(`/funding/${fundingId}`);
  };

  const filteredNotifications = notificationList.filter((notification) => {
    if (tag === '전체') return true;
    if (tag === '친구' && notification.tag === 'friend') return true;
    if (
      tag === '펀딩' &&
      (notification.tag === 'fundingAchieve' ||
        notification.tag === 'fundingDueDate')
    )
      return true;
    return false;
  });

  useEffect(() => {
    if (tag === '전체') {
      readNotificationAll();
    } else if (tag === '친구') {
      readNotificationFriend();
    } else if (tag === '펀딩') {
      readNotificationFunding();
    }
  }, [tag]);

  // 전체 알림 조회 API 연결
  const readNotificationAll = async () => {
    try {
      const response = await getAllNotice();
      const formattedNotifications = formatNotifications(response.data);
      setNotificationList(sortNotificationsByTime(formattedNotifications));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 친구 알림 조회 API 연결
  const readNotificationFriend = async () => {
    try {
      const response = await getFriendNotice();
      const data = Array.isArray(response.data) ? response.data : [];
      if (data.length === 0) {
        setNotificationList([]);
      } else {
        const friendNotifications = data.map((item) => ({
          ...item,
          tag: 'friend',
          time: getTime(item.updatedAt),
          image: item.recieveUserImgUrl,
          name: item.recieveUserNickname,
          friendTableId: setFriendTableId(item.friendTableId),
          rawTime: item.updatedAt,
        }));
        setNotificationList(sortNotificationsByTime(friendNotifications));
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 펀딩 알림 조회 API 연결
  const readNotificationFunding = async () => {
    try {
      const response = await getFundingNotice();
      const now = response.data.now;
      const fundingNotifications = [
        ...response.data.fundingDueDate.map((item) => ({
          ...item,
          id: item.fundingId,
          tag: 'fundingDueDate',
          image: item.fundingImageUrl,
          name: item.fundingTitle,
          time: getTime(now),
          end: getDaysRemaining(item.fundingEndDate),
          rawTime: now,
        })),
        ...response.data.fundingAchieve
          .filter(
            (item) =>
              (item.percent >= 25 && item.percent <= 35) ||
              (item.percent >= 50 && item.percent <= 60) ||
              (item.percent >= 75 && item.percent <= 85),
          )
          .map((item) => ({
            ...item,
            id: item.fundingId,
            tag: 'fundingAchieve',
            image: item.fundingImageUrl,
            name: item.fundingTitle,
            time: getTime(item.lastParticipateTime),
            rawTime: item.lastParticipateTime,
          })),
      ];
      setNotificationList(sortNotificationsByTime(fundingNotifications));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 알림 데이터 포맷팅
  const formatNotifications = (data) => {
    const now = data.now;
    const friendNotices = data.friendNotice.map((notice) => ({
      ...notice,
      tag: 'friend',
      image: notice.recieveUserImgUrl,
      name: notice.recieveUserNickname,
      time: getTime(notice.updatedAt),
      friendTableId: setFriendTableId(notice.friendTableId),
      rawTime: notice.updatedAt,
    }));
    const fundingDueDateNotices = data.fundingDueDate.map((notice) => ({
      ...notice,
      id: notice.fundingId,
      tag: 'fundingDueDate',
      image: notice.fundingImageUrl,
      name: notice.fundingTitle,
      time: getTime(now),
      end: getDaysRemaining(notice.fundingEndDate),
      rawTime: now,
    }));
    const fundingAchieveNotices = data.fundingAchieve
      .filter(
        (notice) =>
          (notice.percent >= 25 && notice.percent <= 35) ||
          (notice.percent >= 50 && notice.percent <= 60) ||
          (notice.percent >= 75 && notice.percent <= 85),
      )
      .map((notice) => ({
        ...notice,
        id: notice.fundingId,
        tag: 'fundingAchieve',
        image: notice.fundingImageUrl,
        name: notice.fundingTitle,
        percent: notice.percent,
        time: getTime(notice.lastParticipateTime),
        rawTime: notice.lastParticipateTime,
      }));
    return [
      ...friendNotices,
      ...fundingDueDateNotices,
      ...fundingAchieveNotices,
    ];
  };

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

  const handleFormSubmit = async () => {
    await createFriendAccept(friendTableId);
  };

  const handleFormReject = async () => {
    await createFriendReject(friendTableId);
  };

  return (
    <SLayout>
      <SHeader>알림</SHeader>
      <SItemContainer>
        <TagSelectComponent
          tags={tags}
          selectedTag={tag}
          onTagChange={setTag}
        />
        <SOl>
          {filteredNotifications.map((notification, index) =>
            // tag가 친구일 때
            notification.tag === 'friend' ? (
              <SALayout
                key={index}
                onClick={() =>
                  friendNotiClick(
                    notification.recieveUserImgUrl,
                    notification.name,
                    notification.friendTableId,
                  )
                }
              >
                {notification.recieveUserImgUrl === null ? (
                  <AStyledProfileIcon />
                ) : (
                  <SAImg src={notification.recieveUserImgUrl} />
                )}
                <STextContainer>
                  <STextboxContainer>
                    <SNameText>{notification.name} </SNameText>
                    <SMessageText>님이 친구 요청을 보냈습니다</SMessageText>
                  </STextboxContainer>
                  <STimeText>{notification.time}</STimeText>
                </STextContainer>
              </SALayout>
            ) : (
              // tag가 펀딩일 때
              <SALayout
                onClick={() => fundingNotiClick(notification.id)}
                key={index}
              >
                <SAImg src={notification.fundingImageUrl} />
                <STextContainer>
                  <STextboxContainer>
                    <SNameText>{notification.name} </SNameText>
                    {notification.tag === 'fundingAchieve' ? (
                      <SMessageText>
                        펀딩 {notification.percent}% 달성
                      </SMessageText>
                    ) : (
                      <SMessageText>
                        펀딩 종료 {notification.end}일 전
                      </SMessageText>
                    )}
                  </STextboxContainer>
                  <STimeText>{notification.time}</STimeText>
                </STextContainer>
              </SALayout>
            ),
          )}
        </SOl>
      </SItemContainer>
      <NavComponent />
      {modalShow && (
        <Modal
          cancelText='거절하기'
          onClickCancel={handleFormReject}
          actionText='추가하기'
          onClickAction={handleFormSubmit}
          setModalShow={setModalShow}
        >
          {modalContent}
        </Modal>
      )}
    </SLayout>
  );
};

const SImg = styled.img`
  width: 40px;
  height: 40px;

  background-color: var(--gray-300);
  border-radius: 50%;
`;
const SModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  padding-top: 24px;
  padding-bottom: 24px;

  span {
    display: flex;
    align-items: center;
    gap: 3px;

    font-weight: 500;
    font-size: 16px;
    color: var(--gray-500);
  }
`;
const StyledProfileIcon = styled(ProfileIcon)`
  width: 56px;
  height: 56px;

  border-radius: 50%;
  background-color: var(--gray-300);
`;
const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;

  margin: 0 auto;
  padding: 40px 0 128px;
  gap: 24px;
`;

const SHeader = styled.header`
  padding-left: 28px;

  color: var(--black);
  font-size: 22px;
  font-weight: 700;
`;

const SItemContainer = styled.main`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 16px;
`;

const SOl = styled.ol`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const SALayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  width: 335px;
  height: 72px;

  border-bottom: 1px solid var(--gray-100);

  cursor: pointer;
`;

const SAImg = styled.img`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background-color: #d4d4d4;
`;

const AStyledProfileIcon = styled(ProfileIcon)`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background-color: var(--gray-300);
`;

const STextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const STextboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;

  width: 268px;
  height: 22px;

  font-size: 16px;

  overflow: hidden;
`;

const SNameText = styled.p`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 40%;
`;

const SMessageText = styled.p`
  max-width: 50%;

  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;

  overflow: hidden;
`;

const STimeText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: var(--gray-500);
`;

export default NotificationPage;
