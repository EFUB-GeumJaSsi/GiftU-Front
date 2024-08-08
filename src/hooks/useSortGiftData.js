const useSortGiftData = (array) => {
  return array && array.sort((a, b) => a.price - b.price);
};

export default useSortGiftData;
