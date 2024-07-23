import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import BackHeader from '../../components/common/BackHeader';
import Button from '../../components/common/Button';
import BottomBackground from '../../components/common/BottomBackground';

const FundingSet = () => {
  const [currentDate, setCurrentDate] = useState('');
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
      addressNumber: '',
      addressDetail1: '',
      addressDetail2: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
    setValue('currentDate', today);
  }, [setValue]);

  const onSubmit = (data) => {
    navigate('/password-set', { state: { formData: data } });
    console.log(data);
  };

  const title = watch('title');
  const date = watch('date');

  useEffect(() => {
    setIsButtonActive(title !== '' && date !== '');
  }, [title, date]);

  return (
    <SLayout>
      <BackHeader />
      <SForm onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <SLabel htmlFor='title'>제목</SLabel>
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
          <SLabel htmlFor='detail'>펀딩 소개</SLabel>
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
          <SLabel htmlFor='currentDate'>기간</SLabel>
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
          <SLabel htmlFor='addressNumber'>주소</SLabel>
          <SAddressContainer>
            <SAddressNumberContainer>
              <SAddressInput
                id='addressNumber'
                {...register('addressNumber', {
                  required: '주소를 입력하세요',
                })}
                type='text'
                placeholder='상세 주소를 입력하세요'
              />
              <SButton disabled={!isButtonActive}>우편번호 찾기</SButton>
            </SAddressNumberContainer>
            <STextInput
              id='addressDetail1'
              {...register('addressDetail1', { required: '주소를 입력하세요' })}
              type='text'
              placeholder='자동입력'
            />
            <STextInput
              id='addressDetail2'
              {...register('addressDetail2', { required: '주소를 입력하세요' })}
              type='text'
              placeholder='상세 주소를 입력하세요'
            />
          </SAddressContainer>
          {errors.address && (
            <SWarningWrapper>{errors.address.message}</SWarningWrapper>
          )}
        </fieldset>
        <BottomBackground
          Button={
            <Button
              disabled={!isValid}
              btnInfo={{
                text: '완료',
                color: isValid ? 'jade' : 'gray',
                width: '335px',
              }}
              type='submit'
            />
          }
        />
      </SForm>
    </SLayout>
  );
};

export default FundingSet;

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 24px;
`;

const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  gap: 24px;

  width: 335px;
  margin: 0 auto;
`;

const SLabel = styled.label`
  display: block;

  margin-left: 8px;
  margin-bottom: 8px;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
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
  font-style: normal;
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
  flex-direction: row;
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
  font-style: normal;
  font-weight: 600;
  line-height: 140%;

  background-color: ${({ disabled }) =>
    disabled ? 'var(--gray-500)' : 'var(--jade-pri)'};
  border-radius: 16px;
`;
