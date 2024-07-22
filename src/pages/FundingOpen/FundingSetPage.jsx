import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import BackHeader from '../../components/common/BackHeader';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const FundingSet = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      detail: '',
      date: '',
      addressNumber: '',
      addressDetail1: '',
      addressDetail2: '',
    },
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

  return (
    <SLayout>
      <BackHeader />
      <SForm onSubmit={handleSubmit(onSubmit)}>
        <SContentContainer>
          <SLabel htmlFor='title'>제목</SLabel>
          <STitleInput
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
            <SWarningWrapper>
              <p>{`${errors.title.message}`}</p>
            </SWarningWrapper>
          )}
        </SContentContainer>
        <SContentContainer>
          <SLabel htmlFor='detail'>펀딩 소개</SLabel>
          <SDetailInput
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
            <SWarningWrapper>
              <p>{`${errors.detail.message}`}</p>
            </SWarningWrapper>
          )}
        </SContentContainer>
        <SContentContainer>
          <SLabel htmlFor='currentDate'>기간</SLabel>
          <SDateContainer>
            <SDateInput
              id='currentDate'
              {...register('currentDate', {
                required: true,
              })}
              type='date'
              value={currentDate}
              readOnly
            />
            <SDateWrapper>
              <SDateInput
                {...register('date', {
                  required: '날짜를 입력해주세요',
                  validate: (value) =>
                    value >= getValues('currentDate') ||
                    '오늘 이후의 날짜를 선택해주세요.',
                })}
                type='date'
              />
            </SDateWrapper>
          </SDateContainer>
          {errors.date && (
            <SWarningWrapper>
              <p>{`${errors.date.message}`}</p>
            </SWarningWrapper>
          )}
        </SContentContainer>
        <SContentContainer>
          <SLabel htmlFor='addressNumber'>주소</SLabel>
          <SAddressContainer>
            <SAdressNumberContainer>
              <SAddressInput
                id='addressNumber'
                {...register('addressNumber', {
                  required: '주소를 입력하세요',
                })}
                type='text'
                placeholder='상세 주소를 입력하세요'
              />
              <Button
                btnInfo={{
                  text: '우편번호 찾기',
                  color: 'jade',
                  width: '118px',
                }}
              />
            </SAdressNumberContainer>
            <SAddressDetailInput
              id='addressDetail1'
              {...register('addressDetail1', {
                required: '주소를 입력하세요',
              })}
              type='text'
              placeholder='자동입력'
            />
            <SAddressDetailInput
              id='addressDetail2'
              {...register('addressDetail2', {
                required: '주소를 입력하세요',
              })}
              type='text'
              placeholder='상세 주소를 입력하세요'
            />
          </SAddressContainer>
          {errors.address && (
            <SWarningWrapper>
              <p>{`${errors.address.message}`}</p>
            </SWarningWrapper>
          )}
        </SContentContainer>
        <Button
          btnInfo={{ text: '다음', color: 'jade', width: '335px' }}
          type='submit'
        />
      </SForm>
    </SLayout>
  );
};

export default FundingSet;
const SInput = styled.input`
  background-color: var(--gray-100);
  border-radius: 16px;
  &:focus {
    border: 2px solid var(--jade-pri);
  }
`;

const STextArea = styled.textarea`
  background-color: var(--gray-100);
  border-radius: 16px;
  outline: none;
  border-style: none;
  resize: none;
  &:focus {
    border: 2px solid var(--jade-pri);
  }
`;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;

  width: 335px;
  margin: 24px 20px 0 20px;
`;

const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
`;

const SLabel = styled.label`
  font-weight: 500;
  font-size: 16px;
  color: var(--black);
`;

const STitleInput = styled(SInput)`
  height: 64px;
  padding-left: 24px;
  padding-right: 24px;
`;

const SWarningWrapper = styled.div`
  padding-left: 8px;
  p {
    color: #ff6161;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
  }
`;

const SDetailInput = styled(STextArea)`
  height: 140px;
  padding: 20px 24px;
  font-size: 16px;
`;

const SDateContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  width: 100%;
`;

const SDateInput = styled(SInput)`
  width: 128px;
  padding: 21px 16px 21px 16px;
`;

const SDateWrapper = styled.div`
  cursor: pointer;
`;

const SAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
`;

const SAdressNumberContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  width: 100%;
`;

const SAddressInput = styled(SInput)`
  width: 209px;
  height: 64px;
  padding-left: 28px;
`;

const SAddressDetailInput = styled(SInput)`
  width: 311px;
  height: 64px;
  padding-left: 24px;
`;
