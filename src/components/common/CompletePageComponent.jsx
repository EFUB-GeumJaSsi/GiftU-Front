// 완료 페이지 컴포넌트 사용법
//
// 1. props
// (1-1) Icon - 아이콘 이미지. 컴포넌트 형태로 전달한다.
// (1-2) heading - 굵은 글씨.
// (1-3) paragraph - 회색 글씨. 객체 형태로 전달한다. 단순 문자열로 전달하면 줄바꿈이 되지 않고 \n이 그대로 출력된다.
//
// 예시
// import { ReactComponent as IcnGift } from '../../assets/FungingOpen/icn_gift.svg';
// ...
//   <CompletePageComponent
//     Icon={IcnGift}
//     heading='펀딩 개설이 완료되었어요!'
//     paragraph={`내가 만든 펀딩은\n[마이]-[내가 만든 펀딩]에서\n확인할 수 있어요`}
//   />

import styled from 'styled-components';

const CompletePageComponent = ({ Icon, heading, paragraph }) => {
  return (
    <SMain>
      <Icon />
      <SH3>{heading}</SH3>
      <SB2>{paragraph}</SB2>
    </SMain>
  );
};

// 텍스트 스타일
const SH3 = styled.h3`
  color: var(--black);
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;
`;
const SB2 = styled.p`
  color: var(--gray-500);
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  white-space: pre-line;
  text-align: center;
`;

// 레이아웃 스타일
const SMain = styled.main`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  gap: 24px;
  margin-bottom: 88px;
`;

export default CompletePageComponent;
