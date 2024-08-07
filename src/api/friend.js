import { api, apiAuth } from './api';

// 친구 요청
export const postFriendRequest = async (email) => {
  try {
    const response = await apiAuth.post(
      `/friends/request`,
      { email: email },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 친구 요청 수락
export const postFriendAccept = async (friendTableId) => {
  try {
    const response = await apiAuth.post(`/friends/accept`, null, {
      params: { friendTableId: friendTableId },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// 친구 요청 거절
export const postFriendReject = async (friendTableId) => {
  try {
    const response = await apiAuth.post(`/friends/reject`, null, {
      params: { friendTableId: friendTableId },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// 친구 조회
export const getFriendList = async () => {
  try {
    const response = await apiAuth.get(`/friends`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 최근 내 펀딩에 참여한 친구 조회
export const getFriendParticipatedList = async () => {
  try {
    const response = await apiAuth.get(`/friends/participated`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 친구 삭제
export const deleteFriendItem = async (friendId) => {
  try {
    const response = await apiAuth.delete(`/friends/${friendId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
