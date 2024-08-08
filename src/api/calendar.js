import { apiAuth } from './api';

// 마감일별 펀딩 목록 조회
export const getCalendarFunding = async (fundingEndDate) => {
  try {
    const response = await apiAuth.get(`/fundings/calendar/${fundingEndDate}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 2주 날짜별 펀딩 개설 여부 조회
export const getExistanceOfFunding = async (lookUpStartDate, lookUpEndDate) => {
  try {
    const response = await apiAuth.get(
      `/fundings/calendar/dates/${lookUpStartDate}/${lookUpEndDate}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};