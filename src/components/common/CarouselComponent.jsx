// array를 number개의 아이템씩 잘라 새로운 배열로 반환하는 함수
export const arrayChop = (array, number) => {
  const result = [];
  for (let i = 0; i < array.length; i += number) {
    result.push(array.slice(i, i + number));
  }
  return result;
};

// CarouselComponent
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
        onPointerDown={(event) => {
          setFirstX(event.clientX);
        }}
        onPointerUp={(event) => {
          setLastX(event.clientX);
        }}
        $currentPage={currentPage}
      >
        {children}
      </SContentContainer>
      <SPaginationFieldset>
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
`;
const SPaginationFieldset = styled.fieldset`
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
