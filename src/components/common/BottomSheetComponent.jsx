// 바텀시트 컴포넌트 사용법
//
// 1. 바텀시트 열기/닫기 제어
// (1-1) 부모 컴포넌트에 추가: const [bottomSheetShow, setBottomSheetShow] = useState(false);
// (1-2) 부모 컴포넌트에 추가: {bottomSheetShow && (<BottomSheetComponent></BottomSheetComponent>)}
//
// 2. 바텀시트 props
// (2-1) closeButton - 'bar' 또는 'cross' (기본 'bar')
// (2-2) action - 'transition' 또는 'back' (기본 'transition')
// (2-3) setBottomSheetShow - 1-1의 setBottomSheetShow
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
import { useNavigate } from 'react-router-dom';
import BottomModalComponent from './BottomModalComponent';
import icn_cross from '../../assets/common/Bottomsheet/cross.svg';

const BottomSheetComponent = ({
  closeButton = 'bar',
  action = 'transition',
  setBottomSheetShow,
  children,
}) => {
  const navigate = useNavigate();
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const handleBottomSheetClose = () => {
    setBottomSheetOpen(false); // 바텀시트 닫기 애니메이션 효과
    setTimeout(() => setBottomSheetShow(false), 300); // 애니메이션 후 언마운트
  };
  const handlePageBack = () => {
    navigate(-1); // 페이지 뒤로가기
  };

  useEffect(() => {
    setBottomSheetOpen(true); // 바텀시트 열기 애니메이션 효과
  }, []);

  return (
    <BottomModalComponent
      backgroundAction={!(action === 'back')}
      setBottomModalShow={setBottomSheetShow}
      parentOpen={bottomSheetOpen}
    >
      <SSection
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {closeButton === 'cross' ? (
          <SCrossButton
            onClick={
              action === 'back' ? handlePageBack : handleBottomSheetClose
            }
          />
        ) : (
          <SBarButton onClick={handleBottomSheetClose} />
        )}
        <article>{children}</article>
      </SSection>
    </BottomModalComponent>
  );
};

const SSection = styled.section`
  width: fit-content;
  height: fit-content;

  border-radius: 20px 20px 0px 0px;
  background-color: var(--white);

  box-sizing: border-box;
`;
const SCrossButton = styled.button`
  position: absolute;
  top: 26px;
  right: 22px;

  width: 20px;
  height: 20px;

  background-image: url(${icn_cross});
  background-repeat: no-repeat;
`;
const SBarButton = styled.button`
  position: absolute;
  top: 16px;
  left: 50%;

  width: 46px;
  height: 6px;

  border-radius: 12px;
  background-color: var(--gray-300);

  transform: translateX(-50%);
`;

export default BottomSheetComponent;
