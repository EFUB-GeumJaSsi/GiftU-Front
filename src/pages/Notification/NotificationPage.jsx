import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import NotificationItem from './NotificationItem';

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
  display: flex;
  flex-flow: column nowrap;
  gap: 24px;
  width: 375px;
`;

const HeaderWord = styled.div`
  width: 39px;
  height: 31px;
  padding-top: 43px;
  padding-left: 28px;
  font-size: 22px;
  font-color: black;
  font-weight: 700;
`;

const EachContainer = styled.div`
  padding-top: 4px;
  padding-left: 20px;
  gap: 4px;
`;

const HeadBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 187px;
  height: 29px;
  border-radius: 15px;
  background-color: #d6d9de;
  color: white;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  text-decoration: none;

  &.active {
    background-color: #67c5d2;
    border-radius: 15px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 187px;
  height: 29px;
  padding-top: 22px;
  padding-left: 94px;
  gap: 8px;
`;

const ContentContainer = styled.div`
  width: 335px;
  height: 756px;
  padding-top: 7px;
`;
