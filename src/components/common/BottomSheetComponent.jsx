// 바텀시트 컴포넌트 사용법
//
// 1. 바텀시트 활성화/비활성화 제어
// (1-1) 부모 컴포넌트에 추가: const [bottomSheetShow, setBottomSheetShow] = useState(false);
// (1-2) 부모 컴포넌트에 추가: {bottomSheetShow && (<BottomSheetComponent></BottomSheetComponent>)}
//
// 2. 바텀시트 props
// (2-1) setBottomSheetShow - 1-1의 setBottomSheetShow
// 예시: <BottomSheetComponent setBottomSheetShow={setBottomSheetShow}>
//
// 3. 바텀시트 내용
// (3-1) 부모 컴포넌트에서 <BottomSheetComponent></BottomSheetComponent> 안에 작성합니다.
// 예시: <BottomSheetComponent>
//         <h1>친구 추가</h1>
//         <input type='email' name='user-email' placeholder='이메일 입력' />
//       </BottomSheetComponent>

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const BottomSheetComponent = ({ setBottomSheetShow, children }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // 바텀시트 활성화 애니메이션 효과
    setActive(true);
    // 바텀시트 활성화 시 스크롤 방지
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      width: 100%;
    `;
    return () => {
      // 바텀시트 비활성화 시 이전 상태로 복원
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const BottomSheetUI = (
    <SBackgroundDiv>
      <SSection $active={active}>
        <SButton
          onClick={() => {
            setActive(false); // 바텀시트 비활성화 애니메이션 효과
            setTimeout(() => setBottomSheetShow(false), 300); // 애니메이션 후 언마운트
          }}
        />
        <SContentContainer>{children}</SContentContainer>
      </SSection>
    </SBackgroundDiv>
  );

  return createPortal(BottomSheetUI, document.getElementById('modal'));
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

  background-color: #00000066;
`;
const SSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: fixed;
  bottom: ${({ $active }) => ($active ? 0 : -320)}px;

  width: 375px;
  height: 320px;
  padding: 16px 20px;
  gap: 32px;

  border-radius: 20px 20px 0px 0px;
  background-color: var(--white);

  transition: bottom 0.3s ease;

  box-sizing: border-box;
`;
const SButton = styled.button`
  width: 46px;
  height: 6px;

  background-color: var(--gray-300);
  border-radius: 12px;
`;
const SContentContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export default BottomSheetComponent;
