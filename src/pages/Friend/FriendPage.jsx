import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { arrayChop } from '../../components/common/CarouselComponent';
import {
  postFriendRequest,
  getFriendList,
  getFriendParticipatedList,
} from '../../api/friend.js';
import CarouselComponent from '../../components/common/CarouselComponent';
import BottomSheetComponent from '../../components/common/BottomSheetComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import ToastComponent from '../../components/common/ToastComponent.jsx';
import VerticalCard from '../../components/Friend/VerticalCard';
import HorizontalCard from '../../components/Friend/HorizontalCard';
import { ReactComponent as IcnUnion } from '../../assets/Friend/icn_union.svg';
import NavComponent from '../../components/common/NavComponent.jsx';

const FriendPage = () => {
  // 친구 페이지 데이터
  const [friendList, setFriendList] = useState([]);
  const [carouselFriendList, setCarouselFriendList] = useState([]);
  const chopedCarouselFriendList = arrayChop(carouselFriendList, 2).slice(0, 3);
  // 바텀시트 관련
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  const [email, setEmail] = useState('');
  // 토스트 관련
  const [toastShow, setToastShow] = useState(false);
  const [toastContent, setToastContent] = useState(null);

  // API 연결
  const readFriendList = async () => {
    try {
      const response = await getFriendList();
      setFriendList(response.data.friends);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const readCarouselFriendList = async () => {
    try {
      const response = await getFriendParticipatedList();
      setCarouselFriendList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const createFriendRequest = async (email) => {
    try {
      const response = await postFriendRequest(email);
      setToastContent('친구 요청이 전송되었습니다.');
    } catch (error) {
      console.error(error);
      // 에러 코드에 따라 토스트 에러 메시지 설정
      // setToastContent('');
    }
  };
  // handle 함수
  const handleFormSubmit = (event) => {
    event.preventDefault();
    createFriendRequest(email);
    setToastShow(true);
    setEmail('');
  };

  // 최초 렌더링 시 데이터 read
  useEffect(() => {
    readFriendList();
    readCarouselFriendList();
  }, []);

  return (
    <SLayout>
      <SH1 as='header'>친구</SH1>
      {carouselFriendList.length > 0 && (
        <SSection>
          <ST1>최근 내 펀딩에 참여한 친구</ST1>
          <CarouselComponent
            pageLength={chopedCarouselFriendList.length}
            pageWidth={335}
          >
            {chopedCarouselFriendList.map((item, index) => (
              <SPageContainer key={index}>
                <VerticalCard
                  friendId={item[0].friendId}
                  nickname={item[0].nickname}
                  birthday={item[0].birthday}
                  image={item[0].userImageUrl}
                />
                {index === chopedCarouselFriendList.length - 1 &&
                carouselFriendList.length % 2 !== 0 ? (
                  <div style={{ visibility: 'hidden' }}>
                    <VerticalCard />
                  </div>
                ) : (
                  <VerticalCard
                    friendId={item[1].friendId}
                    nickname={item[1].nickname}
                    birthday={item[1].birthday}
                    image={item[1].userImageUrl}
                  />
                )}
              </SPageContainer>
            ))}
          </CarouselComponent>
        </SSection>
      )}
      <SFriendSection>
        <STopContainer>
          <ST1>내 친구</ST1>
          <SAddBtn
            onClick={() => {
              setBottomSheetShow(true);
            }}
          >
            <IcnUnion />
            친구 추가
          </SAddBtn>
        </STopContainer>
        {friendList.length ? (
          <SUl>
            {friendList.map((item, index) => (
              <li key={index}>
                <HorizontalCard
                  friendId={item.friendId}
                  nickname={item.nickname}
                  birthday={item.birthday}
                  image={item.userImageUrl}
                />
              </li>
            ))}
          </SUl>
        ) : (
          <SGuideText>친구에게 초대 메시지를 보내보세요!</SGuideText>
        )}
      </SFriendSection>
      <NavComponent />
      {bottomSheetShow && (
        <BottomSheetComponent
          closeButton='cross'
          setBottomSheetShow={setBottomSheetShow}
        >
          <SBottomSheetContainer>
            <STextContainer>
              <SH3>친구 추가</SH3>
              <SB3>친구의 이메일 주소를 입력해 주세요</SB3>
            </STextContainer>
            <SForm onSubmit={handleFormSubmit}>
              <SInput
                type='email'
                name='friend-email'
                value={email}
                required
                autoFocus
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <ButtonComponent
                type='submit'
                btnInfo={
                  email ? { text: '완료', color: 'orange' } : { text: '완료' }
                }
                disabled={!email}
              />
            </SForm>
          </SBottomSheetContainer>
        </BottomSheetComponent>
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
const SH1 = styled.h1`
  color: var(--black);
  font-size: 22px;
  font-weight: 700;
  line-height: 140%;
`;
const SH3 = styled.h3`
  color: var(--black);
  font-size: 20px;
  font-weight: 600;
`;
const ST1 = styled.h1`
  color: var(--black);
  font-size: 17px;
  font-weight: 700;
  line-height: 120%;
`;
const SB1 = styled.p`
  color: var(--gray-500);
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;
const SB3 = styled.p`
  color: var(--gray-500);
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
`;

// 스타일 컴포넌트
const SLayout = styled.div`
  display: flex;
  overflow-x: hidden;
  flex-flow: column nowrap;

  width: 335px;
  height: 100%;
  margin: 0 auto;
  padding: 40px 0 128px;
  gap: 24px;

  box-sizing: border-box;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const SSection = styled.section`
  display: flex;
  flex-flow: column nowrap;

  gap: 16px;
`;
const SPageContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;

  gap: 15px;
`;
const SFriendSection = styled(SSection)`
  flex-grow: 1;
`;
const STopContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;
const SAddBtn = styled.button`
  border-radius: 20px;
  background-color: var(--jade-pri);

  color: var(--white);
  font-size: 12px;
  font-weight: 600;
  line-height: 120%;

  padding: 8px 12px 8px 8px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
`;
const SUl = styled.ul`
  display: flex;
  flex-flow: column nowrap;

  gap: 16px;
`;
const SGuideText = styled(SB1)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
const SBottomSheetContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  padding: 26px 20px 24px;
  gap: 32px;
`;
const STextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-self: flex-start;

  margin-left: 4px;
  gap: 12px;
`;
const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  gap: 80px;
`;
const SInput = styled.input`
  width: 327px;
  height: 64px;
  padding: 21px 20px;

  border-radius: 16px;
  background: var(--gray-100);

  box-sizing: border-box;
`;

export default FriendPage;
