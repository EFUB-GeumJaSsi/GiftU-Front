import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

// 모달 컴포넌트 사용법
//
// 1. 모달 활성화/비활성화 제어
// (1-1) 부모 컴포넌트에 추가: const [modalShow, setModalShow] = useState(false);
// (1-2) 부모 컴포넌트에 추가: {modalShow && (<Modal></Modal>)}
//
// 2. 모달 props
// (2-1) actionText - 오른쪽 버튼의 텍스트
// (2-2) onClickAction - 오른쪽 버튼을 click할 경우 실행하는 function
// (2-3) setModalShow - 1-1의 setModalShow
// 예시: <Modal actionText='취소하기' onClickAction={api function} setModalShow={setModalShow}>
//
// 3. 모달 Content
// (3-1) 부모 컴포넌트에서 <Modal></Modal> 안에 작성합니다.
// 예시: <Modal>
//         <span>펀딩 개설을 취소하시겠어요?</span>
//         <small>펀딩에 참여한 친구들에게 알림이 전송돼요</small>
//       </Modal>

const Modal = (props) => {
  useEffect(() => {
    // 모달 활성화 시 스크롤 방지
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      width: 100%;
    `;
    // 모달 비활성화 시 이전 상태로 복원
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const ModalComponent = (
    <Background>
      <Container>
        <Content>{props.children}</Content>
        <Buttons>
          <Cancel
            onClick={() => {
              props.setModalShow(false);
            }}
          >
            돌아가기
          </Cancel>
          <Action onClick={props.onClickAction}>{props.actionText}</Action>
        </Buttons>
      </Container>
    </Background>
  );

  return createPortal(ModalComponent, document.getElementById('modal'));
};

const Background = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  width: 100vw;
  height: 100vh;

  background-color: #00000066;

  align-items: center;
  justify-content: center;
`;
const Container = styled.section`
  width: 320px;

  border-radius: 20px;
  background-color: var(--white);
`;
const Content = styled.article`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  padding: 30px 50px;
`;
const Buttons = styled.article`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  height: 56px;

  border-top: 1px solid var(--gray-100);

  button {
    font-size: 16px;
    font-weight: 500;
  }
`;
const Cancel = styled.button`
  border-right: 1px solid var(--gray-100);

  color: var(--black);
`;
const Action = styled.button`
  color: var(--red);
`;

export default Modal;
