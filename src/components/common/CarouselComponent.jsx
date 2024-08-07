/*
캐러셀 컴포넌트 사용법

1. 캐러셀 props
(1-1) pageLength - 캐러셀 총 페이지 개수
(1-2) pageWidth - 캐러셀 한 페이지의 너비
예시: <CarouselComponent pageLength={carouselFriendList.length / 2} pageWidth={335}>

2. 캐러셀 내용
(2-1) 부모 컴포넌트에서 <CarouselComponent></CarouselComponent> 안에 map 함수를 이용하여 데이터를 나열합니다.
      데이터가 홀수개일 경우를 대비하여 코드를 작성합니다.
예시: FriendPage.jsx을 참고하세요.
*/

import styled from 'styled-components';
import { useEffect, useState } from 'react';

const CarouselComponent = ({ pageLength, pageWidth, children }) => {
  const [firstX, setFirstX] = useState(-1);
  const [lastX, setLastX] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);

  // 스와이프 액션 감지
  useEffect(() => {
    if (firstX != -1 && lastX != -1) {
      if (firstX - lastX < 0) {
        if (currentPage != 0) setCurrentPage(currentPage - 1);
      } else if (firstX - lastX > 0) {
        if (currentPage != pageLength - 1) setCurrentPage(currentPage + 1);
      }
      setFirstX(-1);
      setLastX(-1);
    }
  }, [firstX, lastX]);
  // 페이지 이동
  useEffect(() => {
    document.getElementById('carousel').scrollTo({
      left: pageWidth * currentPage,
      behavior: 'smooth',
    });
  }, [currentPage]);

  return (
    <SLayout $pageWidth={pageWidth}>
      <SContentContainer
        id='carousel'
        onPointerDown={(event) => setFirstX(event.clientX)}
        onPointerUp={(event) => setLastX(event.clientX)}
        onTouchStart={(event) => setFirstX(event.changedTouches[0].clientX)}
        onTouchEnd={(event) => setLastX(event.changedTouches[0].clientX)}
      >
        {children}
      </SContentContainer>
      <SPaginationFieldset $pageLength={pageLength}>
        {Array.from({ length: pageLength }, (v, i) => i).map((pageNumber) => {
          return (
            <SRadioInput
              key={pageNumber}
              type='radio'
              id={pageNumber}
              name='pagination'
              value={pageNumber}
              checked={currentPage === pageNumber && 'checked'}
              onChange={() => {
                setCurrentPage(pageNumber);
              }}
            />
          );
        })}
      </SPaginationFieldset>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  width: ${({ $pageWidth }) => $pageWidth}px;
  gap: 16px;

  // 드래그 및 선택 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
const SContentContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  flex-flow: row nowrap;

  // 스크롤바 비표시
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SPaginationFieldset = styled.fieldset`
  visibility: ${({ $pageLength }) =>
    $pageLength === 1 ? 'hidden' : 'visible'};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;

  gap: 4px;
`;
const SRadioInput = styled.input`
  appearance: none;

  width: 6px;
  height: 6px;

  border-radius: 50%;
  background-color: var(--gray-100);

  &:checked {
    background-color: var(--black);
  }
`;

export default CarouselComponent;
