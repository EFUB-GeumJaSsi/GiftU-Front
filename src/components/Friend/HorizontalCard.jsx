import styled from 'styled-components';
import { useState } from 'react';
import { deleteFriend } from '../../api/friend';
import BottomModalComponent from '../../components/common/BottomModalComponent';
import ModalComponent from '../common/ModalComponent';
import ToastComponent from '../common/ToastComponent';
import icn_birth from '../../assets/Friend/icn_birth.svg';
import btn_delete from '../../assets/Friend/btn_delete_friend.svg';
import icn_info from '../../assets/Friend/icn_info.svg';

const HorizontalCard = ({ friendId, nickname, birthday, image }) => {
  const [bottomModalShow, setBottomModalShow] = useState(false);
  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastContent, setToastContent] = useState(null);

  // API 연결
  const delFriend = async (friendId) => {
    try {
      const response = await deleteFriend(friendId);
      setToastContent(response.data);
      setTimeout(() => location.reload(true), 2000);
    } catch (error) {
      console.error(error);
      setToastContent(error);
    }
  };
  // handle 함수
  const handleBottomModalClose = () => {
    setBottomModalOpen(false); // 바텀모달 닫기 애니메이션 효과
    setTimeout(() => setBottomModalShow(false), 300); // 애니메이션 후 언마운트
  };
  const handleDeleteClick = () => {
    delFriend(friendId);
    setToastShow(true);
  };

  return (
    <SLayout>
      <SImg src={image} />
      <STextContainer>
        <SCardNickname>{nickname}</SCardNickname>
        <SCardBirthday>{birthday}</SCardBirthday>
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
              <SModalNickname>{nickname}</SModalNickname>
            </SInfoContainer>
            <SWarnContainer>
              <SWarnTitle>친구를 삭제하시겠어요?</SWarnTitle>
              <SWarnText>친구와 주고받은 선물 기록이 사라져요.</SWarnText>
              <SWarnText>나중에 다시 친구로 추가할 수 있어요.</SWarnText>
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

// 텍스트 스타일
const SB1 = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;
const SC1 = styled.small`
  font-size: 12px;
  font-weight: 600;
  line-height: 120%;
`;
const SC2 = styled.small`
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
`;

// 스타일 컴포넌트
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
const SCardNickname = styled(SB1)`
  overflow: hidden;

  width: 200px;

  color: var(--black);
  text-overflow: ellipsis;

  white-space: nowrap;
`;
const SCardBirthday = styled(SC1)`
  color: var(--gray-500);
  text-align: start;

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
const SModalNickname = styled(SB1)`
  overflow: hidden;
  text-align: center;

  width: 160px;

  color: var(--gray-500);
  text-overflow: ellipsis;

  white-space: nowrap;
`;
const SWarnContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  gap: 8px;
`;
const SWarnTitle = styled(SB1)`
  text-align: center;
`;
const SWarnText = styled(SC2)`
  color: var(--gray-500);

  &::before {
    content: url(${icn_info});
    vertical-align: text-top;
    margin-right: 4px;
  }
`;

export default HorizontalCard;
