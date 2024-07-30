import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import { ReactComponent as Camera } from '../../assets/common/camera.svg';
import { ReactComponent as ProfileIcon } from '../../assets/common/profile_default.svg';

const ProfileEditPage = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      image: 'default',
      nickname: '닉네임',
      email: 'yyheeyeon@gmail.com',
      birthday: '',
    },
    mode: 'onChange',
  });
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
    setValue('currentDate', today);
  }, [setValue]);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  const birthday = watch('birthday');

  useEffect(() => {
    if (birthday) {
      setValue('birthday', format(new Date(birthday), 'yyyy-MM-dd'));
    }
  }, [birthday, setValue]);

  const handleInfoChange = (e) => {
    setValue(e.target.name, e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const Btn = (
    <ButtonComponent
      type='submit'
      disabled={!isValid}
      btnInfo={{
        text: '저장',
        width: '335px',
        color: isValid ? 'jade' : 'gray',
      }}
    ></ButtonComponent>
  );

  return (
    <SLayout>
      <BackHeaderComponent text='프로필 편집' />
      <SImageContainer>
        {imagePreview ? (
          <SImgWrapper src={imagePreview} alt='Profile' />
        ) : (
          <StyledProfileIcon />
        )}
        <SImageLabel htmlFor='profile-image'>
          <Camera />
        </SImageLabel>
        <SImageInput
          type='file'
          accept='image/*'
          id='profile-image'
          onChange={handleImageChange}
        />
      </SImageContainer>
      <SForm onSubmit={handleSubmit(onSubmit)}>
        <SFieldset>
          <SLegend>닉네임</SLegend>
          <STextarea
            name='nickname'
            placeholder='닉네임을 입력해 주세요!'
            {...register('nickname', {
              required: '닉네임을 입력해 주세요!',
              maxLength: {
                value: 10,
                message: '닉네임은 10자 이내로 입력해 주세요',
              },
            })}
            onChange={handleInfoChange}
          />
          {errors.nickname && (
            <SWarningWrapper>{errors.nickname.message}</SWarningWrapper>
          )}
        </SFieldset>
        <SFieldset>
          <SLegend>이메일</SLegend>
          <STextarea
            name='email'
            placeholder='이메일을 입력해 주세요!'
            {...register('email', {
              required: '이메일을 입력해 주세요!',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '올바른 이메일 형식을 입력해 주세요',
              },
            })}
            onChange={handleInfoChange}
          />
          {errors.email && (
            <SWarningWrapper>{errors.email.message}</SWarningWrapper>
          )}
        </SFieldset>
        <fieldset>
          <SLegend>생일</SLegend>
          <SInputContainer>
            <SDateInput
              placeholder=''
              {...register('birthday', {
                required: '생일을 입력해 주세요!',
                validate: (value) =>
                  value < getValues('currentDate') ||
                  '오늘 이전의 날짜를 선택해주세요',
              })}
              type='date'
            />
          </SInputContainer>
          {errors.birthday && (
            <SWarningWrapper>{errors.birthday.message}</SWarningWrapper>
          )}
        </fieldset>
      </SForm>
      <BottomBackgroundComponent Button={Btn} />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SImageContainer = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  margin: 40px;
`;

const SImgWrapper = styled.img`
  display: flex;

  width: 96px;
  height: 96px;

  border-radius: 50%;
  background-color: var(--gray-300);
`;
const StyledProfileIcon = styled(ProfileIcon)`
  width: 96px;
  height: 96px;
  border-radius: 50%;
`;

const SImageLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 0;
  right: 0;

  cursor: pointer;
`;

const SImageInput = styled.input`
  display: none;
`;

const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
  width: 335px;
  margin: 0 auto;
`;

const SFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  width: 335px;
`;

const SLegend = styled.legend`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 58px;
  height: 22px;
  padding: 0px 8px;

  color: var(--gray-400);
`;

const STextarea = styled.textarea`
  display: flex;
  justify-content: center;

  padding: 20px 0px 3px 20px;

  border: 2px solid transparent;
  border-radius: 16px;

  color: var(--black);
  background-color: var(--gray-100);

  font-weight: 500;
  font-size: 16px;

  resize: none;
  &::placeholder {
    color: var(--black);
  }
  &:focus {
    border: 2px solid var(--jade-pri);
    outline: none;
  }
`;

const SInput = styled.input`
  border-radius: 16px;
  background-color: var(--gray-100);
  font-weight: 500;
  font-size: 16px;
  &::placeholder {
    color: var(--gray-400);
  }
`;

const SInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3px;
  width: 100%;
`;

const SDateInput = styled(SInput)`
  padding: 22px 20px 20px 20px;
  width: 335px;
  box-sizing: border-box;
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

export default ProfileEditPage;
