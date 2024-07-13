import styled from 'styled-components';
import React, { useState } from 'react';
import NotificationItem from '../../components/Notification/NotificationItem';
import NotiItem from '../../components/common/NotiItem';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      name: '닉네임은여기까지입니다',
      message: '님과 친구가 되었습니다',
      time: '00분 전',
    },
    {
      name: '펀딩 이름',
      message: '펀딩이 종료되었습니다',
      time: '00시간 전',
    },
  ]);
  return (
    <SLayout>
      <SHeader>알림</SHeader>
      <SItemContainer>
        <NotiItem
          buttons={[
            { text: '전체', link: '/', activeColor: 'jade' },
            { text: '친구', link: '/first', activeColor: 'jade' },
            { text: '펀딩', link: '/second', activeColor: 'jade' },
          ]}
        />
        <SBtnWrapper>
          {notifications.map((notification) => (
            <NotificationItem
              name={notification.name}
              message={notification.message}
              time={notification.time}
            ></NotificationItem>
          ))}
        </SBtnWrapper>
      </SItemContainer>
    </SLayout>
  );
};

export default NotificationPage;

const SLayout = styled.div`
  padding-top: 43px;
  display: flex;
  flex-flow: column nowrap;
  gap: 24px;
`;

const SHeader = styled.header`
  padding-left: 28px;
  font-size: 22px;
  color: var(--black);
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
