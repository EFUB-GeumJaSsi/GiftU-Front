import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { arrayChop } from '../../components/common/CarouselComponent';
import CarouselComponent from '../../components/common/CarouselComponent';
import BottomSheetComponent from '../../components/common/BottomSheetComponent';
import Button from '../../components/common/Button';
import VerticalCard from '../../components/Friend/VerticalCard';
import HorizontalCard from '../../components/Friend/HorizontalCard';
import { ReactComponent as IcnUnion } from '../../assets/Friend/icn_union.svg';

// const data = null;
const data = [
  {
    nickname: '닉네임1',
    birthday: '3월 18일',
  },
  {
    nickname: '닉네임2',
    birthday: '5월 14일',
  },
  {
    nickname: '닉네임999999999999999999999999',
    birthday: '12월 21일',
  },
];

const FriendPage = () => {
  const chopedDataList = data && arrayChop(data, 2);
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  const inputRef = useRef(null);
  const [email, setEmail] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setEmail('');
  };

  // 바텀시트 렌더링 시 input 포커스
  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <SLayout>
      <SH1 as='header'>친구</SH1>
      {data && (
        <SSection>
          <ST1>나에게 선물한 친구</ST1>
          <CarouselComponent pageLength={chopedDataList.length} pageWidth={335}>
            {chopedDataList.map((item, index) => (
              <SPageContainer key={index}>
                <VerticalCard data={item[0]} />
                {index === chopedDataList.length - 1 &&
                data.length % 2 !== 0 ? (
                  <div style={{ visibility: 'hidden' }}>
                    <VerticalCard />
                  </div>
                ) : (
                  <VerticalCard data={item[1]} />
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
        {data ? (
          <SUl>
            {data.map((item, index) => (
              <li key={index}>
                <HorizontalCard data={item} />
              </li>
            ))}
          </SUl>
        ) : (
          <SGuideText>친구에게 초대 메시지를 보내보세요!</SGuideText>
        )}
      </SFriendSection>
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
                ref={inputRef}
                type='email'
                name='friend-email'
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <Button
                type='submit'
                btnInfo={
                  email ? { text: '완료', color: 'orange' } : { text: '완료' }
                }
              />
            </SForm>
          </SBottomSheetContainer>
        </BottomSheetComponent>
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
  line-height: 140%;
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
  height: 100vh;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 104px;
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

  gap: 32px;
`;
const STextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  width: 327px;
  gap: 12px;
`;
const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  width: fit-content;
  gap: 60px;
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
