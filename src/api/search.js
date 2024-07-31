import { apiAuth } from './api';

// 검색                   변수 입력받기
export const getSearch = async () => {
  try {
    const response = await apiAuth.get(
      `/search?word=검색할 단어`, // param을 요청 주소에 적으면 안됨
      {
        params: { word: '검색할 단어' }, // 변수 전달하기
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};
