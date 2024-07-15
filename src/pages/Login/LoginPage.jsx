import styled from 'styled-components';
import giftu from '../../assets/Login/giftu_logo.svg';
import { ReactComponent as Kakao } from '../../assets/Login/kakao_logo.svg';

const LoginPage = () => {
  return (
    <SLayout>
      <SImg src={giftu} />
      <SBtn>
        <Kakao />
        카카오 로그인
      </SBtn>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  height: 100vh;
  gap: 22%;

  box-sizing: border-box;
`;
const SImg = styled.img`
  width: 200px;
  height: 135px;
`;
const SBtn = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  vertical-align: middle;

  width: 280px;
  height: 48px;
  padding: 14px;
  gap: 66px;

  border-radius: 6px;
  background-color: #fee500;

  color: #181600;
  font-size: 15px;
  font-weight: 400;
`;

export default LoginPage;
