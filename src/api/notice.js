import { apiAuth } from './api';

// 모든 알림 조회
export const getAllNotice = async () => {
  try {
    const response = await apiAuth.get(`/notice`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 친구 알림 조회
export const getFriendNotice = async () => {
  try {
    const response = await apiAuth.get(`/notice/friend`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 펀딩 알림 조회
export const getFundingNotice = async () => {
  try {
    const response = await apiAuth.get(`/notice/funding`);
    return response;
  } catch (error) {
    throw error;
  }
};
