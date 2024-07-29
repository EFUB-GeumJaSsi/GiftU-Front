import { apiAuth } from './api';

// 모든 알림 조회
export const getAllNotice = async () => {
  try {
    const response = await apiAuth.get(`/notice`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
console.log(response);

// 친구 알림 조회
export const getFriendNotice = async () => {
  try {
    const response = await apiAuth.get(`/notice/friends`, {
      'Content-Type': 'application/json',
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// 펀딩 알림 조회
export const getFundingNotice = async () => {
  try {
    const response = await apiAuth.get(`/notice/funding`, {
      'Content-Type': 'application/json',
    });
    return response;
  } catch (error) {
    throw error;
  }
};
