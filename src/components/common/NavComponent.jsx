import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as GreyHomeIcon } from '../../assets/common/NavigationBar/grey_icn_home.svg';
import { ReactComponent as GreyFriendIcon } from '../../assets/common/NavigationBar/grey_icn_friend.svg';
import { ReactComponent as GreyAlarmIcon } from '../../assets/common/NavigationBar/grey_icn_alarm.svg';
import { ReactComponent as GreyMypageIcon } from '../../assets/common/NavigationBar/grey_icn_mypage.svg';
import { ReactComponent as HomeIcon } from '../../assets/common/NavigationBar/icn_home.svg';
import { ReactComponent as FriendIcon } from '../../assets/common/NavigationBar/icn_friend.svg';
import { ReactComponent as PresentIcon } from '../../assets/common/NavigationBar/icn_present.svg';
import { ReactComponent as AlarmIcon } from '../../assets/common/NavigationBar/icn_alarm.svg';
import { ReactComponent as MypageIcon } from '../../assets/common/NavigationBar/icn_mypage.svg';

const NavComponent = () => {
  return (
    <SLayout>
      <SNavLink to='/'>
        {({ isActive }) => (
          <>
            {isActive ? <HomeIcon /> : <GreyHomeIcon />}
            <p className={isActive ? 'active' : ''}>홈</p>
          </>
        )}
      </SNavLink>
      <SNavLink to='/friends'>
        {({ isActive }) => (
          <>
            {isActive ? <FriendIcon /> : <GreyFriendIcon />}
            <p className={isActive ? 'active' : ''}>친구</p>
          </>
        )}
      </SNavLink>
      <SFundingNavLink to='/funding/open'>
        <SCirclecontainer>
          <SSmallcontainer>
            <PresentIcon />
          </SSmallcontainer>
        </SCirclecontainer>
        <p>펀딩 만들기</p>
      </SFundingNavLink>
      <SNavLink to='/notifications'>
        {({ isActive }) => (
          <>
            {isActive ? <AlarmIcon /> : <GreyAlarmIcon />}
            <p className={isActive ? 'active' : ''}>알림</p>
          </>
        )}
      </SNavLink>
      <SNavLink to='/my'>
        {({ isActive }) => (
          <>
            {isActive ? <MypageIcon /> : <GreyMypageIcon />}
            <p className={isActive ? 'active' : ''}>마이</p>
          </>
        )}
      </SNavLink>
    </SLayout>
  );
};
const SLayout = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;

  justify-content: center;
  align-items: center;
  z-index: 1000;

  width: 375px;
  height: 64px;
  background-color: white;
`;
const SNavLink = styled(NavLink)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  width: 67px;
  height: 64px;

  gap: 8px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;

  p {
    color: var(--gray-400);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  &.active p {
    color: var(--black);
  }
`;
const SFundingNavLink = styled(NavLink)`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 80px;
  height: 104px;

  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  p {
    color: var(--jade-pri);
    margin-top: 34px;
  }
`;
const SCirclecontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 44px;

  width: 80px;
  height: 80px;

  background-color: white;
  border-radius: 40px;
`;
const SSmallcontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 64px;
  height: 64px;

  background-color: var(--jade-pri);
  border-radius: 40px;
`;

export default NavComponent;
