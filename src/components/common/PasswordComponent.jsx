import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import BottomSheetComponent from './BottomSheetComponent';
const PasswordComponent = () => {
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  const [password, setPassword] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
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
  return (
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
  );
};

export default PasswordComponent;

const STitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  width: 203px;
  gap: 13px;
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

const SPasswordInputContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 64px;
`;

const SPasswordInput = styled.input`
  border: none;
  width: 56px;
  height: 80px;
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
