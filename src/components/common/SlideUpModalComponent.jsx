// 컴포넌트 사용법
//
// 1. 열기/닫기 제어
// (1-1) 부모 컴포넌트에 추가: const [slideUpModalShow, setSlideUpModalShow] = useState(false);
// (1-2) 부모 컴포넌트에 추가: {slideUpModalShow && (<SlideUpModalComponent></SlideUpModalComponent>)}
//
// 2. props
// (2-1) backgroundAction - SBackgroundDiv 이벤트리스너 활성화 여부
// (2-2) setSlideUpModalShow - 1-1의 setSlideUpModalShow
// (2-3) parentOpen - (4-3) 또는 true
// 예시: <SlideUpModalComponent setSlideUpModalShow={setSlideUpModalShow} parentOpen={true}>
//
// 3. 내용
// (3-1) 부모 컴포넌트에서 <SlideUpModalComponent></SlideUpModalComponent> 안에 작성합니다.
// 예시: <SlideUpModalComponent>
//         <button>삭제하기</button>
//         <button>취소</button>
//       </SlideUpModalComponent>
//
// 4. children의 버튼으로 모달을 여닫을 경우
// (4-1) 부모 컴포넌트에 추가: const [slideUpModalOpen, setSlideUpModalOpen] = useState(false);
// (4-2) 부모 컴포넌트에 추가:
// const handleSlideUpModalClose = () => {
//   setSlideUpModalOpen(false); // 닫기 애니메이션 효과
//   setTimeout(() => setSlideUpModalShow(false), 300); // 애니메이션 후 언마운트
// };
// (4-3) props 지정: parentOpen={slideUpModalOpen}

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const SlideUpModalComponent = ({
  backgroundAction,
  setSlideUpModalShow,
  parentOpen,
  children,
}) => {
  const [slideUpModalOpen, setSlideUpModalOpen] = useState(false);

  const handleSlideUpModalClose = () => {
    if (backgroundAction) {
      setSlideUpModalOpen(false); // 닫기 애니메이션 효과
      setTimeout(() => setSlideUpModalShow(false), 300); // 애니메이션 후 언마운트
    }
  };

  useEffect(() => {
    // 열기 애니메이션 효과
    setSlideUpModalOpen(true);
    // 열기 시 스크롤 방지
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      width: 100%;
    `;
    return () => {
      // 닫기 시 이전 상태로 복원
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const SlideUpModalUI = (
    <SBackgroundDiv
      onClick={handleSlideUpModalClose}
      $open={slideUpModalOpen && parentOpen}
    >
      <SContainer
        onClick={(event) => {
          event.stopPropagation();
        }}
        $open={slideUpModalOpen && parentOpen}
      >
        {children}
      </SContainer>
    </SBackgroundDiv>
  );

  return createPortal(SlideUpModalUI, document.getElementById('modal'));
};

const SBackgroundDiv = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  width: 100svw;
  height: 100svh;

  background-color: ${({ $open }) =>
    $open ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)'};

  transition: background-color 0.3s ease;
`;
const SContainer = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: fixed;
  bottom: ${({ $open }) => ($open ? 0 : -320)}px;

  width: 375px;
  height: fit-content;

  transition: bottom 0.3s ease;
`;

export default SlideUpModalComponent;
