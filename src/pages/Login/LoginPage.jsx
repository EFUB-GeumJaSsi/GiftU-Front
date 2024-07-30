import styled from 'styled-components';
import { KAKAO_AUTH_URL } from '../../api/oauth';
import { ReactComponent as GiftuLogo } from '../../assets/Login/giftu_logo.svg';
import kakao_logo from '../../assets/Login/kakao_logo.svg';

const LoginPage = () => {
  return (
    <SLayout>
      <SGiftuLogo />
      <SKakaoLogin href={KAKAO_AUTH_URL}>카카오 로그인</SKakaoLogin>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  gap: 22%;
`;
const SGiftuLogo = styled(GiftuLogo)`
  width: 200px;
`;
const SKakaoLogin = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 280px;
  height: 48px;

  border-radius: 6px;
  background-color: #fee500;
  background-image: url(${kakao_logo});
  background-repeat: no-repeat;
  background-position: 14px center;

  color: #181600;
  font-size: 15px;
  font-weight: 600;
`;

export default LoginPage;
