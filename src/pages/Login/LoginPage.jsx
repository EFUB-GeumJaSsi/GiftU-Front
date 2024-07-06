import React from 'react';
import styled from 'styled-components';
import giftu from '../../assets/Login/giftu_logo.svg';
import { ReactComponent as Kakao } from '../../assets/Login/kakao_logo.svg';

const LoginPage = () => {
  return (
    <Container>
      <Logo src={giftu} />
      <Button>
        <Kakao />
        카카오 로그인
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 22%;

  width: 375px;
  height: 100vh;
  margin: 0 auto;

  box-sizing: border-box;
`;
const Logo = styled.img`
  width: 200px;
  height: 135px;
`;
const Button = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  vertical-align: middle;
  gap: 66px;

  width: 280px;
  height: 48px;
  padding: 14px;

  border-radius: 6px;
  background-color: #fee500;

  color: #181600;
  font-size: 15px;
  font-weight: 400;
`;

export default LoginPage;
