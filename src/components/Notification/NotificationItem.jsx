import React from 'react';
import styled from 'styled-components';

const NotificationItem = ({ name, message, time }) => {
  return (
    <ItemBox>
      <svg
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          x='0.5'
          y='0.5'
          width='39'
          height='39'
          rx='19.5'
          fill='#D4D4D4'
          stroke='#F3F4F5'
        />
      </svg>
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
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 335px;
  height: 72px;
  padding-left: 8px;
  border: 0px 0px 1px 9px;
  border-bottom: 1px solid #f3f4f5;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding-top: 2px;
`;
const Text = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  padding-left: 10px;
  gap: 4px;
  width: 268px;
  height: 22px;
  overflow: hidden;
`;
const Time = styled.div`
  padding-left: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #909294;
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
