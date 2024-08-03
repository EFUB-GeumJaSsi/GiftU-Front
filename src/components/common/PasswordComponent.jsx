/*
부모 컴포넌트에 패스워드가 유효하다면 어느 창으로 이동할지 passwordIsValid()로 설정해주시면 됩니다.
function passwordIsValid() {
  navigate('/');
}
{bottomSheetShow && (
  <PasswordComponent
    color='orange'
    passwardExact={'1234'}
    validPassword={() => passwordIsValid()}
    setBottomSheetShow={setBottomSheetShow}
  />
)}
*/

import styled from 'styled-components';
import { useRef, useState } from 'react';
import BottomSheetComponent from '../../components/common/BottomSheetComponent';
import { postPassword } from '../../api/funding';
import ButtonComponent from './ButtonComponent';

const PasswordComponent = ({
  color,
  passwordExact,
  passwordSet,
  validPassword,
  fundingId,
  name,
  setBottomSheetShow,
  ...props
}) => {
  const [password, setPassword] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const [errorMessage, setErrorMessage] = useState('');

  // 패스워드 일치 여부 확인
  const readPassword = async () => {
    try {
      const res = await postPassword(fundingId, password.join(''));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

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

  const handlePasswordSubmit = async (e) => {
    // 패스워드 등록하는 경우
    const enteredPassword = password.join('');
    if (passwordExact === 'Set') {
      passwordSet(enteredPassword);
      return;
    }

    e.preventDefault();

    // 패스워드 확인하는 경우
    const res = await readPassword();
    if (res) {
      setErrorMessage('');
      validPassword();
    } else {
      setPassword(['', '', '', '']);
      setErrorMessage('비밀번호를 다시 입력해 주세요.');
    }
  };

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
        <SForm errorMessage={errorMessage}>
          <SPasswordInputContainer>
            {password.map((digit, index) => (
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
          {/* ButtonComponent 사용하기 */}
          <ButtonComponent
            btnInfo={{
              text: '완료',
              color: isPasswordComplete ? color : 'gray',
            }}
            type='submit'
            disabled={!isPasswordComplete}
            onClick={(e) => handlePasswordSubmit(e)}
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
    color: var(--black);
    font-size: 20px;
    font-weight: 600;
  }

  p {
    color: var(--gray-500);
    font-size: 14px;
    font-weight: 500;
  }
`;
const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  gap: ${(props) => (props.errorMessage ? '0' : '64px')};
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

  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
`;

export default PasswordComponent;
