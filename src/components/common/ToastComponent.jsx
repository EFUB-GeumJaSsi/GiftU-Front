// 토스트 컴포넌트 사용법
//
// 1. 토스트 표시/비표시 제어
// (1-1) 부모 컴포넌트에 추가: const [toastShow, setToastShow] = useState(false);
// (1-2) 부모 컴포넌트에 추가: {toastShow && <ToastComponent></ToastComponent>}
//
// 2. 토스트 props
// (2-1) setToastShow - 1-1의 setToastShow
//
// 3. 토스트 내용
// (3-1) 부모 컴포넌트에서 <ToastComponent></ToastComponent> 안에 작성합니다.
// 예시: <ToastComponent>삭제가 완료되었어요</ToastComponent>

import styled from 'styled-components';
import { B2 } from '../../styles/font';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ToastComponent = ({ setToastShow, children }) => {
  const [toastOpen, setToastOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => setToastOpen(false), 2000);
    setTimeout(() => setToastShow(false), 2500);
  }, []);

  return createPortal(
    <SLayout $open={toastOpen}>{children}</SLayout>,
    document.getElementById('modal'),
  );
};

const SLayout = styled.div`
  display: flex;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;

  min-width: 260px;
  margin: auto;
  padding: 4px 15px;

  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.7);

  ${B2}
  color: var(--white);

  transition: opacity 2.5s ease;
  transform: translate(-50%, -50%);

  box-sizing: border-box;
  // 드래그 및 선택 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

export default ToastComponent;
