import axios from 'axios';

// 인증이 필요 없는 요청
const api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

// 인증이 필요한 요청
const accessToken = localStorage.getItem('token');
const apiAuth = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: { Authorization: `Bearer ${accessToken}` },
  withCredentials: true,
});

export { api, apiAuth };
