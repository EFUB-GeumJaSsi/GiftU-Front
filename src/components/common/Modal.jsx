import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Modal = (props) => {
  useEffect(() => {
    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return createPortal(
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
          <Action onClick={props.handleModalAction}>{props.actionText}</Action>
        </Buttons>
      </Container>
    </Background>,
    document.getElementById('modal'),
  );
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

  padding: 24px 50px;
`;
const Buttons = styled.article`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  height: 56px;

  border-top: 1px solid var(--gray-100);

  button {
    font-family: Pretendard;
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
