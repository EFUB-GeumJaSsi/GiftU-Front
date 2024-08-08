import styled from 'styled-components';
import { H3, B3 } from '../../styles/font';
import { useEffect, useRef } from 'react';
import BottomSheetComponent from '../../components/common/BottomSheetComponent';
import ButtonComponent from './ButtonComponent';

const PasswordComponent = ({
  setBottomSheetShow,
  color,
  password,
  setPassword,
  passwordHandle = () => {},
  errorMessage,
  name,
  ...props
}) => {
  const inputRefs = useRef([]);

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

  const isPasswordComplete =
    Array.isArray(password) && password.every((digit) => digit !== '');

  return (
    <BottomSheetComponent
      closeButton='cross'
      setBottomSheetShow={setBottomSheetShow}
      {...props}
    >
      <SBottomSheetContainer>
        <STextContainer>
          <h4>비밀번호 입력</h4>
          {name ? (
            <p>펀딩을 개설한 {name}님께 비밀번호를 요청하세요</p>
          ) : (
            <p>4자리 숫자를 입력해 주세요</p>
          )}
        </STextContainer>
        <SForm $errorMessage={errorMessage}>
          <SPasswordInputContainer>
            {Array.isArray(password) &&
              password.map((digit, index) => (
                <SPasswordInput
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
          {errorMessage && <SErrorSpan>{errorMessage}</SErrorSpan>}
          <ButtonComponent
            btnInfo={{
              text: '완료',
              color: isPasswordComplete ? color : 'gray',
            }}
            type='submit'
            disabled={!isPasswordComplete}
            onClick={(e) => passwordHandle(e)}
          />
        </SForm>
      </SBottomSheetContainer>
    </BottomSheetComponent>
  );
};

const SBottomSheetContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  padding: 26px 20px 24px;
  gap: 32px;
`;
const STextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-self: flex-start;

  margin-left: 4px;
  gap: 12px;

  h4 {
    ${H3}
    color: var(--black);
  }

  p {
    ${B3}
    color: var(--gray-500);
  }
`;
const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  gap: ${(props) => (props.$errorMessage ? '0' : '64px')};
`;
const SPasswordInputContainer = styled.div`
  display: flex;
  gap: 8px;
`;
const SPasswordInput = styled.input`
  width: 56px;
  height: 80px;

  border-radius: 4px;
  background-color: var(--gray-100);

  color: var(--black);
  font-size: 30px;
  font-weight: 500;
  text-align: center;
`;
const SErrorSpan = styled.span`
  color: var(--red);
  text-align: center;
  margin-top: 12px;
  margin-bottom: 35px;

  ${B3}
`;

export default PasswordComponent;
