import styled from 'styled-components';
import { B3 } from '../../styles/font';
import { forwardRef } from 'react';

const CongratsMessage = (props, ref) => {
  return (
    <SLayout ref={ref}>
      {props.list &&
        props.list.map((it, idx) => (
          <SContainer key={idx}>
            <STitleSpan>{it.anonymous ? '익명' : it.nickname}</STitleSpan>
            <STextSpan>
              {it.message ? it.message : '펀딩에 참여했어요!'}
            </STextSpan>
          </SContainer>
        ))}
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  padding: 24px 16px 24px 24px;

  border-radius: 16px;
  background: var(--gray-100);
`;
const SContainer = styled.div`
  display: flex;
  gap: 8px;
`;
const STitleSpan = styled.span`
  width: 97px;
  height: 17px;

  ${B3}
  color: var(--gray-500);
`;
const STextSpan = styled.p`
  width: 190px;

  ${B3}
  color: var(--black);
`;

export default forwardRef(CongratsMessage);
