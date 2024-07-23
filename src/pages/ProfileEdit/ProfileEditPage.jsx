import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import BackHeader from '../../components/common/BackHeader';
import Button from '../../components/common/Button';
import BottomBackground from '../../components/common/BottomBackground';
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
  const Btn = (
    <Button
      btnInfo={{
        text: '저장',
        width: '335px',
        color: 'jade',
      }}
    ></Button>
  );

  return (
    <SLayout>
      <BackHeader text='프로필 편집' />
      <SImageContainer>
        <SImageWrapper />
        <SImageButtonWrapper>
          <Camera></Camera>
        </SImageButtonWrapper>
      </SImageContainer>
      <SContentContainer>
        <SForm>
          <SLegend>닉네임</SLegend>
          <STextarea
            name='nickname'
            placeholder='닉네임을 입력해 주세요!'
            value={userInfo.nickname}
            onChange={handleInfoChange}
          />
        </SForm>
        <SForm>
          <SLegend>이메일</SLegend>
          <STextarea
            name='email'
            placeholder='이메일을 입력해 주세요!'
            value={userInfo.email}
            onChange={handleInfoChange}
          />
        </SForm>
        <SForm>
          <SLegend>생일</SLegend>
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
                fromYear={1920}
                toYear={2024}
                month={month}
                onMonthChange={setMonth}
                mode='single'
                selected={selectedDate}
                onSelect={handleDateSelect}
              />
            </SCalendarWrapper>
          )}
        </SForm>
      </SContentContainer>
      <SBtnWrapper>
        <BottomBackground Button={Btn} />
      </SBtnWrapper>
    </SLayout>
  );
};

export default ProfileEditPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SImageContainer = styled.div`
  position: relative;

  width: 96px;
  height: 96px;
  margin: 40px;
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

const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;

  width: 335px;
`;

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  width: 335px;
  height: 94px;
`;

const SLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 58px;
  height: 22px;
  padding: 0px 8px;

  color: var(--gray-400);
`;

const STextarea = styled.textarea`
  display: flex;
  justify-content: center;

  height: 100%;
  padding: 24px;

  border: 2px solid transparent;
  border-radius: 16px;

  color: var(--black);
  background-color: var(--gray-100);

  font-weight: 500;
  font-size: 16px;

  resize: none;
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
  padding: 15px 50px 15px 24px;

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
  right: 24px;
`;

const SInputContainer = styled.div`
  display: flex;
  align-items: center;

  margin-top: 8px;
  position: relative;
  width: 100%;
`;
const SCalendarWrapper = styled.div`
  position: absolute;
  left: 0px;
  background-color: var(--white);
`;
const DayPickerStyled = styled(DayPicker)``;
const SBtnWrapper = styled.div`
  position: fixed;
  bottom: 0;
`;
