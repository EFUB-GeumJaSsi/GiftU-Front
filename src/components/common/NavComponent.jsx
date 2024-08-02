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
            <SSpan $isActive={isActive}>홈</SSpan>
          </>
        )}
      </SNavLink>
      <SNavLink to='/friends'>
        {({ isActive }) => (
          <>
            {isActive ? <FriendIcon /> : <GreyFriendIcon />}
            <SSpan $isActive={isActive}>친구</SSpan>
          </>
        )}
      </SNavLink>
      <SFundingOpenNavLink to='/funding/open'>
        <SCircleWrapper>
          <PresentIcon />
        </SCircleWrapper>
        펀딩 만들기
      </SFundingOpenNavLink>
      <SNavLink to='/notifications'>
        {({ isActive }) => (
          <>
            {isActive ? <AlarmIcon /> : <GreyAlarmIcon />}
            <SSpan $isActive={isActive}>알림</SSpan>
          </>
        )}
      </SNavLink>
      <SNavLink to='/my'>
        {({ isActive }) => (
          <>
            {isActive ? <MypageIcon /> : <GreyMypageIcon />}
            <SSpan $isActive={isActive}>마이</SSpan>
          </>
        )}
      </SNavLink>
    </SLayout>
  );
};
const SLayout = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 50%;

  width: 375px;
  height: 64px;

  background-color: var(--white);

  transform: translate(-50%, 0);
`;
const SNavLink = styled(NavLink)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  width: 67px;
  height: 64px;
  padding: 9px 0;
  gap: 8px;

  box-sizing: border-box;

  svg {
    width: 24px;
    height: 24px;
  }
`;
const SSpan = styled.span`
  color: ${({ $isActive }) => ($isActive ? 'var(--black)' : 'var(--gray-400)')};
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
`;
const SFundingOpenNavLink = styled(SNavLink)`
  justify-content: end;
  position: relative;

  width: 80px;

  color: var(--gray-400);
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
`;
const SCircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 24px;

  width: 64px;
  height: 64px;

  border-radius: 50%;
  border: 8px solid var(--white);
  background-color: var(--jade-pri);
`;

export default NavComponent;
