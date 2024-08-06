function formatDate(dateStr) {
  if (!dateStr) {
    return '생일 정보 없음';
  } else {
    const dateObj = new Date(dateStr);

    const month = dateObj.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = dateObj.getDate();

    return `${month}월 ${day}일`;
  }
}

import styled from 'styled-components';
import { B1, B3 } from '../../styles/font';
import icn_profile_default from '../../assets/common/profile_default.svg';

const VerticalCard = ({ data = { nickname, birthday, userImageUrl } }) => {
  const image = data.userImageUrl || icn_profile_default;

  return (
    <SLayout>
      <SImg src={image} />
      <SNicknameSpan>{data.nickname}</SNicknameSpan>
      <SBirthdaySpan>{formatDate(data.birthday)}</SBirthdaySpan>
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
  margin-bottom: 8px;

  border-radius: 50%;
  background-color: #d9d9d9;

  object-fit: cover;
  // 드래그 방지
  -webkit-user-drag: none;
  -moz-user-drag: none;
  -ms-user-drag: none;
  user-drag: none;
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
export { formatDate };
