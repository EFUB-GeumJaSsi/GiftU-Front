/*
Auth HOC 사용법

1. props
(1-1) Page - 이동하려는 페이지 컴포넌트
(1-2) user - 'all'(모든 사용자), 'login'(로그인 사용자만), 'logout'(비로그인 사용자만)
예시: <Auth Page={HomePage} user='login' />
*/

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAccessTokenReissue } from '../api/oauth';

const Auth = ({ Page, option }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(null);

  const checkIsLogin = async () => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      const accessTokenDate = localStorage.getItem('token-date');
      const now = new Date();
      if (now - accessTokenDate > 3480000) {
        // 엑세스 토큰 발급 시각으로부터 58분이 지났는가?
        const response = await postAccessTokenReissue();
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
    switch (option) {
      case 'all':
        break;
      case 'login':
        if (isLogin) console.log();
        else navigate('/login');
        break;
      case 'logout':
        if (isLogin) navigate(-1);
        else console.log();
        break;
      default:
        navigate(-1);
    }
  }, [isLogin]);

  return <Page />;
};

export default Auth;
