import styled from 'styled-components';
import { forwardRef } from 'react';

const CongratsMessage = (props, ref) => {
  return (
    <SLayout ref={ref}>
      {props.list.map((it, idx) => (
        <SContainer key={idx}>
          <STitleWrapper>{it.name}</STitleWrapper>
          <STextWrapper>{it.message}</STextWrapper>
        </SContainer>
      ))}
    </SLayout>
  );
};

export default forwardRef(CongratsMessage);

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

const STitleWrapper = styled.span`
  width: 97px;
  height: 17px;

  color: var(--gray-500);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

const STextWrapper = styled.p`
  width: 190px;

  color: var(--black);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
