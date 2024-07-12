import styled from 'styled-components';
import { useEffect, useState } from 'react';

const CarouselComponent = ({ data, UI, direction }) => {
  const arraySlice = (array) => {
    const result = [];
    for (let i = 0; i < array.length; i += 2) {
      result.push(array.slice(i, i + 2));
    }
    return result;
  };

  const slicedDataList = arraySlice(data);
  const [currentPage, setCurrentPage] = useState(0);
  const [firstX, setFirstX] = useState(-1);
  const [lastX, setLastX] = useState(-1);

  useEffect(() => {
    if (firstX != -1 && lastX != -1) {
      if (firstX - lastX < 0) {
        if (currentPage != 0) setCurrentPage(currentPage - 1);
      } else if (firstX - lastX > 0) {
        if (currentPage != slicedDataList.length - 1)
          setCurrentPage(currentPage + 1);
      }
      setFirstX(-1);
      setLastX(-1);
    }
    console.log(currentPage);
  }, [firstX, lastX]);
  useEffect(() => {
    document
      .getElementById('carousel')
      .scrollTo({ left: 375 * currentPage, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <SLayout>
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
        {slicedDataList.map((item, index) => (
          <SPageContainer
            key={index}
            $direction={direction}
            $margin={direction === 'row' ? 21.5 : 20}
          >
            <UI>{item[0]}</UI>
            <UI
              style={
                data.length % 2 != 0 && index == slicedDataList.length - 1
                  ? { visibility: 'hidden' }
                  : {}
              }
            >
              {item[1]}
            </UI>
          </SPageContainer>
        ))}
      </SContentContainer>
      <SPaginationFieldset>
        {Array.from({ length: slicedDataList.length }, (v, i) => i).map(
          (pageNumber) => {
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
          },
        )}
      </SPaginationFieldset>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 16px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
const SContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;
const SPageContainer = styled.div`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};

  margin: 0 ${({ $margin }) => $margin}px;
  gap: 12px;
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
