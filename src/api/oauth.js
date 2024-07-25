import { api, apiAuth } from './api';

// 카카오 로그인/회원가입
// 1. 카카오 서버에 인가코드 요청
const CLIENT_ID = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
const FRONT_DOMAIN = `http://localhost:3000`;
const REDIRECT_URI = `${FRONT_DOMAIN}/api/oauth/kakao`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
// 2. 기프트유 서버에 토큰 요청
export const getKakaoAccessToken = async (code) => {
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
