import axios from 'axios';
import { postAccessTokenReissue } from '../api/oauth';

// 인증이 필요 없는 요청
const api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

// 인증이 필요한 요청
const token = JSON.parse(localStorage.getItem('token'));
const auth = token ? `${token.grantType} ${token.accessToken}` : null;
const apiAuth = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: { Authorization: auth },
  withCredentials: true,
});

apiAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    if (!response) return Promise.reject(error);
    const { status, data } = response;

    // 무한 반복 방지
    if (config.sent) return Promise.reject(error);
    config.sent = true;

    switch (status) {
      case 401:
        switch (data.error) {
          case 'Token Expired':
            try {
              await postAccessTokenReissue();
              const token = JSON.parse(localStorage.getItem('token'));
              apiAuth.defaults.headers.Authorization = `${token.grantType} ${token.accessToken}`;
              // 실패한 요청 재시도
              config.headers.Authorization = `${token.grantType} ${token.accessToken}`;
              return apiAuth(config);
            } catch (error) {
              localStorage.removeItem('token');
              window.location.href = '/login';
              return Promise.reject(error);
            }
          case 'Invalid Token':
            localStorage.removeItem('token');
            window.location.href = '/login';
            return Promise.reject(error);
        }
    }

    return Promise.reject(error);
  },
);

export { api, apiAuth };
