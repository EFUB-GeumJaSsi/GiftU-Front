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
            <SP $isActive={isActive}>홈</SP>
          </>
        )}
      </SNavLink>
      <SNavLink to='/friends'>
        {({ isActive }) => (
          <>
            {isActive ? <FriendIcon /> : <GreyFriendIcon />}
            <SP $isActive={isActive}>친구</SP>
          </>
        )}
      </SNavLink>
      <SFundingNavLink to='/funding/open'>
        <SCircleWrapper>
          <PresentIcon />
        </SCircleWrapper>
        <SFundingOpenP>펀딩 만들기</SFundingOpenP>
      </SFundingNavLink>
      <SNavLink to='/notifications'>
        {({ isActive }) => (
          <>
            {isActive ? <AlarmIcon /> : <GreyAlarmIcon />}
            <SP $isActive={isActive}>알림</SP>
          </>
        )}
      </SNavLink>
      <SNavLink to='/my'>
        {({ isActive }) => (
          <>
            {isActive ? <MypageIcon /> : <GreyMypageIcon />}
            <SP $isActive={isActive}>마이</SP>
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
  background-color: var(--white);
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

  svg {
    width: 24px;
    height: 24px;
  }
`;
const SP = styled.p`
  color: ${({ $isActive }) => ($isActive ? 'var(--black)' : 'var(--gray-400)')};
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
`;
const SCircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 44px;

  width: 64px;
  height: 64px;

  background-color: var(--jade-pri);
  border-radius: 50%;
  border: 8px solid var(--white);
`;
const SFundingOpenP = styled.p`
  margin-top: 34px;
  color: var(--gray-400);
`;

export default NavComponent;
