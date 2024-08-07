import styled from 'styled-components';
import { useState, useEffect } from 'react';
import TagSelectComponent from '../../components/common/TagSelectComponent';
import Modal from '../../components/common/ModalComponent';
import { ReactComponent as IcnInfo } from '../../assets/Friend/icn_info.svg';
import { ReactComponent as ProfileIcon } from '../../assets/common/profile_default.svg';
import { useNavigate, useParams } from 'react-router-dom';
import NavComponent from '../../components/common/NavComponent';
import {
  getAllNotice,
  getFriendNotice,
  getFundingNotice,
} from '../../api/notice';
import { postFriendAccept, postFriendReject } from '../../api/friend';

//현재시간에서 알림받은 시간 빼서 보여주는 코드
const getTime = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);

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
const getDaysRemaining = (fundingEndDate) => {
  const now = new Date();
  const endDate = new Date(fundingEndDate);
  const diffInMilliseconds = endDate - now;
  const daysRemaining = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

  return daysRemaining;
};
const NotificationPage = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [tag, setTag] = useState('전체');
  const tags = ['전체', '친구', '펀딩'];
  const [friendTableId, setFriendTableId] = useState('');
  const [time, setTime] = useState();
  const navigate = useNavigate();
  //친구알림 모달창
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

  //펀딩알림 클릭시 해당 펀딩 페이지로 이동
  const fundingNotiClick = (fundingId) => {
    navigate(`/funding/${fundingId}`); // 나중에 이동할 주소 넣어야함
  };

  const filteredNotifications = notificationList.filter(() => {
    if (tag === '전체') return true;
    if (tag === '친구') return true;
    if (tag === '펀딩') return true;
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

  //전체알림 조회 API 연결
  const readNotificationAll = async () => {
    try {
      const response = await getAllNotice();
      setNotificationList(formatNotifications(response.data));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //친구알림 조회 API 연결
  const readNotificationFriend = async () => {
    try {
      const response = await getFriendNotice();
      const data = Array.isArray(response.data) ? response.data : [];
      if (data.length === 0) {
        setNotificationList([]);
      } else
        setNotificationList(
          response.data.map((item) => ({
            ...item,
            time: getTime(item.updatedAt),
            image: item.recieveUserImgUrl,
            name: item.recieveUserNickname,
            friendTableId: setFriendTableId(item.friendTableId),
          })),
        );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //펀딩알림 조회 API 연결
  const readNotificationFunding = async () => {
    try {
      const response = await getFundingNotice();
      setTime(response.data.now);
      const fundingNotifications = [
        ...response.data.fundingDueDate.map((item) => ({
          ...item,
          id: item.fundingId,
          tag: item.tag,
          image: item.fundingImageUrl,
          name: item.fundingTitle,
          time: getDaysRemaining(item.fundingEndDate),
        })),
        ...response.data.fundingAchieve.map((item) => ({
          ...item,
          id: item.fundingId,
          tag: item.tag,
          image: item.fundingImageUrl,
          name: item.fundingTitle,
          time: getTime(item.lastParticipationTime),
        })),
      ];
      setNotificationList(fundingNotifications);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const formatNotifications = (data) => {
    const friendNotices = data.friendNotice.map((notice) => ({
      ...notice,
      tag: notice.tag,
      image: notice.recieveUserImgUrl,
      name: notice.recieveUserNickname,
      time: getTime(notice.updatedAt),
    }));
    const fundingDueDateNotices = data.fundingDueDate.map((notice) => ({
      ...notice,
      id: notice.fundingId,
      tag: notice.tag,
      image: notice.fundingImageUrl,
      name: notice.fundingTitle,
      time: getDaysRemaining(item.fundingEndDate),
    }));
    const fundingAchieveNotices = data.fundingAchieve.map((notice) => ({
      ...notice,
      id: notice.fundingId,
      tag: notice.tag,
      image: notice.fundingImageUrl,
      name: notice.fundingTitle,
      percent: notice.percent,
      time: getTime(notice.lastParticipationTime),
    }));
    return [
      ...friendNotices,
      ...fundingDueDateNotices,
      ...fundingAchieveNotices,
    ];
  };
  //친구요청 수락 API 연결
  const createFriendAccept = async (friendTableId) => {
    try {
      const response = await postFriendAccept(friendTableId);
      location.reload(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //친구요청 거절 API 연결
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
            //tag가 친구일때
            notification.tag === 'friend ' ? (
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
              //tag가 펀딩일때
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
                        펀딩 종료{notification.percent}일 전
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
