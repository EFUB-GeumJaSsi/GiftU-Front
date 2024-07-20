import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ReactComponent as OrangeLocker } from '../../assets/PasswordSet/icn_btn_no.svg';
import { ReactComponent as BlueLocker } from '../../assets/PasswordSet/icn_btn_yes.svg';
import BackHeader from '../../components/common/BackHeader';
import Button from '../../components/common/Button';
import BottomSheetComponent from '../../components/common/BottomSheetComponent';

const PasswordSetPage = () => {
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  const [password, setPassword] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      visibility: '',
      password: '',
    },
  });

  useEffect(() => {
    setValue('password', password.join(''));
  }, [password, setValue]);

  const handlePasswordChange = (e, index) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newPassword = [...password];
      newPassword[index] = value;
      setPassword(newPassword);
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !password[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const onSubmit = (data) => {
    const formData = {
      // // ...location.state.formData,
      // visibility: data.visibility,
      // password: data.visibility === 'private' ? data.password : '',
    };
    console.log(data);
    navigate('/');
  };

  return (
    <SLayout>
      <BackHeader />
      <SForm onSubmit={handleSubmit(onSubmit)}>
        <SContentContainer>
          <SLabel>공개 여부</SLabel>
          <SRadiosContainer>
            <SRadioContainer>
              <SRadioInput
                type='radio'
                name='visibility'
                id='public'
                value='public'
                {...register('visibility')}
                onClick={() => setBottomSheetShow(false)}
              />
              <SRadioLabel htmlFor='public'>
                <STitleContainer>
                  <h4>공개</h4>
                  <p>누구나 펀딩에 참여할 수 있어요</p>
                </STitleContainer>
                <SLocker color='orange' />
              </SRadioLabel>
            </SRadioContainer>
            <SRadioContainer>
              <SRadioInput
                type='radio'
                name='visibility'
                id='private'
                value='private'
                {...register('visibility')}
                onClick={() => setBottomSheetShow(true)}
              />
              <SRadioLabel htmlFor='private'>
                <STitleContainer>
                  <h4>비공개</h4>
                  <p>
                    비밀번호를 입력한 사람만 <br />
                    펀딩에 참여할 수 있어요
                  </p>
                </STitleContainer>
                <SLocker color='blue' />
              </SRadioLabel>
            </SRadioContainer>
          </SRadiosContainer>
        </SContentContainer>
        {bottomSheetShow && (
          <BottomSheetComponent
            closeButton='cross'
            setBottomSheetShow={setBottomSheetShow}
          >
            <STitleContainer>
              <h4>비밀번호 입력</h4>
              <p>4자리 숫자를 입력해주세요</p>
            </STitleContainer>
            <SPasswordInputContainer>
              {password.map((digit, index) => (
                <SPasswordInput
                  {...register('password')}
                  key={index}
                  type='text'
                  maxLength='1'
                  value={digit}
                  onChange={(e) => handlePasswordChange(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </SPasswordInputContainer>
            <SButtonContainer>
              <button
                id='secondaryButton'
                type='button'
                onClick={handleSubmit(onSubmit)}
                className={'secondaryButton'}
              >
                완료
              </button>
            </SButtonContainer>
          </BottomSheetComponent>
        )}
        <SButtonContainer>
          <Button
            btnInfo={{
              text: '완료',
              color: 'jade',
              width: '335px',
              type: 'submit',
            }}
            id='primaryButton'
          />
        </SButtonContainer>
      </SForm>
    </SLayout>
  );
};

export default PasswordSetPage;

export const SLocker = ({ color }) => {
  return (
    <SLockerBackground color={color}>
      {color === 'orange' ? <OrangeLocker /> : <BlueLocker />}
    </SLockerBackground>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  background-color: white;
`;
const SForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  width: 335px;
  margin: 24px 20px 0 20px;
`;

const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  width: 100%;

  background-color: white;
`;

const SLabel = styled.label`
  font-weight: 500;
  font-size: 16px;
  color: var(--black);
`;

const SRadiosContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const SRadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const SRadioInput = styled.input`
  display: none;
`;

const SRadioLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  width: 335px;
  height: 128px;

  cursor: pointer;
  background-color: var(--gray-100);
  border-radius: 16px;

  &:hover {
    background-color: #535353;
    h4,
    p {
      color: white;
    }
  }
`;

const STitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;

  width: 203px;
  padding-left: 20px;

  h4 {
    color: black;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  }
  p {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    color: var(--gray-500);
  }
`;

const SLockerBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 96px;
  height: 96px;

  background-color: ${(props) =>
    props.color === 'orange' ? 'var(--orange-sec)' : 'var(--jade-sec)'};
  border-radius: 50%;
`;

const SPasswordInputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  width: 100%;
  margin-top: 32px;
  margin-bottom: 64px;
`;

const SPasswordInput = styled.input`
  width: 56px;
  height: 80px;

  border: none;
  font-size: 16px;
  border-radius: 4px;
  background: var(--gray-100);
  text-align: center;
`;

const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;
