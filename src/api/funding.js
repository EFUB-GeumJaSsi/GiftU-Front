import { api, apiAuth } from './api';

// 펀딩 개설

// 펀딩 상세
export const getFundingInfo = async (fundingId) => {
  try {
    const response = await api.get(`/fundings/${fundingId}`);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.resolve(error);
  }
};

// 펀딩 참여 전 비밀번호

// 펀딩 참여

// 펀딩 참여 취소

// 펀딩 리스트 조회(내가 개설한)

// 펀딩 리스트 조회(내가 참여한)

// 펀딩 리스트 조회(친구가 개설한)

// 펀딩 삭제
