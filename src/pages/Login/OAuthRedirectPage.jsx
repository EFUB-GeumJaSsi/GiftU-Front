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
      localStorage.setItem('giftu-token', response.data.accessToken);
      navigate('/my/edit');
    } catch (error) {
      console.error(error);
      navigate('/login');
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
