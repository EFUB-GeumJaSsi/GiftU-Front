import { apiAuth } from './api';

// 검색
export const getSearch = async () => {
  try {
    const response = await apiAuth.get(`/search?word=검색할 단어`, {
      params: { word: '검색할 단어' },
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
