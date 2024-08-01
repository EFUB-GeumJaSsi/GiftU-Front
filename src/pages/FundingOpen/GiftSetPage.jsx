import styled from 'styled-components';
import { useState, useContext } from 'react';
import { PageContext } from './IndexPage';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import PriceInputComponent from '../../components/common/PriceInputComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import icn_plus from '../../assets/FungingOpen/icn_plus.svg';

const GiftSetPage = () => {
  const { setCurrentPage } = useContext(PageContext);
  const [price, setPrice] = useState(null);
  const [url, setUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
  const handleFormSubmit = () => {
    setCurrentPage('GiftAddPage');
  };

  return (
    <SLayout>
      <BackHeaderComponent />
      <SForm onSubmit={handleFormSubmit}>
        <fieldset>
          <SLegend>가격</SLegend>
          <PriceInputComponent
            name='gift'
            id='gift-price'
            maxLength='11'
            placeholder='선물의 가격을 입력해 주세요'
            required
            focusColor='var(--jade-pri)'
            price={price}
            setPrice={setPrice}
          />
        </fieldset>
        <fieldset>
          <SLegend>링크</SLegend>
          <SUrlInput
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
        <BottomBackgroundComponent
          Button={
            <ButtonComponent
              type='submit'
              btnInfo={
                price && url && imageFile
                  ? { text: '다음', color: 'jade', onClick: '' }
                  : { text: '선물 추가하기' }
              }
            />
          }
        />
      </SForm>
    </SLayout>
  );
};

const SLayout = styled.div`
  padding-bottom: 88px;
`;
const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;

  width: fit-content;
  margin: 24px auto;

  gap: 24px;
`;
const SLegend = styled.legend`
  margin: 0 0 8px 8px;

  color: var(--black);
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;
const SUrlInput = styled.input`
  width: 335px;
  padding: 21px 24px;

  border: 2px solid transparent;
  border-radius: 16px;
  background-color: var(--gray-100);

  color: var(--black);
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;

  box-sizing: border-box;

  &:focus {
    border: 2px solid var(--jade-pri);
  }

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
