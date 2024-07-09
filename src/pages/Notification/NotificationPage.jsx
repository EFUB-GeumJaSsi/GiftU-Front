import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import NotificationItem from './NotificationItem';
import NotiItem from ~
const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      name: '닉네임',
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
    <BodyContainer>
      <HeaderWord>알림</HeaderWord>
      <ContentContainer>
      <NotiItem tagFirstName='친구' tagFirstLink='/friend' tagSecondName='펀딩' tagSecondLink='/funding' />
        <EachContainer>
          {notifications.map((notification) => (
            <NotificationItem
              name={notification.name}
              message={notification.message}
              time={notification.time}
            ></NotificationItem>
          ))}
        </EachContainer>
      </ContentContainer>
    </BodyContainer>
  );
};

export default Notification;

const BodyContainer = styled.div`
  padding-top: 43px;
  display: flex;
  flex-flow: column nowrap;
  gap: 24px;
  width: 375px;
`;

const HeaderWord = styled.header`
  padding-left: 28px;
  font-size: 22px;
  color: var(--black);
  font-weight: 700;
`;

const EachContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 4px;
  padding-left: 20px;
`;


const ContentContainer = styled.main`
`;
