import axios from 'axios';

// 인증이 필요 없는 요청 (단순 GET)
const api = (options) => {
  const instance = axios.create({
    baseURL: `${process.env.SERVER_URL}`,
    ...options,
  });
  return instance;
};

// 인증이 필요한 요청
const apiAuth = (options) => {
  const accessToken = localStorage.getItem('giftu-token');
  const instance = axios.create({
    baseURL: `${process.env.SERVER_URL}`,
    headers: { Authorization: `Bearer ${accessToken}` },
    withCredentials: true,
    ...options,
  });
  return instance;
};

export { api, apiAuth };
