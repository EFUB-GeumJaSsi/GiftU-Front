import styled from 'styled-components';
import { useState } from 'react';
import { startOfWeek, addDays } from 'date-fns';
import { ReactComponent as TagIcon } from '../../assets/Home/tag_today.svg';
import BottomSheetComponent from '../common/BottomSheetComponent';
import { arrayChop } from '../common/CarouselComponent';
import CarouselComponent from '../common/CarouselComponent';
import CalendarFundingItem from './CalendarFundingItem';

const fundings = [
  {
    fundingId: 4,
    launcherNickname: '이퍼비',
    fundingTitle: '이퍼비 생일선물 위시 리스트',
    fundingEndDate: '2024-07-31',
    status: 'IN_PROGRESS',
    fundingImageUrl: 'https://localhost:8080/image/abcd-5678-ijkl',
  },
  {
    fundingId: 6,
    launcherNickname: '박퍼비',
    fundingTitle: '박퍼비 생일선물 위시 리스트 박퍼비 생일선물 위시 리스트',
    fundingEndDate: '2024-07-31',
    status: 'IN_PROGRESS',
    fundingImageUrl: 'https://localhost:8080/image/abcd-5678-ijkl',
  },
  {
    fundingId: 6,
    launcherNickname: '박퍼비',
    fundingTitle: '박퍼비 생일선물 위시 리스트',
    fundingEndDate: '2024-07-26',
    status: 'IN_PROGRESS',
    fundingImageUrl: 'https://localhost:8080/image/abcd-5678-ijkl',
  },
];

const Calendar = () => {
  const [selectedFundingList, setSelectedFundingList] = useState([]);
  const [chopedDataList, setChopedDataList] = useState([]);
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
  const startDate = startOfWeek(date);

  for (let i = 0; i < 14; i++) {
    dates[i] = addDays(startDate, i + 1)
      .toISOString()
      .split('T')[0];
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

  const handleSelectFundings = (date) => {
    const newSelectedFundingList = fundings.filter(
      (it) => it.fundingEndDate === date,
    );

    setSelectedFundingList(newSelectedFundingList);
    setChopedDataList(arrayChop(newSelectedFundingList, 2));
  };

  return (
    <SLayout>
      <SMonthWrapper>
        {year}년 {month}월
      </SMonthWrapper>
      <SDayContainer>
        {days.map((it, idx) => (
          <SDayWrapper key={idx}>{it}</SDayWrapper>
        ))}
      </SDayContainer>
      <SDateContainer>
        {dates.map((it, idx) => {
          const isFundingEndDate = fundings.some(
            (item) => item.fundingEndDate === it,
          );
          return (
            <SDateWrapper
              funding={isFundingEndDate}
              key={idx + 'date'}
              id={idx}
              onClick={isFundingEndDate ? handleOnClick : undefined}
            >
              {it.split('-')[2]}
              {today === Number(it.split('-')[2]) && <Tag />}
            </SDateWrapper>
          );
        })}
      </SDateContainer>
      {bottomSheetShow && (
        <BottomSheetComponent setBottomSheetShow={setBottomSheetShow}>
          <SSheetLayout>
            <STitle>
              {selectedDate.month}월 {selectedDate.date}일 {selectedDate.day}
              요일
            </STitle>
            <CarouselComponent
              pageLength={chopedDataList.length}
              pageWidth={335}
            >
              {chopedDataList.map((it, idx) => (
                <SItemLayout>
                  <CalendarFundingItem data={it[0]} />
                  {idx === chopedDataList.length - 1 &&
                  selectedFundingList.length % 2 !== 0 ? (
                    <div style={{ visibility: 'hidden' }}>
                      <CalendarFundingItem />
                    </div>
                  ) : (
                    <CalendarFundingItem data={it[1]} />
                  )}
                </SItemLayout>
              ))}
            </CarouselComponent>
          </SSheetLayout>
        </BottomSheetComponent>
      )}
    </SLayout>
  );
};

export default Calendar;

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

const SMonthWrapper = styled.span`
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

const SDayContainer = styled.div`
  display: flex;
  gap: 29px;
`;

const SDayWrapper = styled.span`
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

const SDateWrapper = styled.span`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  width: 36px;
  height: 36px;

  border-radius: 50%;
  background-color: ${(props) =>
    props.funding ? 'var(--orange-sec)' : 'var(--gray-200)'};

  text-align: center;
  color: ${(props) =>
    props.funding ? 'var(--orange-pri)' : 'var(--gray-400)'};
  font-size: 16px;
  font-weight: 500;

  cursor: ${(props) => (props.funding ? 'pointer' : 'default')};
`;

const Tag = styled(TagIcon)`
  position: absolute;
  bottom: 27px;
  z-index: 999;
`;

const SSheetLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  padding: 32px 21px 18px 19px;
`;

const STitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  line-height: 140%;
`;

const SItemLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
