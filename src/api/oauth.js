import { api, apiAuth } from './api';

// 카카오 로그인/회원가입
// 1. 카카오 서버에 인가코드 요청
const CLIENT_ID = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
const FRONT_DOMAIN = `https://gift-u.netlify.app`;
const REDIRECT_URI = `${FRONT_DOMAIN}/api/oauth/kakao`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
// 2. 기프트유 서버에 토큰 요청
export const getAccessTokenKakao = async (code) => {
  try {
    const response = await api.get(`/api/oauth/kakao`, {
      params: { code: code },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// 액세스 토큰 재발급
export const postAccessTokenReissue = async () => {
  try {
    const response = await apiAuth.post(`/api/oauth/reissue`);
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('token-date', new Date());
    return response;
  } catch (error) {
    console.error(error);
    localStorage.removeItem('token');
    localStorage.removeItem('token-date');
    navigate('/login');
    throw error;
  }
};
