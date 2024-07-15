import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import BackHeader from '../../components/common/BackHeader';
import Button from '../../components/common/Button';
import { ReactComponent as Camera } from '../../assets/common/camera.svg';
import { ReactComponent as Calendar } from '../../assets/common/calendar.svg';
const ProfileEditPage = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [month, setMonth] = useState(new Date());
  const [userInfo, setUserInfo] = useState({
    nickname: '닉네임',
    email: 'yyheeyeon@gmail.com',
    birthday: '',
  });

  const handleInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleDateSelect = (date) => {
    if (!date) {
      setUserInfo({ ...userInfo, birthday: '' });
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      setUserInfo({ ...userInfo, birthday: format(date, 'yyyy-MM-dd') });
      setShowCalendar(false);
    }
  };

  return (
    <SLayout>
      <BackHeader text='프로필 편집' />
      <SImageContainer>
        <SImageWrapper />
        <SImageButtonWrapper>
          <Camera></Camera>
        </SImageButtonWrapper>
      </SImageContainer>
      <SContentsContainer>
        <SContentContainer>
          <STitleContainer>닉네임</STitleContainer>
          <STextWrapper
            name='nickname'
            placeholder='닉네임을 입력해 주세요!'
            value={userInfo.nickname}
            onChange={handleInfoChange}
          />
        </SContentContainer>
        <SContentContainer>
          <STitleContainer>이메일</STitleContainer>
          <STextWrapper
            name='email'
            placeholder='이메일을 입력해 주세요!'
            value={userInfo.email}
            onChange={handleInfoChange}
          />
        </SContentContainer>
        <SContentContainer>
          <STitleContainer>생일</STitleContainer>
          <SInputContainer onClick={() => setShowCalendar(!showCalendar)}>
            <SInput
              type='text'
              value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
              placeholder='생일을 입력해 주세요!'
              readOnly
            />
            <SBdayIconWrapper>
              <Calendar></Calendar>
            </SBdayIconWrapper>
          </SInputContainer>
          {showCalendar && (
            <SCalendarWrapper>
              <DayPickerStyled
                captionLayout='dropdown'
                fromYear={2010}
                toYear={2024}
                month={month}
                onMonthChange={setMonth}
                mode='single'
                selected={selectedDate}
                onSelect={handleDateSelect}
              />
            </SCalendarWrapper>
          )}
        </SContentContainer>
      </SContentsContainer>
      <SButtonWrapper>
        <Button btnInfo={{ text: '저장', color: 'jade' }} />
      </SButtonWrapper>
    </SLayout>
  );
};

export default ProfileEditPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const SImageContainer = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  margin: 25px;
`;

const SImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--gray-300);
`;

const SImageButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const SContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 335px;
  gap: 24px;
`;

const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 335px;
  height: 94px;
  gap: 8px;
`;

const STitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 58px;
  height: 22px;
  padding: 0px 8px;
  gap: 8px;
  color: var(--gray-400);
`;

const STextWrapper = styled.input`
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 15px;
  border: 2px solid transparent;
  border-radius: 16px;
  color: var(--black);
  background-color: var(--gray-100);
  font-weight: 500;
  font-size: 16px;
  &::placeholder {
    color: var(--black);
  }
  &:focus {
    border: 2px solid var(--jade-pri);
    outline: none;
  }
`;

const SInput = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  padding: 15px 50px 15px 15px;
  border-radius: 16px;
  background-color: var(--gray-100);
  font-weight: 500;
  font-size: 16px;
  &::placeholder {
    color: var(--gray-400);
  }
`;

const SBdayIconWrapper = styled.div`
  position: absolute;
  right: 15px;
`;

const SInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  position: relative;
  width: 100%;
`;

const SButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
`;

const SCalendarWrapper = styled.div`
  position: absolute;
  left: 0px;
  background-color: var(--white);
`;
const DayPickerStyled = styled(DayPicker)``;
