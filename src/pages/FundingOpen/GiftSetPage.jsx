import styled from 'styled-components';
import { useState } from 'react';
import BackHeader from '../../components/common/BackHeader';

const GiftSetPage = () => {
  // local storage 초기화 후에 데이터 저장해야 함

  const [price, setPrice] = useState(null);

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

  return (
    <SLayout>
      <BackHeader />
      <SForm>
        <fieldset>
          <SLegend>가격</SLegend>
          <SInput
            type='tel'
            name='gift'
            id='gift-price'
            maxLength='10'
            placeholder='선물의 가격을 입력해 주세요'
            value={price ? `${price.toLocaleString()}원` : ''}
            required
            onChange={handlePriceChange}
            onKeyDown={handlePriceKeydown}
          />
        </fieldset>
        <fieldset>
          <SLegend>링크</SLegend>
          <SInput
            type='url'
            name='gift'
            id='gift-url'
            placeholder='상품 링크를 붙여 넣어 주세요'
            required
          />
        </fieldset>
        <fieldset>
          <SLegend>사진</SLegend>
          <input
            type='file'
            name='gift'
            id='gift-image'
            placeholder='+'
            required
          />
        </fieldset>
      </SForm>
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
  margin-bottom: 8px;

  color: var(--black);
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;
const SInput = styled.input`
  width: 335px;
  padding: 21px 24px;

  border-radius: 16px;
  background: var(--gray-100);

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
  &:focus {
    border: 2px solid var(--jade-pri);
  }
`;

export default GiftSetPage;
