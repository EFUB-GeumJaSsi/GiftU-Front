import styled from 'styled-components';
import { H1, H3, T1, B1, B3, C1 } from '../../styles/font';
import { useState, useEffect } from 'react';
import {
  postFriendRequest,
  getFriendList,
  getFriendParticipatedList,
} from '../../api/friend.js';
import NavComponent from '../../components/common/NavComponent';
import CarouselComponent from '../../components/common/CarouselComponent';
import BottomSheetComponent from '../../components/common/BottomSheetComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import ToastComponent from '../../components/common/ToastComponent';
import VerticalCard from '../../components/Friend/VerticalCard';
import HorizontalCard from '../../components/Friend/HorizontalCard';
import { ReactComponent as IcnUnion } from '../../assets/Friend/icn_union.svg';

const FriendPage = () => {
  // 친구 페이지 데이터
  const [friendList, setFriendList] = useState([]);
  const [carouselFriendList, setCarouselFriendList] = useState([]);
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
      const arr = response.data.slice(0, 6);
      if (arr.length % 2 != 0) arr.push({});
      setCarouselFriendList(arr);
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
      <SHeader>친구</SHeader>
      {carouselFriendList.length > 0 && (
        <SSection>
          <SH1>최근 내 펀딩에 참여한 친구</SH1>
          <CarouselComponent
            pageLength={carouselFriendList.length / 2}
            pageWidth={335}
          >
            <SCarouselUl>
              {carouselFriendList.map((item, index) => (
                <li key={index}>
                  {item.userId ? <VerticalCard data={item} /> : <></>}
                </li>
              ))}
            </SCarouselUl>
          </CarouselComponent>
        </SSection>
      )}
      <SFriendSection>
        <STopContainer>
          <SH1>내 친구</SH1>
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
          <SFriendsUl>
            {friendList.map((item, index) => (
              <li key={index}>
                <HorizontalCard data={item} />
              </li>
            ))}
          </SFriendsUl>
        ) : (
          <SEmptyP>친구에게 초대 메시지를 보내보세요!</SEmptyP>
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
              <SH2>친구 추가</SH2>
              <SRequestP>친구의 이메일 주소를 입력해 주세요</SRequestP>
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
`;
const SHeader = styled.header`
  ${H1}
  color: var(--black);
`;
const SSection = styled.section`
  display: flex;
  flex-flow: column nowrap;

  gap: 16px;
`;
const SH1 = styled.h1`
  ${T1}
  color: var(--black);
`;
const SCarouselUl = styled.ul`
  display: flex;
  flex-flow: row nowrap;

  li:nth-child(odd) {
    margin-right: 15px;
  }

  li:nth-child(even) {
    margin-right: 0;
  }

  li:last-child {
    width: 160px;
    height: 184px;
  }
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

  ${C1}
  color: var(--white);

  padding: 8px 12px 8px 8px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
`;
const SFriendsUl = styled.ul`
  display: flex;
  flex-flow: column nowrap;

  gap: 16px;
`;
const SEmptyP = styled.p`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  ${B1}
  color: var(--gray-500);
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
const SH2 = styled.h2`
  ${H3}
  color: var(--black);
`;
const SRequestP = styled.p`
  ${B3}
  color: var(--gray-500);
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
