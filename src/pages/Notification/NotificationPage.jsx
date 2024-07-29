import styled from 'styled-components';
import { useState } from 'react';
import NotificationItem from '../../components/Notification/NotificationItem';
import TagSelectComponent from '../../components/common/TagSelectComponent';
import Modal from '../../components/common/ModalComponent';
import { ReactComponent as IcnInfo } from '../../assets/Friend/icn_info.svg';
import { ReactComponent as ProfileIcon } from '../../assets/common/profile.svg';

const NotificationPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [tag, setTag] = useState('전체');

  const tags = ['전체', '친구', '펀딩'];

  const notifications = [
    {
      image: 'default',
      name: '닉네임은여기까지입니다',
      message: '님과 친구가 되었습니다',
      time: '00분 전',
      type: '친구',
    },
    {
      image: 'default',
      name: '펀딩 이름',
      message: '펀딩이 종료되었습니다',
      time: '00시간 전',
      type: '펀딩',
    },
  ];

  const friendNotiClick = (image, name) => {
    setModalContent(
      <SModalContainer>
        {image === 'default' ? (
          <StyledProfileIcon />
        ) : (
          <SImg src={image} alt='Profile' />
        )}
        <span>{name}</span>
        <span style={{ color: 'var(--black)' }}>친구를 추가하시겠어요?</span>
        <span style={{ fontSize: '12px' }}>
          <IcnInfo /> 추가된 친구는 [내 친구]에서 확인할 수 있어요
        </span>
      </SModalContainer>,
    );
    setModalShow(true);
  };

  const fundingNotiClick = () => {
    window.location.href = '/'; // 나중에 이동할 주소 넣어야함
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (tag === '전체') return true;
    if (tag === '친구' && notification.type === '친구') return true;
    if (tag === '펀딩' && notification.type === '펀딩') return true;
    return false;
  });

  return (
    <SLayout>
      <SHeader>알림</SHeader>
      <SItemContainer>
        <TagSelectComponent
          tags={tags}
          selectedTag={tag}
          onTagChange={setTag}
        />
        <SBtnWrapper>
          {filteredNotifications.map((notification, index) => (
            <NotificationItem
              key={index}
              image={notification.image}
              name={notification.name}
              message={notification.message}
              time={notification.time}
              onClick={() =>
                notification.type === '친구'
                  ? friendNotiClick(notification.image, notification.name)
                  : fundingNotiClick()
              }
            />
          ))}
        </SBtnWrapper>
      </SItemContainer>
      {modalShow && (
        <Modal actionText='추가하기' setModalShow={setModalShow}>
          {modalContent}
        </Modal>
      )}
    </SLayout>
  );
};

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
  gap: 24px;

  padding-top: 43px;
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

const SBtnWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export default NotificationPage;
