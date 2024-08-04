import styled from 'styled-components';
import { B1, C1, C2 } from '../../styles/font';
import { useState } from 'react';
import { deleteFriendItem } from '../../api/friend';
import BottomModalComponent from '../../components/common/BottomModalComponent';
import ModalComponent from '../common/ModalComponent';
import ToastComponent from '../common/ToastComponent';
import icn_profile_default from '../../assets/common/profile_default.svg';
import icn_birth from '../../assets/Friend/icn_birth.svg';
import btn_delete from '../../assets/Friend/btn_delete_friend.svg';
import icn_info from '../../assets/Friend/icn_info.svg';

const HorizontalCard = ({
  data = { friendId, nickname, birthday, userImageUrl },
}) => {
  const image = data.userImageUrl || icn_profile_default;

  const [bottomModalShow, setBottomModalShow] = useState(false);
  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastContent, setToastContent] = useState(null);

  // API 연결
  const delFriend = async (friendId) => {
    try {
      const response = await deleteFriendItem(friendId);
      setToastContent(response.data);
      setTimeout(() => location.reload(true), 2000);
    } catch (error) {
      console.error(error);
      // 에러 코드에 따라 토스트 에러 메시지 설정
      // setToastContent('');
    }
  };
  // handle 함수
  const handleBottomModalClose = () => {
    setBottomModalOpen(false); // 바텀모달 닫기 애니메이션 효과
    setTimeout(() => setBottomModalShow(false), 300); // 애니메이션 후 언마운트
  };
  const handleDeleteClick = () => {
    delFriend(data.friendId);
    setToastShow(true);
  };

  return (
    <SLayout>
      <SImg src={image} />
      <STextContainer>
        <SNicknameSpan>{data.nickname}</SNicknameSpan>
        <SBirthdaySpan>{data.birthday}</SBirthdaySpan>
      </STextContainer>
      <SMenuBtn
        onClick={() => {
          setBottomModalShow(true);
          setBottomModalOpen(true);
        }}
      />
      {bottomModalShow && (
        <BottomModalComponent
          setBottomModalShow={setBottomModalShow}
          parentOpen={bottomModalOpen}
        >
          <SBtnContainer>
            <SDeleteBtn
              onClick={() => {
                handleBottomModalClose();
                setModalShow(true);
              }}
            >
              삭제하기
            </SDeleteBtn>
            <SCancelBtn onClick={handleBottomModalClose}>취소</SCancelBtn>
          </SBtnContainer>
        </BottomModalComponent>
      )}
      {modalShow && (
        <ModalComponent
          actionText='삭제하기'
          onClickAction={handleDeleteClick}
          setModalShow={setModalShow}
        >
          <SModalContainer>
            <SInfoContainer>
              <SImg src={image} />
              <SModalNicknameSpan>{data.nickname}</SModalNicknameSpan>
            </SInfoContainer>
            <SWarnContainer>
              <SWarnH2>친구를 삭제하시겠어요?</SWarnH2>
              <SWarnP>친구와 주고받은 선물 기록이 사라져요.</SWarnP>
              <SWarnP>나중에 다시 친구로 추가할 수 있어요.</SWarnP>
            </SWarnContainer>
          </SModalContainer>
        </ModalComponent>
      )}
      {toastShow && (
        <ToastComponent setToastShow={setToastShow}>
          {toastContent}
        </ToastComponent>
      )}
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

  object-fit: cover;
`;
const STextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  gap: 8px;
`;
const SNicknameSpan = styled.span`
  overflow: hidden;

  width: 200px;

  ${B1}
  color: var(--black);
  text-overflow: ellipsis;

  white-space: nowrap;
`;
const SBirthdaySpan = styled.span`
  text-align: start;

  ${C1}
  color: var(--gray-500);

  &::before {
    content: url(${icn_birth});
    vertical-align: middle;
    margin-right: 8px;
  }
`;
const SMenuBtn = styled.button`
  width: 28px;
  height: 36px;
  margin-left: auto;

  background-image: url(${btn_delete});
`;
const SBtnContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  margin-bottom: 24px;
  gap: 16px;
`;
const SHorizontalBtn = styled.button`
  width: 335px;
  height: 64px;

  border-radius: 16px;

  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;
const SDeleteBtn = styled(SHorizontalBtn)`
  background-color: rgba(255, 255, 255, 0.8);

  color: var(--red);
`;
const SCancelBtn = styled(SHorizontalBtn)`
  background-color: var(--white);

  color: var(--black);
`;
const SModalContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  padding: 24px 0 16px 0;
  gap: 16px;
`;
const SInfoContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  gap: 8px;
`;
const SModalNicknameSpan = styled(SNicknameSpan)`
  text-align: center;
  width: 160px;
  color: var(--gray-500);
`;
const SWarnContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  gap: 8px;
`;
const SWarnH2 = styled.h2`
  text-align: center;
  ${B1}
`;
const SWarnP = styled.p`
  ${C2}
  color: var(--gray-500);

  &::before {
    content: url(${icn_info});
    vertical-align: text-top;
    margin-right: 4px;
  }
`;

export default HorizontalCard;
