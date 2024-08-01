import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PageContext } from './IndexPage';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';

const FundingSetPage = () => {
  const { setCurrentPage } = useContext(PageContext);
  const [currentDate, setCurrentDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const navigate = useNavigate();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: '',
      detail: '',
      date: '',
      name: '',
      phoneNumber: '',
      addressNumber: '',
      addressDetail1: '',
      addressDetail2: '',
    },
    mode: 'onChange',
  });
  const title = watch('title');
  const date = watch('date');
  const name = watch('name');
  const phoneNumber = watch('phoneNumber');

  const onSubmit = (data) => {
    navigate('/password-set', { state: { formData: data } });
    console.log(data);
  };
  const completeHandler = (data) => {
    setValue('addressNumber', data.zonecode);
    setValue('addressDetail1', data.address);
    setIsOpen(false);
    setIsAddressOpen(true);
  };
  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };
  const handleFormSubmit = () => {
    setCurrentPage('PasswordSetPage');
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
    setValue('currentDate', today);
  }, [setValue]);
  useEffect(() => {
    setIsButtonActive(
      title !== '' && date !== '' && name !== '' && phoneNumber != '',
    );
  }, [title, date, name, phoneNumber]);

  return (
    <SLayout>
      <BackHeaderComponent onClick={() => setCurrentPage('GiftAddPage')} />
      <SForm onSubmit={handleFormSubmit}>
        <fieldset>
          <SLabel htmlFor='title'>
            <p>제목</p>
            <h5>*</h5>
          </SLabel>
          <STextInput
            id='title'
            {...register('title', {
              required: '펀딩 제목을 작성해주세요',
              maxLength: {
                value: 25,
                message: '25자 이내로 작성해주세요',
              },
            })}
            type='text'
            placeholder='펀딩의 이름을 지어주세요 (최대 25자)'
          />
          {errors.title && (
            <SWarningWrapper>{errors.title.message}</SWarningWrapper>
          )}
        </fieldset>
        <fieldset>
          <SLabel htmlFor='detail'>
            <p>펀딩 소개</p>
          </SLabel>
          <STextInput
            id='detail'
            {...register('detail', {
              required: false,
              maxLength: {
                value: 120,
                message: '펀딩 소개를 120자 이내로 작성해주세요',
              },
            })}
            placeholder='펀딩을 소개해 주세요'
          />
          {errors.detail && (
            <SWarningWrapper>{errors.detail.message}</SWarningWrapper>
          )}
        </fieldset>
        <fieldset>
          <SLabel htmlFor='currentDate'>
            <p>기간</p>
            <h5>*</h5>
          </SLabel>
          <SDateContainer>
            <SCurrentDateInput
              id='currentDate'
              {...register('currentDate', { required: false })}
              type='date'
              value={currentDate}
              readOnly
            />
            <SDateInput
              {...register('date', {
                required: '날짜를 입력해주세요',
                validate: (value) =>
                  value >= getValues('currentDate') ||
                  '오늘 이후의 날짜를 선택해주세요.',
              })}
              type='date'
            />
          </SDateContainer>
          {errors.date && (
            <SWarningWrapper>{errors.date.message}</SWarningWrapper>
          )}
        </fieldset>
        <fieldset>
          <SLabel htmlFor='addressNumber'>
            <p>배송 정보</p>
            <h5>*</h5>
          </SLabel>
          <SAddressContainer>
            <STextInput
              id='name'
              {...register('name', {
                required: '배송 정보를 입력하세요',
              })}
              type='text'
              placeholder='이름을 입력해주세요'
            />
            <STextInput
              id='phoneNumber'
              {...register('phoneNumber', {
                required: '배송 정보를 입력하세요',
              })}
              type='text'
              placeholder='휴대폰 번호를 -없이 입력해주세요'
            />
            <SAddressNumberContainer>
              <SAddressInput
                id='addressNumber'
                {...register('addressNumber', {
                  required: '배송 정보를 입력하세요',
                })}
                type='text'
                placeholder='주소지를 입력해주세요'
                readOnly
              />
              <SButton disabled={!isButtonActive} onClick={toggleHandler}>
                우편번호 찾기
              </SButton>
            </SAddressNumberContainer>
            {isAddressOpen && (
              <>
                <STextInput
                  id='addressDetail1'
                  {...register('addressDetail1', {
                    required: '배송 정보를 입력하세요',
                  })}
                  type='text'
                  readOnly
                />
                <STextInput
                  id='addressDetail2'
                  {...register('addressDetail2', {
                    required: '배송 정보를 입력하세요',
                  })}
                  type='text'
                  placeholder='상세 주소를 입력하세요'
                />
              </>
            )}
          </SAddressContainer>
          {errors.address && (
            <SWarningWrapper>{errors.address.message}</SWarningWrapper>
          )}
        </fieldset>
        <BottomBackgroundComponent
          Button={
            <ButtonComponent
              type='submit'
              disabled={!isValid}
              btnInfo={{
                text: '다음',
                color: isValid ? 'jade' : 'gray',
                width: '335px',
              }}
            />
          }
        />
      </SForm>
      {isOpen && (
        <SPostcodeContainer>
          <DaumPostcode
            onComplete={completeHandler}
            style={{ width: '100%', height: '100%' }}
          />
        </SPostcodeContainer>
      )}
    </SLayout>
  );
};

const SLayout = styled.div`
  padding-bottom: 88px;
`;
const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;

  width: 335px;
  margin: 24px auto;
  gap: 24px;
`;
const SLabel = styled.label`
  display: block;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
  margin-bottom: 8px;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;

  h5 {
    margin-left: 8px;
    padding-top: 3px;

    color: var(--jade-pri);
  }
`;
const SInput = styled.input`
  background-color: var(--gray-100);
  border-radius: 16px;
`;
const STextInput = styled(SInput)`
  width: 335px;
  padding: 21px 24px;

  color: var(--black);
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  box-sizing: border-box;

  &:focus {
    border: 2px solid var(--jade-pri);
  }
`;
const SWarningWrapper = styled.div`
  margin-top: 8px;
  margin-left: 8px;

  color: var(--red);
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
`;
const SDateContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  width: 100%;
`;
const SCurrentDateInput = styled(SInput)`
  width: 160px;
  padding: 21px 22px;
  box-sizing: border-box;
`;
const SDateInput = styled(SInput)`
  width: 160px;
  padding: 21px 22px;
  box-sizing: border-box;

  &:focus {
    border: 2px solid var(--jade-pri);
  }
`;
const SAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
const SAddressNumberContainer = styled.div`
  display: flex;
  flex-flow: row;
  gap: 8px;
  width: 100%;
`;
const SAddressInput = styled(SInput)`
  width: 209px;
  padding: 21px 34px 21px 28px;
  box-sizing: border-box;
`;
const SButton = styled.button`
  align-self: center;

  width: 118px;
  height: 48px;
  padding: 13px 15px 13px 16px;

  box-sizing: border-box;
  color: white;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  background-color: ${({ disabled }) =>
    disabled ? 'var(--gray-500)' : 'var(--jade-pri)'};
  border-radius: 16px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
const SPostcodeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  z-index: 1000;
`;

export default FundingSetPage;
