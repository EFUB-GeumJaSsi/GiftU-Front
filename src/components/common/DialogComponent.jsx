// 컴포넌트 사용법
//
// 1. 열기/닫기 제어
// (1-1) 부모 컴포넌트에 추가: const [dialogShow, setDialogShow] = useState(false);
// (1-2) 부모 컴포넌트에 추가: {dialogShow && (<DialogComponent></DialogComponent>)}
//
// 2. props
// (2-1) actionText - 오른쪽 버튼의 텍스트
// (2-2) onClickAction - 오른쪽 버튼을 click할 경우 실행하는 function
// (2-3) cancelText - 왼쪽 버튼의 텍스트 (미지정 시 '돌아가기')
// (2-4) onClickCancel - 왼쪽 버튼을 click할 경우 실행하는 function (미지정 시 모달만 닫음)
// (2-5) setDialogShow - 1-1의 setDialogShow
// 예시: <DialogComponent actionText='취소하기' onClickAction={api function} setDialogShow={setDialogShow}>
//
// 3. 내용
// (3-1) 부모 컴포넌트에서 <DialogComponent></DialogComponent> 안에 작성합니다.
// 예시: <DialogComponent>
//         <span>펀딩 개설을 취소하시겠어요?</span>
//         <small>펀딩에 참여한 친구들에게 알림이 전송돼요</small>
//       </DialogComponent>

import styled from 'styled-components';
import { B1 } from '../../styles/font';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const DialogComponent = ({
  actionText,
  onClickAction,
  cancelText = '돌아가기',
  onClickCancel,
  setDialogShow,
  children,
}) => {
  useEffect(() => {
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

  const DialogUI = (
    <SBackgroundDiv>
      <SSection>
        <SContentContainer>{children}</SContentContainer>
        <SButtonContainer>
          <SCancelButton
            onClick={() => {
              setDialogShow(false);
              if (onClickCancel) onClickCancel();
            }}
          >
            {cancelText}
          </SCancelButton>
          <SActionButton
            onClick={() => {
              setDialogShow(false);
              onClickAction();
            }}
          >
            {actionText}
          </SActionButton>
        </SButtonContainer>
      </SSection>
    </SBackgroundDiv>
  );

  return createPortal(DialogUI, document.getElementById('modal'));
};

const SBackgroundDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  width: 100svw;
  height: 100svh;

  background-color: #00000066;
`;
const SSection = styled.section`
  width: 320px;

  border-radius: 20px;
  background-color: var(--white);
`;
const SContentContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;
const SButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  height: 56px;

  border-top: 1px solid var(--gray-100);
`;
const SButton = styled.button`
  ${B1}
`;
const SCancelButton = styled(SButton)`
  border-right: 1px solid var(--gray-100);

  color: var(--black);
`;
const SActionButton = styled(SButton)`
  color: var(--red);
`;

export default DialogComponent;
