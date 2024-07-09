import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
const NotiItem = ({
  tagFirstName,
  tagFirstLink,
  tagSecondName,
  tagSecondLink,
}) => {
  return (
    <NavContainer>
      <HeadBtn>
        <StyledNavLink exact to='/' activeClassName='active'>
          전체
        </StyledNavLink>
      </HeadBtn>
      <HeadBtn>
        <StyledNavLink to={tagFirstLink} activeClassName='active'>
          {tagFirstName}
        </StyledNavLink>
      </HeadBtn>
      <HeadBtn>
        <StyledNavLink to={tagSecondLink} activeClassName='active'>
          {tagSecondName}
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
  width: 57px;
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
  gap: 8px;
`;
