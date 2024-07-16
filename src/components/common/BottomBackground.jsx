import styled from "styled-components";

// const Btn = (
//     <SBtnContainer>
//       <Button btnInfo={{ text: '참여 취소', width: '104px' }}></Button>
//       <Button
//         btnInfo={{
//           text: '축하 메시지 수정하기',
//           width: '223px',
//           color: 'orange',
//         }}
//       ></Button>
//     </SBtnContainer>
//   );
// Btn을 아래에 props로 할당
// <BottomBackground Button={Btn} />; 
// 
// 위 처럼 변수로 따로 작성해도 되고 바로 Button={} 안에 작성해도 상관 없습니다

const BottomBackground = ({Button}) => {
    return(
        <SLayout>
            {Button}
        </SLayout>
    )
}

export default BottomBackground;

const SLayout = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 999;

  padding: 8px 20px 24px 20px;

  border-top: 1px solid var(--gray-100);
  background: var(--white);
`;