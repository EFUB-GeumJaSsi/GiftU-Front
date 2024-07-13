// 바텀시트 컴포넌트 사용법
//
// 1. 바텀시트 열기/닫기 제어
// (1-1) 부모 컴포넌트에 추가: const [bottomsheetShow, setBottomsheetShow] = useState(false);
// (1-2) 부모 컴포넌트에 추가: {bottomsheetShow && (<BottomsheetComponent></BottomsheetComponent>)}
//
// 2. 바텀시트 props
// (2-1) closeButton - 'bar' 또는 'cross' (기본 'bar')
// (2-2) setBottomsheetShow - 1-1의 setBottomsheetShow
// 예시: <BottomsheetComponent closeButton='cross' setBottomsheetShow={setBottomsheetShow}>
//
// 3. 바텀시트 내용
// (3-1) 부모 컴포넌트에서 <BottomsheetComponent></BottomsheetComponent> 안에 작성합니다.
// 예시: <BottomsheetComponent>
//         <h1>친구 추가</h1>
//         <input type='email' name='user-email' placeholder='이메일 입력' />
//       </BottomsheetComponent>

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CrossIcon } from '../../assets/common/Bottomsheet/cross.svg';

const BottomsheetComponent = ({
  closeButton,
  setBottomsheetShow,
  children,
}) => {
  const [open, setOpen] = useState(false);

  const handleBottomsheetClose = () => {
    setOpen(false); // 바텀시트 닫기 애니메이션 효과
    setTimeout(() => setBottomsheetShow(false), 300); // 애니메이션 후 언마운트
  };

  useEffect(() => {
    // 바텀시트 열기 애니메이션 효과
    setOpen(true);
    // 바텀시트 열기 시 스크롤 방지
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      width: 100%;
    `;
    return () => {
      // 바텀시트 닫기 시 이전 상태로 복원
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const BottomsheetUI = (
    <SBackgroundDiv onClick={handleBottomsheetClose} $open={open}>
      <SSection
        onClick={(event) => {
          event.stopPropagation();
        }}
        $open={open}
        $cross={closeButton === 'cross'}
      >
        {closeButton === 'cross' ? (
          <SCrossButton onClick={handleBottomsheetClose}>
            <CrossIcon />
          </SCrossButton>
        ) : (
          <SBarButton onClick={handleBottomsheetClose} />
        )}
        <article>{children}</article>
      </SSection>
    </SBackgroundDiv>
  );

  return createPortal(BottomsheetUI, document.getElementById('modal'));
};

const SBackgroundDiv = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  width: 100vw;
  height: 100vh;

  background-color: ${({ $open }) =>
    $open ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)'};

  transition: background-color 0.3s ease;
`;
const SSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  position: fixed;
  bottom: ${({ $open }) => ($open ? 0 : -320)}px;

  width: 375px;
  height: 320px;
  padding-top: ${({ $cross }) => ($cross ? '26px' : '16px')};
  gap: ${({ $cross }) => ($cross ? '0' : '32')}px;

  border-radius: 20px 20px 0px 0px;
  background-color: var(--white);

  transition: bottom 0.3s ease;

  box-sizing: border-box;
`;
const SCrossButton = styled.button`
  position: absolute;
  right: 24px;
`;
const SBarButton = styled.button`
  width: 46px;
  height: 6px;
  margin: 0 auto;

  background-color: var(--gray-300);
  border-radius: 12px;
`;

export default BottomsheetComponent;
