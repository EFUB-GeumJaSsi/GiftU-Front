import styled from 'styled-components';
import { useState } from 'react';
import BackHeader from '../../components/common/BackHeader';
import BottomBackground from '../../components/common/BottomBackground';
import Button from '../../components/common/Button';
import icn_plus from '../../assets/FungingOpen/icn_plus.svg';

const GiftSetPage = () => {
  const [price, setPrice] = useState(null);
  const [url, setUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handlePriceChange = (event) => {
    let input = event.target.value;
    input = input.replace(/[^0-9]/gi, ''); // 숫자 외 모든 문자 제거
    setPrice(Number(input));
  };
  const handlePriceKeydown = (event) => {
    if (event.key === 'Backspace') {
      let input = event.target.value;
      input = input.replace(/[^0-9]/gi, ''); // 숫자 외 모든 문자 제거
      input = input.slice(0, -1); // 마지막 숫자 삭제
      setPrice(Number(input));
    }
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <SLayout>
      <BackHeader />
      <SForm>
        <fieldset>
          <SLegend>가격</SLegend>
          <STextInput
            type='tel'
            name='gift'
            id='gift-price'
            maxLength='11'
            placeholder='선물의 가격을 입력해 주세요'
            value={price ? `${price.toLocaleString()}원` : ''}
            required
            onChange={handlePriceChange}
            onKeyDown={handlePriceKeydown}
          />
        </fieldset>
        <fieldset>
          <SLegend>링크</SLegend>
          <STextInput
            type='url'
            name='gift'
            id='gift-url'
            placeholder='상품 링크를 붙여 넣어 주세요'
            required
            onChange={handleUrlChange}
          />
        </fieldset>
        <fieldset>
          <SLegend>사진</SLegend>
          <SImageLabel htmlFor='gift-image'>
            {imagePreview && <SImg src={imagePreview} />}
          </SImageLabel>
          <SImageInput
            type='file'
            accept='image/*'
            name='gift'
            id='gift-image'
            placeholder='+'
            required
            onChange={handleImageChange}
          />
        </fieldset>
      </SForm>
      <BottomBackground
        Button={
          <Button
            type='submit'
            btnInfo={
              price && url && imageFile
                ? { text: '다음', color: 'jade', onClick: '' }
                : { text: '선물 추가하기' }
            }
          />
        }
      />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;

  gap: 24px;
`;
const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;

  width: fit-content;
  margin: 0 auto;

  gap: 24px;
`;
const SLegend = styled.legend`
  margin: 0 0 8px 8px;

  color: var(--black);
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;
const SInput = styled.input`
  border: 2px solid transparent;
  border-radius: 16px;
  background-color: var(--gray-100);

  &:focus {
    border: 2px solid var(--jade-pri);
  }
`;
const STextInput = styled(SInput)`
  width: 335px;
  padding: 21px 24px;

  color: var(--black);
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;

  box-sizing: border-box;

  &::placeholder {
    color: var(--gray-400);
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
  }
`;
const SImageLabel = styled.label`
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;

  width: 120px;
  height: 120px;

  border-radius: 16px;
  background-color: var(--gray-100);
  background-image: url(${icn_plus});
  background-repeat: no-repeat;
  background-position: center;
`;
const SImg = styled.img`
  width: 100%;

  border-style: none;
  border-radius: 16px;
`;
const SImageInput = styled.input`
  display: none;
`;

export default GiftSetPage;
