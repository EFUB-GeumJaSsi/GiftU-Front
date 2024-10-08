import styled from 'styled-components';
import { B1, B3, H3 } from '../../styles/font';
import { useEffect, useState, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { DataContext, PageContext } from './IndexPage';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import PasswordComponent from '../../components/common/PasswordComponent';
import { ReactComponent as OrangeLocker } from '../../assets/PasswordSet/icn_btn_no.svg';
import { ReactComponent as BlueLocker } from '../../assets/PasswordSet/icn_btn_yes.svg';

const PasswordSetPage = () => {
  const { setCurrentPage } = useContext(PageContext);
  const { setFundingData } = useContext(DataContext);
  const [password, setPassword] = useState(['', '', '', '']);

  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      visibility: '',
      password: '',
    },
    mode: 'onChange',
  });
  const visibility = watch('visibility');

  const isButtonDisabled = () => {
    if (visibility === 'public') {
      return false;
    }
    return true;
  };

  const handleFormSubmit = (data) => {
    const formattedData = {
      ...data,
      visibility: data.visibility === 'public' ? true : false,
      password: password.join(''),
    };
    setFundingData((prevData) => ({
      ...prevData,
      ...formattedData,
    }));
    setCurrentPage('Submit');
  };

  useEffect(() => {
    if (!bottomSheetShow) {
      reset();
    }
  }, [bottomSheetShow, reset]);

  return (
    <FormProvider>
      <SLayout>
        <BackHeaderComponent
          onClick={() => {
            setCurrentPage('FundingSetPage');
          }}
        />
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <SFieldset>
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
          </SFieldset>
          {bottomSheetShow && (
            <PasswordComponent
              setBottomSheetShow={setBottomSheetShow}
              color='jade'
              password={password}
              setPassword={setPassword}
            />
          )}
          <BottomBackgroundComponent
            Button={
              <ButtonComponent
                disabled={isButtonDisabled() ? true : false}
                btnInfo={{
                  text: '완료',
                  color: isButtonDisabled() ? 'grey' : 'jade',
                }}
              />
            }
          />
        </form>
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
  padding-bottom: 88px;
`;
const SFieldset = styled.fieldset`
  width: fit-content;
  margin: 24px auto;
`;
const SLegend = styled.legend`
  margin-left: 8px;
  margin-bottom: 40px;

  ${B1}
  color: var(--black);
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
    ${H3}
    color: black;
  }
  p {
    ${B3}
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

export default PasswordSetPage;
