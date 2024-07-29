import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import PasswordComponent from '../../components/common/PasswordComponent';
import { ReactComponent as OrangeLocker } from '../../assets/PasswordSet/icn_btn_no.svg';
import { ReactComponent as BlueLocker } from '../../assets/PasswordSet/icn_btn_yes.svg';

let newPassword = '';

const PasswordSetPage = () => {
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      visibility: '',
      password: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = methods;

  const onSubmit = (data) => {
    console.log('폼 제출', data);
  };

  const visibility = watch('visibility');

  function setPassword(data) {
    newPassword = data;
    console.log(newPassword, visibility);
    navigate('/');
  }

  // function passwordIsValid() {
  //     navigate('/');
  // }

  return (
    <FormProvider {...methods}>
      <SLayout>
        <BackHeaderComponent />
        <SForm onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <SLegend>공개 여부</SLegend>
            <SRadioContainer>
              <SRadioInput
                type='radio'
                name='visibility'
                id='public'
                value='public'
                {...register('visibility', {
                  required: true,
                })}
                onClick={() => setBottomSheetShow(false)}
              />
              <SRadioLabel htmlFor='public'>
                <STextContainer>
                  <h4>공개</h4>
                  <p>누구나 펀딩에 참여할 수 있어요</p>
                </STextContainer>
                <SLocker color='orange' />
              </SRadioLabel>
            </SRadioContainer>
            <SRadioContainer>
              <SRadioInput
                type='radio'
                name='visibility'
                id='private'
                value='private'
                {...register('visibility', {
                  required: true,
                })}
                onClick={() => setBottomSheetShow(true)}
              />
              <SRadioLabel htmlFor='private'>
                <STextContainer>
                  <h4>비공개</h4>
                  <p>
                    비밀번호를 입력한 사람만 <br />
                    펀딩에 참여할 수 있어요
                  </p>
                </STextContainer>
                <SLocker color='blue' />
              </SRadioLabel>
            </SRadioContainer>
          </fieldset>
          {bottomSheetShow && (
            <PasswordComponent
              setBottomSheetShow={setBottomSheetShow}
              passwordExact={'Set'}
              passwordSet={(data) => setPassword(data)}
              color='jade'
            />
          )}
          <SButtonContainer>
            <BottomBackgroundComponent
              Button={
                <ButtonComponent
                  id='primaryButton'
                  disabled={!isValid}
                  btnInfo={{
                    text: '완료',
                    color: 'jade',
                  }}
                  type='submit'
                />
              }
            />
          </SButtonContainer>
        </SForm>
      </SLayout>
    </FormProvider>
  );
};

const SLocker = ({ color }) => {
  return (
    <SLockerBackground color={color}>
      {color === 'orange' ? <OrangeLocker /> : <BlueLocker />}
    </SLockerBackground>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
`;
const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  width: 335px;
  margin: 20px 20px 0px 20px;
`;
const SLegend = styled.legend`
  margin-left: 8px;
  margin-bottom: 40px;
  color: var(--black);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;
const SRadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`;
const SRadioInput = styled.input`
  display: none;

  &:checked + label {
    background-color: #535353;

    h4,
    p {
      color: white;
    }
  }
`;
const SRadioLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 335px;
  height: 128px;
  cursor: pointer;
  background-color: var(--gray-100);
  border-radius: 16px;
`;
const STextContainer = styled.div`
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
    color: var(--gray-500);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
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
const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default PasswordSetPage;
