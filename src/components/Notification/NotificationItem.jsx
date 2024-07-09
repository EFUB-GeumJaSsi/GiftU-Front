import React from 'react';
import styled from 'styled-components';

const NotificationItem = ({ image, name, message, time }) => {
  return (
    <ItemBox>
      <img src={image}></img>
      <TextBox>
        <Text>
          <Name>{name}</Name>
          <Message>{message}</Message>
        </Text>
        <Time>{time}</Time>
      </TextBox>
    </ItemBox>
  );
};
export default NotificationItem;

const ItemBox = styled.div`
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
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;
const Text = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  gap: 4px;
  width: 268px;
  height: 22px;
  overflow: hidden;
`;
const Time = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: var(--gray-500);
`;
const Name = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 40%;
`;
const Message = styled.div`
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50%;
`;
