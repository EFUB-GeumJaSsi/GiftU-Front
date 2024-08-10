import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessTokenKakao } from '../../api/oauth';
import SpinnerComponent from '../../components/common/SpinnerComponent';

const OAuthRedirectPage = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  const readAccessTokenKakao = async () => {
    try {
      const response = await getAccessTokenKakao(code);
      response.data.isNewUser
        ? navigate(
            '/my/edit',
            { state: { isNewUser: response.data.isNewUser } },
            { replace: true },
          ) // 최초 로그인(회원가입) 시, 프로필 편집 페이지로 이동
        : navigate('/', { replace: true }); // 재로그인 시, 홈 페이지로 이동
      location.reload(true);
      return;
    } catch (error) {
      console.error(error);
      navigate('/login', { replace: true });
    }
  };

  useEffect(() => {
    readAccessTokenKakao();
  }, []);

  return (
    <SLayout>
      <SpinnerComponent />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

export default OAuthRedirectPage;
