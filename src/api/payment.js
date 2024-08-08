import { apiAuth } from './api';

export const postPayment = async (uid, fundingId, amount) => {
  try {
    const response = await apiAuth.post(`/payment/${uid}`, {
      fundingId: parseInt(fundingId),
      amount: amount,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
