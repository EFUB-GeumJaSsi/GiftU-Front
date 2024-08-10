import styled from 'styled-components';
import { B1, B3 } from '../../styles/font';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import { ReactComponent as Camera } from '../../assets/common/camera.svg';
import { ReactComponent as ProfileIcon } from '../../assets/common/profile_default.svg';
import { getUserInfo, patchUserInfo } from '../../api/user';

const ProfileEditPage = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      nickname: '',
      email: '',
      birthday: '',
    },
    mode: 'onChange',
  });

  //유저정보 조회 API
  const readUserInfo = async () => {
    try {
      const response = await getUserInfo();
      const userData = response.data;

      setValue('nickname', userData.nickname);
      setValue('email', userData.email);
      setValue('birthday', format(new Date(userData.birthday), 'yyyy-MM-dd'));
      if (userData.userImageUrl) {
        setImagePreview(userData.userImageUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //유저정보 수정 API
  const updateUserInfo = async (userData) => {
    try {
      const data = {
        nickname: userData.nickname,
        email: userData.email,
        birthday: userData.birthday,
      };
      const formData = new FormData();
      if (!imageFile) {
        formData.append('userImage', userData.userImageUrl);
      } else {
        formData.append('userImage', imageFile);
      }
      formData.append(
        'userUpdateRequestDto',
        new Blob([JSON.stringify(data)], { type: 'application/json' }),
      );

      const response = await patchUserInfo(formData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
    setValue('currentDate', today);
  }, [setValue]);

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
  const handleSubmitChange = async (userData) => {
    try {
      await updateUserInfo(userData);
      navigate('/my');
    } catch (error) {
      console.error(error);
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
      onClick={handleSubmit(handleSubmitChange)}
    ></ButtonComponent>
  );

  useEffect(() => {
    readUserInfo();
  }, []);

  return (
    <SLayout>
      <BackHeaderComponent text='프로필 편집' />
      <SForm>
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
        <SFieldset>
          <SLegend>닉네임</SLegend>
          <STextarea
            name='nickname'
            placeholder='닉네임을 입력해 주세요!'
            value={useForm.nickname}
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
            value={useForm.email}
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
              value={useForm.birthday}
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
  align-items: center;
  justify-content: center;

  padding-bottom: 88px;
`;

const SImageContainer = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  margin: 0 auto;
`;

const SImgWrapper = styled.img`
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

  margin: 32px auto;
  gap: 24px;
`;

const SFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  width: 335px;
`;

const SLegend = styled.legend`
  margin: 0 0 8px 8px;

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

  ${B1}
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
  ${B1}
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

  ${B3}
  color: var(--red);
`;

export default ProfileEditPage;
