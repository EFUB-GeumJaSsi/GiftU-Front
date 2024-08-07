import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { startOfWeek, addDays } from 'date-fns';
import { getCalendarFunding, getExistanceOfFunding } from '../../api/calendar';
import BottomSheetComponent from '../common/BottomSheetComponent';
import CarouselComponent from '../common/CarouselComponent';
import CalendarFundingItem from './CalendarFundingItem';
import { ReactComponent as TagIcon } from '../../assets/Home/tag_today.svg';

const Calendar = () => {
  const [isFundingExist, setIsFundingExist] = useState({});
  const [selectedFundingList, setSelectedFundingList] = useState([]);
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    month: '',
    date: '',
    day: '',
  });
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const dates = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const today = date.getDate();
  const day = date.getDay();
  const startDate =
    day === 0 ? addDays(startOfWeek(date), -6) : addDays(startOfWeek(date), 1);

  // 일정 구간 펀딩 존재 여부 조회
  const readIsExistance = async () => {
    try {
      const res = await getExistanceOfFunding(
        date
          .toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replaceAll('.', '')
          .replaceAll(' ', '-'),
        dates[dates.length - 1],
      );
      setIsFundingExist(res.data.existenceOfFundingOnDate);
    } catch (e) {
      console.log(e);
    }
  };

  // 날짜별 펀딩 목록 조회
  const readFundingList = async (date) => {
    try {
      const res = await getCalendarFunding(date);
      return res.data.fundings;
    } catch (e) {
      console.log(e);
    }
  };

  for (let i = 0; i < 14; i++) {
    dates[i] = addDays(startDate, i + 1)
      .toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replaceAll('.', '')
      .replaceAll(' ', '-');
    console.log(dates);
  }

  const handleOnClick = (e) => {
    const { id } = e.target;
    const newSelectedDate = {
      month: dates[id].split('-')[1],
      date: dates[id].split('-')[2],
      day: days[id % 7],
    };

    setSelectedDate(newSelectedDate);
    handleSelectFundings(dates[id]);
    setBottomSheetShow(true);
  };

  const handleSelectFundings = async (date) => {
    const newSelectedFundingList = await readFundingList(date);

    const arr = newSelectedFundingList;
    if (arr.length % 2 != 0) arr.push({});
    setSelectedFundingList(arr);
  };

  // 초기 렌더링 정보 조회
  useEffect(() => {
    readIsExistance();
  }, []);

  return (
    <SLayout>
      <SMonthSpan>
        {year}년 {month}월
      </SMonthSpan>
      <SDayWrapper>
        {days.map((it, idx) => (
          <SDaySpan key={idx}>{it}</SDaySpan>
        ))}
      </SDayWrapper>
      <SDateContainer>
        {dates.map((it, idx) => {
          return (
            <SDateSpan
              $funding={isFundingExist[it]}
              key={idx + 'date'}
              id={idx}
              onClick={isFundingExist[it] ? handleOnClick : undefined}
            >
              {it.split('-')[2]}
              {today === Number(it.split('-')[2]) && <Tag />}
            </SDateSpan>
          );
        })}
      </SDateContainer>
      {bottomSheetShow && (
        <BottomSheetComponent setBottomSheetShow={setBottomSheetShow}>
          <SBottomSheetContainer>
            <SSpan>
              {selectedDate.month}월 {selectedDate.date}일 {selectedDate.day}
              요일
            </SSpan>
            <CarouselComponent
              pageLength={selectedFundingList.length / 2}
              pageWidth={335}
            >
              <SCarouselUl>
                {selectedFundingList.map((item, index) => (
                  <li key={index}>
                    {item.fundingId ? (
                      <CalendarFundingItem data={item} />
                    ) : (
                      <></>
                    )}
                  </li>
                ))}
              </SCarouselUl>
            </CarouselComponent>
          </SBottomSheetContainer>
        </BottomSheetComponent>
      )}
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  width: 335px;
  height: 163px;
  padding: 12px 0 20px 0;

  background-color: #f7f4ed;
  border-radius: 20px;
`;
const SMonthSpan = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 8px 12px;

  border-radius: 20px;
  background-color: var(--orange-pri);

  color: var(--white);
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
`;
const SDayWrapper = styled.div`
  display: flex;
  gap: 29px;
`;
const SDaySpan = styled.span`
  width: 15px;
  height: 14px;

  color: var(--gray-400);
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
`;
const SDateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-row-gap: 12px;
  grid-column-gap: 8px;
`;
const SDateSpan = styled.span`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  width: 36px;
  height: 36px;

  border-radius: 50%;
  background-color: ${(props) =>
    props.$funding ? 'var(--orange-sec)' : 'var(--gray-200)'};

  text-align: center;
  color: ${(props) =>
    props.$funding ? 'var(--orange-pri)' : 'var(--gray-400)'};
  font-size: 16px;
  font-weight: 500;

  cursor: ${(props) => (props.$funding ? 'pointer' : 'default')};
`;
const Tag = styled(TagIcon)`
  position: absolute;
  bottom: 27px;
  z-index: 999;
`;
const SBottomSheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  padding: 48px 20px 18px;
`;
const SSpan = styled.span`
  font-size: 20px;
  font-weight: 700;
  line-height: 140%;
`;
const SCarouselUl = styled.div`
  display: flex;
  flex-flow: column wrap;

  height: 172px;

  li:nth-child(odd) {
    margin-bottom: 12px;
  }

  li:nth-child(even) {
    margin-bottom: 0;
  }

  li:last-child {
    width: 335px;
    height: 80px;
  }
`;

export default Calendar;
