import styled from 'styled-components';
import { useState } from 'react';
import NotificationItem from '../../components/Notification/NotificationItem';
import TagSelectComponent from '../../components/common/TagSelectComponent';
import Modal from '../../components/common/ModalComponent';
import { ReactComponent as IcnInfo } from '../../assets/Friend/icn_info.svg';
const NotificationPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [notifications, setNotifications] = useState([
    {
      image: 'default',
      name: '닉네임은여기까지입니다',
      message: '님과 친구가 되었습니다',
      time: '00분 전',
      type: 'friend',
    },
    {
      image: 'default',
      name: '펀딩 이름',
      message: '펀딩이 종료되었습니다',
      time: '00시간 전',
      type: 'funding',
    },
  ]);

  const fundingNotiClick = () => {
    window.location.href = '/'; //나중에 이동할 주소 넣어야함
  };

  const friendNotiClick = (image, name) => {
    setModalContent(
      <SModalContainer>
        <SProfileWrapper src={image} />
        <span>{name}</span>
        <span style={{ color: 'var(--black)' }}>친구를 추가하시겠어요?</span>
        <span style={{ fontSize: '12px' }}>
          <IcnInfo /> 추가된 친구는 [내 친구]에서 확인할 수 있어요
        </span>
      </SModalContainer>,
    );
    setModalShow(true);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedCategory === '전체') return true;
    if (selectedCategory === '친구' && notification.type === 'friend')
      return true;
    if (selectedCategory === '펀딩' && notification.type === 'funding')
      return true;
    return false;
  });

  return (
    <SLayout>
      <SHeader>알림</SHeader>
      <SItemContainer>
        <TagSelectComponent
          buttons={[
            {
              text: '전체',
              link: '/',
              color: 'jade',
              onClick: () => handleCategoryChange('전체'),
            },
            {
              text: '친구',
              link: '/friend',
              color: 'jade',
              onClick: () => handleCategoryChange('친구'),
            },
            {
              text: '펀딩',
              link: '/funding',
              color: 'jade',
              onClick: () => handleCategoryChange('펀딩'),
            },
          ]}
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
                notification.type === 'friend'
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
const SProfileWrapper = styled.img`
  width: 56px;
  height: 56px;
  margin-bottom: 8px;

  border-radius: 50%;
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
