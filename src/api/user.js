import { apiAuth } from './api';

// 유저 조회
export const getUserInfo = async () => {
  try {
    const response = await apiAuth.get(`/users`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 유저 정보 수정
export const patchUserInfo = async (userData) => {
  try {
    const response = await apiAuth.patch(`/users`, userData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원 탈퇴
export const deleteUser = async () => {
  try {
    const response = await apiAuth.delete(`/users`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    localStorage.clear();
    return response;
  } catch (error) {
    throw error;
  }
};
