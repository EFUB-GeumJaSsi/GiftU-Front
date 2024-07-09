import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
const NotiItem = () => {
  return (
    <NavContainer>
      <HeadBtn>
        <StyledNavLink exact to='/' activeClassName='active'>
          전체
        </StyledNavLink>
      </HeadBtn>
      <HeadBtn>
        <StyledNavLink to='/friend' activeClassName='active'>
          친구
        </StyledNavLink>
      </HeadBtn>
      <HeadBtn>
        <StyledNavLink to='/funding' activeClassName='active'>
          펀딩
        </StyledNavLink>
      </HeadBtn>
    </NavContainer>
  );
};
export default NotiItem;

const HeadBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 187px;
  height: 29px;
  border-radius: 15px;
  background-color: var(--gray-300);
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
    background-color: var(--jade-pri);
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
