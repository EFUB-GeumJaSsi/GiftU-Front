import { api, apiAuth } from './api';

// GET 요청 예시
export const getExample = async () => {
  try {
    const response = await apiAuth.get(`/요청 주소`);
    return response;
  } catch (error) {
    throw error;
  }
};

// POST 요청 예시
export const postExample = async (title, content) => {
  try {
    const response = await apiAuth.post(
      `/요청 주소`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// PATCH 요청 예시
export const patchExample = async (title, content) => {
  try {
    const response = await apiAuth.patch(
      `/요청 주소`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// DELETE 요청 예시
export const deleteExample = async () => {
  try {
    const response = await apiAuth.delete(`/요청 주소`);
    return response;
  } catch (error) {
    throw error;
  }
};
