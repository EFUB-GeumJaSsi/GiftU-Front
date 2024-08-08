const useFormatDate = (date, nullReplaceText) => {
  if (!date) {
    return nullReplaceText;
  } else {
    const dateObj = new Date(date);

    const month = dateObj.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = dateObj.getDate();

    return `${month}월 ${day}일`;
  }
};

export default useFormatDate;
