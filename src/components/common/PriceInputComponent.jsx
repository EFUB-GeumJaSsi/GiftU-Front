// 금액 입력 컴포넌트 사용법
//
// 1. 부모 컴포넌트에 추가: const [price, setPrice] = useState(null);
//
// 2. props
// (1-1) focusColor - 포커스 시 테두리 색상
// (1-2) price - 1의 price
// (1-3) setPrice - 1의 setPrice
// (1-4) ...props - 기본 input 태그를 사용하듯이 props를 적으면 이것을 통해 전달됩니다.
// 예시: <PriceInputComponent focusColor='var(--jade-pri)' price={price} setPrice={setPrice} />

import styled from 'styled-components';
import { B2 } from '../../styles/font';

const PriceInputComponent = ({ focusColor, price, setPrice, ...props }) => {
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
    <SInput
      type='tel' // 모바일 숫자패드
      $focusColor={focusColor}
      value={price ? `${price.toLocaleString()}원` : ''}
      onChange={handlePriceChange}
      onKeyDown={handlePriceKeydown}
      {...props}
    />
  );
};

const SInput = styled.input`
  width: 335px;
  padding: 21px 24px;

  border: 2px solid transparent;
  border-radius: 16px;
  background-color: var(--gray-100);

  ${B2}
  color: var(--black);

  box-sizing: border-box;

  &:focus {
    border: 2px solid ${({ $focusColor }) => $focusColor};
  }

  &::placeholder {
    ${B2}
    color: var(--gray-400);
  }
`;

export default PriceInputComponent;
