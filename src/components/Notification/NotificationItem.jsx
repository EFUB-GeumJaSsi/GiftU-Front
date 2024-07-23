import styled from 'styled-components';

const NotificationItem = ({ image, name, message, time, onClick }) => {
  return (
    <SLayout onClick={onClick}>
      <SImg src={image} />
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

const SLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  width: 335px;
  height: 72px;

  border-bottom: 1px solid var(--gray-100);

  cursor: pointer;
`;
const SImg = styled.img`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background-color: #d4d4d4;
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
  gap: 4px;

  width: 268px;
  height: 22px;

  font-size: 16px;

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
  max-width: 50%;

  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;

  overflow: hidden;
`;
const STimeWrapper = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: var(--gray-500);
`;

export default NotificationItem;
