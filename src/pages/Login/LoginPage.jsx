import styled from 'styled-components';
import { ReactComponent as GiftuLogo } from '../../assets/Login/giftu_logo.svg';
import kakao_logo from '../../assets/Login/kakao_logo.svg';

const LoginPage = () => {
  return (
    <SLayout>
      <SGiftuLogo />
      <SBtn>카카오 로그인</SBtn>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  height: 100svh;
  gap: 22%;
`;
const SGiftuLogo = styled(GiftuLogo)`
  width: 200px;
`;
const SBtn = styled.button`
  width: 280px;
  height: 48px;
  padding: 14px;

  border-radius: 6px;
  background-color: #fee500;
  background-image: url(${kakao_logo});
  background-repeat: no-repeat;
  background-position: 14px center;

  color: #181600;
  font-size: 15px;
  font-weight: 400;
`;

export default LoginPage;
