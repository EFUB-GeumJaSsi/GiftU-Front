// const Btn = (
//     <SBtnContainer>
//       <ButtonComponent btnInfo={{ text: '참여 취소', width: '104px' }} />
//       <ButtonComponent
//         btnInfo={{
//           text: '축하 메시지 수정하기',
//           width: '223px',
//           color: 'orange',
//         }}
//       />
//     </SBtnContainer>
//   );
// Btn을 아래에 props로 할당
// <BottomBackgroundComponent Button={Btn} />;
//
// 위 처럼 변수로 따로 작성해도 되고 바로 Button={} 안에 작성해도 상관 없습니다

import styled from 'styled-components';

const BottomBackgroundComponent = ({ Button }) => {
  return <SLayout>{Button}</SLayout>;
};

const SLayout = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 999;

  padding: 8px 20px 24px 20px;

  border-top: 1px solid var(--gray-100);
  background: var(--white);
`;

export default BottomBackgroundComponent;
