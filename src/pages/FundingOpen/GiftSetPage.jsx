import styled from 'styled-components';
import { useState, useContext } from 'react';
import { DataContext, PageContext } from './IndexPage';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import PriceInputComponent from '../../components/common/PriceInputComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import icn_plus from '../../assets/FungingOpen/icn_plus.svg';

const GiftSetPage = ({
  lastGiftData = {
    giftName: '',
    price: null,
    giftUrl: '',
  },
  lastImageData = null,
}) => {
  const { setCurrentPage } = useContext(PageContext);
  const { setGiftData, setImageData } = useContext(DataContext);

  const [name, setName] = useState(lastGiftData.giftName);
  const [price, setPrice] = useState(lastGiftData.price);
  const [url, setUrl] = useState(lastGiftData.giftUrl);
  const [imageFile, setImageFile] = useState(lastImageData);

  const handleFormSubmit = () => {
    if (lastGiftData.price) {
      setGiftData((prevItems) => [
        // 마지막 아이템 삭제
        ...prevItems.slice(0, -1),
        // 수정 아이템 저장
        {
          giftName: name,
          price: price,
          giftUrl: url,
        },
      ]);
      setImageData((prevItems) => [
        // 마지막 아이템 삭제
        ...prevItems.slice(0, -1),
        // 수정 아이템 저장
        imageFile,
      ]);
    } else {
      setGiftData((prevItems) => [
        ...prevItems,
        {
          giftName: name,
          price: price,
          giftUrl: url,
        },
      ]);
      setImageData((prevItems) => [...prevItems, imageFile]);
    }
    setCurrentPage('GiftAddPage');
  };

  return (
    <SLayout>
      <BackHeaderComponent />
      <SForm onSubmit={handleFormSubmit}>
        <fieldset>
          <SLegend>상품</SLegend>
          <SInput
            type='text'
            name='gift'
            id='gift-name'
            placeholder='상품명을 입력해 주세요'
            value={name}
            required={!name}
            onChange={(event) => setName(event.target.value)}
          />
        </fieldset>
        <fieldset>
          <SLegend>가격</SLegend>
          <PriceInputComponent
            name='gift'
            id='gift-price'
            maxLength='11'
            placeholder='상품 가격을 입력해 주세요'
            required={!price}
            focusColor='var(--jade-pri)'
            price={price}
            setPrice={setPrice}
          />
        </fieldset>
        <fieldset>
          <SLegend>링크</SLegend>
          <SInput
            type='url'
            name='gift'
            id='gift-url'
            placeholder='상품 링크를 붙여 넣어 주세요'
            value={url}
            required={!url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </fieldset>
        <fieldset>
          <SLegend>사진</SLegend>
          <SImageLabel htmlFor='gift-image'>
            {imageFile && <SImg src={URL.createObjectURL(imageFile)} />}
          </SImageLabel>
          <SImageInput
            type='file'
            accept='image/*'
            name='gift'
            id='gift-image'
            placeholder='+'
            required={!imageFile}
            onChange={(event) => {
              event.target.files[0] && setImageFile(event.target.files[0]);
            }}
          />
        </fieldset>
        <BottomBackgroundComponent
          Button={
            <ButtonComponent
              type='submit'
              btnInfo={
                // name && price && url && imageFile
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

  &::after {
    content: '*';

    position: relative;
    top: 2px;
    left: 8px;

    color: var(--jade-pri);
  }
`;
const SInput = styled.input`
  width: 335px;
  padding: 21px 24px;

  border: 2px solid transparent;
  border-radius: 16px;
  background-color: var(--gray-100);

  color: var(--black);
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  text-overflow: ellipsis;

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
