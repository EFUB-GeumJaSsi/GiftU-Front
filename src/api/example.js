import { api, apiAuth } from './api';

// GET 요청 예시
export const getExample = async () => {
  try {
    const response = await api.get(`/요청 주소`);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.resolve(error);
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
    return Promise.resolve(response);
  } catch (error) {
    return Promise.resolve(error);
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
    return Promise.resolve(response);
  } catch (error) {
    return Promise.resolve(error);
  }
};

// DELETE 요청 예시
export const deleteExample = async () => {
  try {
    const response = await apiAuth.delete(`/요청 주소`);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.resolve(error);
  }
};
