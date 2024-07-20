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

const NavComponent = () => {
  return (
    <NavBottom>
      <NavItem to='/' Icon={HomeIcon} GreyIcon={GreyHomeIcon} label='홈' />
      <NavItem
        to='/friends'
        Icon={FriendIcon}
        GreyIcon={GreyFriendIcon}
        label='친구'
      />
      <CircleContainer>
        <CircleBackground>
          <NavItem
            to='/create-funding'
            Icon={PresentIcon}
            GreyIcon={GreyPresentIcon}
            label='펀딩 만들기'
            id='funding'
          />
        </CircleBackground>
      </CircleContainer>
      <NavItem
        to='/notifications'
        Icon={AlarmIcon}
        GreyIcon={GreyAlarmIcon}
        label='알림'
      />
      <NavItem
        to='/mypage'
        Icon={MypageIcon}
        GreyIcon={GreyMypageIcon}
        label='마이'
      />
    </NavBottom>
  );
};
export default NavComponent;

export const NavBottom = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 64px;
  height: 64px;

  border-radius: 40px;
  background-color: ${({ $isActive }) =>
    $isActive ? 'var(--jade-pri)' : 'black'};
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
  gap: 8px;
  color: var(--gray-400);

  p {
    font-size: 12px;
    line-height: 120%;
    color: var(--gray-400);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const NavIcon = ({ Icon, GreyIcon, isActive }) => {
  return isActive ? <Icon /> : <GreyIcon />;
};

export const NavItem = ({ to, Icon, GreyIcon, label, id }) => (
  <ItemContainer
    to={to}
    className={({ isActive }) => (isActive ? 'active' : '')}
  >
    {({ isActive }) => (
      <>
        {id === 'funding' ? (
          <CircleBlack $isActive={isActive}>
            <NavIcon Icon={Icon} GreyIcon={GreyIcon} isActive={isActive} />
            <p
              style={{
                color: isActive ? 'var(--jade-pri)' : 'var(--gray-400)',
                position: 'absolute',
                top: '73px',
              }}
            >
              {label}
            </p>
          </CircleBlack>
        ) : (
          <>
            <NavIcon Icon={Icon} GreyIcon={GreyIcon} isActive={isActive} />
            <p style={{ color: isActive ? 'black' : 'var(--gray-400)' }}>
              {label}
            </p>
          </>
        )}
      </>
    )}
  </ItemContainer>
);