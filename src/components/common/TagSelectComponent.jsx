import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

//const handleCategoryChange = (category) => {
//  setSelectedCategory(category);
//};
// <TagSelectComponent
//  buttons={[
//  { text: '전체', color: 'jade' },
//  { text: '친구', color: 'jade' },
//  { text: '펀딩', color: 'jade' },
//  ]}
// onClick={handleCategoryChange}
// />
// text에 원하는 문구를 적고, color는 jade와 orange 중에 선택하면 됩니다.

const TagSelectComponent = ({ buttons, onClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const click = (index, text) => {
    setActiveIndex(index);
    onClick(text);
  };
  // color: [배경 색, 글꼴 색]
  const btnColor = {
    orange: ['var(--orange-pri)'],
    jade: ['var(--jade-pri)'],
    gray: ['var(--gray-100)'],
  };

  return (
    <SLayout>
      {buttons.map((btn, index) => (
        <SBtn
          key={index}
          isActive={index === activeIndex}
          color={btnColor[btn.color]}
          onClick={() => click(index, btn.text)}
        >
          {btn.text}
        </SBtn>
      ))}
    </SLayout>
  );
};

export default TagSelectComponent;

const SLayout = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;
const SBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 57px;
  height: 29px;

  border-radius: 15px;
  background-color: ${(props) =>
    props.isActive ? props.color[0] : 'var(--gray-300)'};
  color:var(--white)};

  cursor: pointer;
  line-height: 29px;
  user-select: none;

`;
