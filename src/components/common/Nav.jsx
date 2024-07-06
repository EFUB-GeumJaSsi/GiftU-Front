import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as GreyHomeIcon } from '../../assets/common/NavigationBar/grey_icn_home.svg';
import { ReactComponent as GreyFriendIcon } from '../../assets/common/NavigationBar/grey_icn_friend.svg';
import { ReactComponent as GreyPresentIcon } from '../../assets/common/NavigationBar/grey_icn_present.svg';
import { ReactComponent as GreyAlarmIcon } from '../../assets/common/NavigationBar/grey_icn_alarm.svg';
import { ReactComponent as GreyMypageIcon } from '../../assets/common/NavigationBar/grey_icn_mypage.svg';
import { ReactComponent as HomeIcon } from '../../assets/common/NavigationBar/icn_home.svg';
import { ReactComponent as FriendIcon } from '../../assets/common/NavigationBar/icn_friend.svg';
import { ReactComponent as PresentIcon } from '../../assets/common/NavigationBar/icn_present.svg';
import { ReactComponent as AlarmIcon } from '../../assets/common/NavigationBar/icn_alarm.svg';
import { ReactComponent as MypageIcon } from '../../assets/common/NavigationBar/icn_mypage.svg';

export const NavBottom = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  z-index: 1000;

  width: 100%;
  max-width: 375px;
  height: 64px;

  background-color: white;
`;

export const CircleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  bottom: -30px;

  width: 80px;
  height: 80px;
`;

export const CircleBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -40px;

  width: 80px;
  height: 80px;

  border-radius: 40px;
  background-color: white;
`;

export const CircleBlack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 64px;
  height: 64px;

  border-radius: 40px;
  background-color: black;
`;

export const ItemContainer = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 67px;
  height: 64px;

  text-decoration: none;
  color: var(--gray-400);

  p {
    font-size: 12px;
    line-height: 120%;
    margin-top: 6px;
    color: var(--gray-400);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  &.active p {
    color: black;
  }
`;

const NavIcon = ({ Icon, GreyIcon, isActive }) => {
  return isActive ? <Icon /> : <GreyIcon />;
};

function Nav() {
  return (
    <NavBottom>
      <ItemContainer
        to='/'
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        {({ isActive }) => (
          <>
            <NavIcon
              Icon={HomeIcon}
              GreyIcon={GreyHomeIcon}
              isActive={isActive}
            />
            <p>홈</p>
          </>
        )}
      </ItemContainer>
      <ItemContainer
        to='/friends'
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        {({ isActive }) => (
          <>
            <NavIcon
              Icon={FriendIcon}
              GreyIcon={GreyFriendIcon}
              isActive={isActive}
            />
            <p>친구</p>
          </>
        )}
      </ItemContainer>
      <CircleContainer>
        <CircleBackground>
          <CircleBlack>
            <ItemContainer
              to='/create-funding'
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {({ isActive }) => (
                <>
                  <NavIcon
                    Icon={PresentIcon}
                    GreyIcon={GreyPresentIcon}
                    isActive={isActive}
                  />
                  <p style={{ position: 'absolute', bottom: '-25px' }}>
                    펀딩 만들기
                  </p>
                </>
              )}
            </ItemContainer>
          </CircleBlack>
        </CircleBackground>
      </CircleContainer>
      <ItemContainer
        to='/notifications'
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        {({ isActive }) => (
          <>
            <NavIcon
              Icon={AlarmIcon}
              GreyIcon={GreyAlarmIcon}
              isActive={isActive}
            />
            <p>알림</p>
          </>
        )}
      </ItemContainer>
      <ItemContainer
        to='/mypage'
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        {({ isActive }) => (
          <>
            <NavIcon
              Icon={MypageIcon}
              GreyIcon={GreyMypageIcon}
              isActive={isActive}
            />
            <p>마이</p>
          </>
        )}
      </ItemContainer>
    </NavBottom>
  );
}

export default Nav;
