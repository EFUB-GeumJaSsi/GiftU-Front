import axios from 'axios';

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

export { api, apiAuth };
