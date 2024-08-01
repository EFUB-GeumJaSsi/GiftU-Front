// 바텀시트 컴포넌트 사용법
//
// 1. 바텀시트 열기/닫기 제어
// (1-1) 부모 컴포넌트에 추가: const [bottomSheetShow, setBottomSheetShow] = useState(false);
// (1-2) 부모 컴포넌트에 추가: {bottomSheetShow && (<BottomSheetComponent></BottomSheetComponent>)}
//
// 2. 바텀시트 props
// (2-1) closeButton - 'bar' 또는 'cross' (기본 'bar')
// (2-2) setBottomSheetShow - 1-1의 setBottomSheetShow
// 예시: <BottomSheetComponent closeButton='cross' setBottomSheetShow={setBottomSheetShow}>
//
// 3. 바텀시트 내용
// (3-1) 부모 컴포넌트에서 <BottomSheetComponent></BottomSheetComponent> 안에 작성합니다.
// 예시: <BottomSheetComponent>
//         <h1>친구 추가</h1>
//         <input type='email' name='user-email' placeholder='이메일 입력' />
//       </BottomSheetComponent>

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import BottomModalComponent from './BottomModalComponent';
import icn_cross from '../../assets/common/Bottomsheet/cross.svg';

const BottomSheetComponent = ({
  closeButton,
  setBottomSheetShow,
  children,
}) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const handleBottomSheetClose = () => {
    setBottomSheetOpen(false); // 바텀시트 닫기 애니메이션 효과
    setTimeout(() => setBottomSheetShow(false), 300); // 애니메이션 후 언마운트
  };

  useEffect(() => {
    // 바텀시트 열기 애니메이션 효과
    setBottomSheetOpen(true);
  }, []);

  return (
    <BottomModalComponent
      setBottomModalShow={setBottomSheetShow}
      parentOpen={bottomSheetOpen}
    >
      <SSection
        onClick={(event) => {
          event.stopPropagation();
        }}
        $cross={closeButton === 'cross'}
      >
        {closeButton === 'cross' ? (
          <SCrossButton onClick={handleBottomSheetClose} />
        ) : (
          <SBarButton onClick={handleBottomSheetClose} />
        )}
        <article>{children}</article>
      </SSection>
    </BottomModalComponent>
  );
};

const SSection = styled.section`
  width: 375px;
  height: 320px;
  padding-top: ${({ $cross }) => ($cross ? '26px' : '16px')};
  gap: ${({ $cross }) => ($cross ? '0' : '32')}px;

  border-radius: 20px 20px 0px 0px;
  background-color: var(--white);

  box-sizing: border-box;
`;
const SCrossButton = styled.button`
  position: absolute;
  right: 24px;

  width: 20px;
  height: 20px;

  background-image: url(${icn_cross});
  background-repeat: no-repeat;
`;
const SBarButton = styled.button`
  width: 46px;
  height: 6px;
  margin: 0 auto;

  background-color: var(--gray-300);
  border-radius: 12px;
`;

export default BottomSheetComponent;
