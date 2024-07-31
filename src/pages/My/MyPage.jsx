import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavComponent from '../../components/common/NavComponent';
import profile from '../../assets/common/profile_default.svg';

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const onErrorImg = (e) => {
    e.target.src = profile;
  };

  const User = {
    id: '1',
    picture: '',
    nickName: '차니',
    friendsCount: '10',
  };

  useEffect(() => {
    setUser(User);
  }, []);

  const handleEdit = () => {
    navigate(`/edit/${user.id}`);
  };

  const handleFriendList = () => {
    navigate(`/friends/${user.id}`);
  };

  const handleMyOpenFunding = () => {
    navigate(`/myopenfunding/${user.id}`);
  };

  const handleMyJoinFunding = () => {
    navigate(`/myjoinfunding/${user.id}`);
  };

  const handleTutorial = () => {
    navigate(`/tutorial`);
  };
  const handleAccountDelete = () => {
    navigate(`/deleteaccount`);
  };

  return (
    <SLayout>
      <SHeader>마이</SHeader>
      <SProfileContainer>
        <SImageWrapper>
          <img src={user.picture} alt='userPicture' onError={onErrorImg} />
        </SImageWrapper>
        <SMyProfileContent>
          <SMyEditBtn onClick={handleEdit}>편집</SMyEditBtn>
          <SNameWrapper>
            <p>{user.nickName}</p>
          </SNameWrapper>
          <SMyFriendBtn onClick={handleFriendList}>
            친구
            <span>
              <span style={{ color: 'var(--jade-pri)' }}>
                {user.friendsCount}
              </span>
              명
            </span>
          </SMyFriendBtn>
        </SMyProfileContent>
      </SProfileContainer>

      <STextContainer>
        <SB3>펀딩</SB3>
        <SBtn onClick={handleMyOpenFunding}>내가 만든 펀딩</SBtn>
        <SBtn onClick={handleMyJoinFunding}>내가 참여한 펀딩</SBtn>
      </STextContainer>
      <SLine></SLine>
      <STextContainer>
        <SB3>튜토리얼</SB3>
        <SBtn onClick={handleTutorial}>튜토리얼 보기</SBtn>
      </STextContainer>
      <SDeleteAccountBtn onClick={handleAccountDelete}>
        회원탈퇴
      </SDeleteAccountBtn>
      <NavComponent />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: start;

  width: fit-content;
  padding: 40px 20px 128px 20px;
  gap: 24px;

  background-color: var(--gray-100);
`;
const SHeader = styled.header`
  width: fit-content;

  color: var(--black);
  font-size: 22px;
  font-weight: 700;
  line-height: 140%;
`;
const SProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  width: 335px;
  height: 195px;
  margin-bottom: 16px;
`;
const SImageWrapper = styled.div`
  position: absolute;
  z-index: 11;

  width: 96px;
  height: 96px;

  border-radius: 50%;
`;
const SMyProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 48px;
  z-index: 10;

  width: 100%;
  height: 147px;

  border-radius: 16px;
  background-color: var(--white);
`;
const SMyEditBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  right: 20px;

  width: 45px;
  height: 26px;
  padding: 6px 12px;

  border-radius: 20px;
  background-color: var(--gray-300);

  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
`;
const SNameWrapper = styled.div`
  margin-top: 56px;
`;
const SMyFriendBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 16px;
  padding: 8px 16px;
  gap: 8px;

  border-radius: 20px;
  border: 1px solid var(--gray-100);

  p {
    color: var(--jade-pri);
  }
`;
const STextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  margin-left: 8px;
  gap: 24px;
`;
const SB3 = styled.p`
  color: var(--gray-400);
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
`;
const SBtn = styled.button`
  width: fit-content;

  color: var(--black);
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
`;
const SLine = styled.div`
  width: 335px;
  height: 1px;

  background-color: var(--gray-200);
`;
const SDeleteAccountBtn = styled.button`
  margin: 90px 0 0 8px;

  color: var(--gray-400);
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
  text-decoration-line: underline;
`;

export default MyPage;
