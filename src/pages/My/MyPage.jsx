import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavComponent from '../../components/common/NavComponent';
import profile from '../../assets/My/icn_profile.svg';

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
      <SHeader>
        <p>마이</p>
      </SHeader>
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
        <h5>펀딩</h5>
        <SBtn onClick={handleMyOpenFunding}>내가 만든 펀딩</SBtn>
        <SBtn onClick={handleMyJoinFunding}>내가 참여한 펀딩</SBtn>
      </STextContainer>
      <SLine></SLine>
      <STextContainer>
        <h5>튜토리얼</h5>
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
  overflow: hidden;
  flex-direction: column;
  align-items: center;

  height: 812px;

  background-color: var(--gray-100);
`;
const SHeader = styled.header`
  display: block;
  align-self: flex-start;
  margin: 43px 0 24px 28px;

  p {
    color: var(--black);
    font-size: 22px;
    font-weight: 700;
    line-height: 140%;
  }
`;
const SProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  width: 335px;
  height: 195px;
  margin-bottom: 39px;
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
  background: white;
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
  gap: 8px;

  border-radius: 20px;
  background: var(--gray-300);

  font-size: 12px;
  font-style: normal;
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
  flex-direction: column;

  width: 335px;
  padding: 0px 8px;
  gap: 24px;

  h5 {
    color: var(--gray-400);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
  }
`;
const SBtn = styled.button`
  align-self: flex-start;

  color: var(--black);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;
const SLine = styled.div`
  width: 335px;
  height: 1px;

  margin-top: 20px;
  margin-bottom: 20px;

  background-color: var(--gray-200);
`;
const SDeleteAccountBtn = styled.button`
  align-self: flex-start;

  margin-top: 90px;
  margin-left: 20px;
  padding: 8px;
  gap: 8px;

  color: var(--gray-400);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-decoration-line: underline;
`;

export default MyPage;
