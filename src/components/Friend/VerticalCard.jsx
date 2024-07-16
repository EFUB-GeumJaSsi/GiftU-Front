import styled from 'styled-components';

const VerticalCard = ({ data = {} }) => {
  const { image, nickname, birthday } = data;

  return (
    <SLayout>
      <SImg src={image} />
      <SB1>{nickname}</SB1>
      <SB3>{birthday}</SB3>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  width: 160px;
  height: 184px;
  padding: 20px 40px;
  gap: 8px;

  border-radius: 16px;
  background-color: var(--gray-100);

  box-sizing: border-box;
`;
const SImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin-bottom: 8px;
`;
const SB1 = styled.p`
  width: 80px;
  overflow: hidden;
  text-align: center;
  color: var(--black);
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const SB3 = styled.p`
  color: var(--gray-500);
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
`;

export default VerticalCard;
