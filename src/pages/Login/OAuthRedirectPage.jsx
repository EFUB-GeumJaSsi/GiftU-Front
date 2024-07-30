import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getKakaoAccessToken } from '../../api/oauth';
import SpinnerComponent from '../../components/common/SpinnerComponent';

const OAuthRedirectPage = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  const readToken = async () => {
    try {
      const response = await getKakaoAccessToken(code);
      localStorage.setItem('giftu-token', response.data.accessToken);
      navigate('/my/edit');
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
  };

  useEffect(() => {
    readToken();
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
