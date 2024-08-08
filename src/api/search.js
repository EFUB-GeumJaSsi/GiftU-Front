import { apiAuth } from './api';

// 검색
export const getSearch = async (input) => {
  try {
    const response = await apiAuth.get(`/search?`, {
      params: { word: input },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
