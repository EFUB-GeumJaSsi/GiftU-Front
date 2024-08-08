import { apiAuth } from './api';

// 선물 후기 생성
export const postReview = async (fundingId, reviewContent) => {
  try {
    const response = await apiAuth.post(
      `/fundings/${fundingId}/review`,
      { reviewContent: reviewContent },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 선물 후기 조회
export const getReview = async (fundingId) => {
  try {
    const response = await apiAuth.get(`/fundings/${fundingId}/review`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 선물 후기 수정
export const patchReview = async (fundingId, reviewContent) => {
  try {
    const response = await apiAuth.patch(
      `/fundings/${fundingId}/review`,
      { reviewContent: reviewContent },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 선물 후기 삭제
export const deleteReview = async (fundingId) => {
  try {
    const response = await apiAuth.delete(`/fundings/${fundingId}/review`);
    return response;
  } catch (error) {
    throw error;
  }
};
