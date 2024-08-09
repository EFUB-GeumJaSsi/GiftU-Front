/*
Auth HOC 사용법

1. props
(1-1) Page - 이동하려는 페이지 컴포넌트
(1-2) user - 'all'(모든 사용자), 'login'(로그인 사용자만), 'logout'(비로그인 사용자만)
예시: <Auth Page={HomePage} user='login' />
*/

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAccessTokenReissue } from '../api/oauth';
import SpinnerComponent from '../components/common/SpinnerComponent';

const Auth = ({ Page, option }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkIsLogin = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      if (new Date().getTime() > token.expiresIn) {
        try {
          const response = await postAccessTokenReissue();
        } catch (error) {
          console.error(error);
          return;
        }
      }
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    checkIsLogin();
  }, []);

  useEffect(() => {
    if (isLogin != null) {
      switch (option) {
        case 'all':
          break;
        case 'login':
          if (!isLogin) {
            navigate('/login');
            return;
          }
          break;
        case 'logout':
          if (isLogin) {
            navigate(-1);
            return;
          }
          break;
        default:
          navigate(-1);
      }
      setIsLoading(false);
    }
  }, [isLogin]);

  if (isLoading) {
    return (
      <SLayout>
        <SpinnerComponent />
      </SLayout>
    );
  }

  return <Page />;
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

export default Auth;
