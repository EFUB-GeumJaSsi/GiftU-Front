import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import BottomSheetComponent from '../../components/common/BottomSheetComponent';

/*


부모 컴포넌트에 
 const [bottomSheetShow, setBottomSheetShow] = useState(false); 하고 사용하시면 됩니다. 

 사용예시: 
{bottomSheetShow && (
  <PasswordComponent
    setBottomSheetShow={setBottomSheetShow}
    handleSubmit={handleSubmit(onSubmit)}
    title='비밀번호 입력'
    name='김이화'
    passwordExact='2222'
    color='orange'
  />
)}

*/

const PasswordComponent = ({
  setBottomSheetShow,
  handleSubmit,
  title,
  name,
  passwordExact,
  color,
}) => {
  const [password, setPassword] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const { register } = useFormContext();
  const [errorMessage, setErrorMessage] = useState('');

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

  const isPasswordComplete = password.every((digit) => digit !== '');

  const handlePasswordSubmit = () => {
    const enteredPassword = password.join('');
    if (enteredPassword !== passwordExact) {
      setErrorMessage('비밀번호가 틀립니다.');
    } else {
      setErrorMessage('');
    }
  };
  return (
    <BottomSheetComponent
      closeButton='cross'
      setBottomSheetShow={setBottomSheetShow}
      style={{ position: 'absolute' }}
    >
      <STextContainer>
        <h4>{title}</h4>
        {name ? (
          <p>펀딩을 개설한 {name}님께 비밀번호를 요청하세요</p>
        ) : (
          <p>4자리 숫자를 입력해 주세요</p>
        )}
      </STextContainer>
      <SPasswordInputContainer>
        {password.map((digit, index) => (
          <SPasswordInput
            {...register(name)}
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
      {errorMessage && <STextWrapper>{errorMessage}</STextWrapper>}

      <SSecondaryButton
        disabled={!isPasswordComplete}
        onClick={handlePasswordSubmit}
        color={color}
      >
        완료
      </SSecondaryButton>
    </BottomSheetComponent>
  );
};

export default PasswordComponent;

const STextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 24px;
  margin-right: 24px;
  h4 {
    margin-bottom: 12px;
    color: black;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  }
  p {
    color: var(--gray-500);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
  }
`;

const SPasswordInputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 12px;
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

const SSecondaryButton = styled.button`
  position: fixed;
  bottom: 0px;
  width: 335px;
  height: 48px;
  margin-left: 24px;
  background-color: ${({ disabled, color }) => {
    if (disabled) return 'var(--gray-100)';
    return color === 'orange' ? 'var(--orange-pri)' : 'var(--jade-pri)';
  }};
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 40px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const STextWrapper = styled.p`
  color: var(--red);
  text-align: center;
  margin-bottom: 35px;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
