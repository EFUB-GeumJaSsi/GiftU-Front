import styled from 'styled-components';
import { B1, B3 } from '../../styles/font';
import icn_profile_default from '../../assets/common/profile_default.svg';

const VerticalCard = ({ data = { nickname, birthday, userImageUrl } }) => {
  const image = data.userImageUrl || icn_profile_default;

  return (
    <SLayout>
      <SImg src={image} />
      <SNicknameSpan>{data.nickname}</SNicknameSpan>
      <SBirthdaySpan>{data.birthday}</SBirthdaySpan>
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
const SNicknameSpan = styled.span`
  overflow: hidden;

  width: 80px;

  ${B1}
  color: var(--black);
  white-space: nowrap;
  text-align: center;
  text-overflow: ellipsis;
`;
const SBirthdaySpan = styled.span`
  ${B3}
  color: var(--gray-500);
`;

export default VerticalCard;
