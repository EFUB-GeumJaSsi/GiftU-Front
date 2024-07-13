import React from 'react';
import styled from 'styled-components';

const NotificationItem = ({ image, name, message, time }) => {
  return (
    <SLayout>
      <img src={image}></img>
      <STextContainer>
        <STextboxContainer>
          <SNameWrapper>{name}</SNameWrapper>
          <SMessageWrapper>{message}</SMessageWrapper>
        </STextboxContainer>
        <STimeWrapper>{time}</STimeWrapper>
      </STextContainer>
    </SLayout>
  );
};
export default NotificationItem;

const SLayout = styled.div`
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #d4d4d4;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 335px;
  height: 72px;
  gap: 10px;
  border-bottom: 1px solid var(--gray-100);
`;
const STextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;
const STextboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  gap: 4px;
  width: 268px;
  height: 22px;
  overflow: hidden;
`;
const SNameWrapper = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 40%;
`;
const SMessageWrapper = styled.div`
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50%;
`;
const STimeWrapper = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: var(--gray-500);
`;
