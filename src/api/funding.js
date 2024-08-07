import { api, apiAuth } from './api';

// 펀딩 개설
export const postFunding = async (request, images) => {
  try {
    const formData = new FormData();
    formData.append(
      'fundingRequestDto',
      new Blob([JSON.stringify(request)], { type: 'application/json' }),
    );
    images.forEach((image) => {
      formData.append('giftImages', image);
    });
    const response = await apiAuth.post(`/fundings`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// 펀딩 상세
export const getFundingInfo = async (fundingId) => {
  try {
    const response = await api.get(`/fundings/${fundingId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 펀딩 참여 전 비밀번호
export const postPassword = async (fundingId, password) => {
  try {
    const response = await apiAuth.post(
      `/fundings/${fundingId}/allow`,
      { password: password },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 펀딩 참여
export const postFundingJoin = async (
  fundingId,
  contributionAmount,
  anonymity,
  message,
) => {
  try {
    const response = await apiAuth.post(
      `/fundings/${fundingId}`,
      {
        contributionAmount: contributionAmount,
        anonymity: anonymity,
        message: message,
      },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 펀딩 참여 취소
export const deleteParticipation = async (participationId) => {
  try {
    const response = await apiAuth.delete(
      `/fundings/participation/${participationId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 펀딩 리스트 조회(내가 개설한)
export const getOpenList = async (status) => {
  try {
    const response = await apiAuth.get(
      status ? `/fundings/list/${status}` : `/fundings/list`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 펀딩 리스트 조회(내가 참여한)
export const getJoinList = async (status) => {
  try {
    const response = await apiAuth.get(
      status ? `/fundings/participation/${status}` : `/fundings/participation`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 펀딩 리스트 조회(친구가 개설한)
export const getFriendsFundingList = async () => {
  try {
    const response = await apiAuth.get(`/fundings/friends`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 펀딩 삭제
export const deleteFunding = async (fundingId) => {
  try {
    const response = await apiAuth.delete(`/fundings/${fundingId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//축하메세지 조회
export const getCongratsMessage = async (fundingId) => {
  try {
    const response = await apiAuth.get(`/fundings/${fundingId}/participation`);
    return response;
  } catch (error) {
    throw error;
  }
};

//축하메세지 수정
export const patchCongratsMessage = async (
  participationId,
  anonymity,
  message,
) => {
  try {
    const response = await apiAuth.patch(
      `/fundings/participation/${participationId}`,
      { anonymity: anonymity, message: message },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return response;
  } catch (error) {
    throw error;
  }
};
