import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// <NotiItem
//  buttons={[
//  { text: '전체', link: '/', activeColor: 'jade' },
//  { text: '친구', link: '/first', activeColor: 'jade' },
//  { text: '펀딩', link: '/second', activeColor: 'jade' },
// ]}
// />
// 위의 코드는 예시입니다. text에 원하는 문구를 적고 ,link는 그대로 사용하고, activeColor에는 jade와 orange중에 선택해서 사용하면 됩니다.
const NotiItem = ({ buttons }) => {
  // activeColor: [배경 색, 글꼴 색]
  const btnActiveColor = {
    orange: ['var(--orange-pri)', 'var(--white)'],
    jade: ['var(--jade-pri)', 'var(--white)'],
    gray: ['var(--gray-100)', 'var(--gray-400)'],
  };

  return (
    <SLayout>
      {buttons.map((btn, index) => (
        <SBtn key={index}>
          <StyledNavLink
            to={btn.link}
            activeclassname='active'
            activeColor={btnActiveColor[btn.activeColor]}
          >
            {btn.text}
          </StyledNavLink>
        </SBtn>
      ))}
    </SLayout>
  );
};

export default NotiItem;

const SLayout = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const SBtn = styled.div`
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
  color: inherit;
  text-decoration: none;

  &.active {
    background-color: ${(props) => props.activeColor[0]};
    color: ${(props) => props.activeColor[1]};
    border-radius: 15px;
  }
`;
