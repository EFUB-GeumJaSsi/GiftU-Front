import styled from 'styled-components';
import icn_birth from '../../assets/Friend/icn_birth.svg';
import btn_delete from '../../assets/Friend/btn_delete_friend.svg';

const HorizontalCard = ({ data = {} }) => {
  const { image, nickname, birthday } = data;

  return (
    <SLayout>
      <SImg src={image} />
      <STextContainer>
        <SB1>{nickname}</SB1>
        <SC1>{birthday}</SC1>
      </STextContainer>
      <SDeleteButton />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  width: 335px;
  height: 80px;
  padding: 12px 0 12px 16px;
  gap: 16px;

  border-radius: 10px;
  background-color: var(--gray-100);

  box-sizing: border-box;
`;
const SImg = styled.img`
  width: 56px;
  height: 56px;

  border-radius: 50%;
  background-color: #d9d9d9;
`;
const STextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  gap: 8px;
`;
const SB1 = styled.p`
  width: 200px;
  color: var(--black);
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const SC1 = styled.small`
  color: var(--gray-500);
  font-size: 12px;
  font-weight: 600;
  line-height: 120%;
  text-align: start;

  &::before {
    content: url(${icn_birth});
    vertical-align: middle;
    margin-right: 8px;
  }
`;
const SDeleteButton = styled.button`
  width: 28px;
  height: 36px;
  margin-left: auto;

  background-image: url(${btn_delete});
`;

export default HorizontalCard;
