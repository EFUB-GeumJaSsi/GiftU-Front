import styled from 'styled-components';
import { H2, B3, C2, T1 } from '../../styles/font';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import TitleDescription from '../../components/Tutorial/TitleDescription';
import { ReactComponent as Present } from '../../assets/Tutorial/present.svg';
import { ReactComponent as Slider } from '../../assets/Tutorial/fnd_slider.svg';
import { ReactComponent as OpenLock } from '../../assets/Tutorial/icon_pw_no.svg';
import { ReactComponent as ClosedLock } from '../../assets/Tutorial/icon_pw_yes.svg';
import { ReactComponent as Slider2 } from '../../assets/Tutorial/fnd_slider2.svg';
import { ReactComponent as Logo } from '../../assets/Tutorial/logo.svg';
import { ReactComponent as Drop } from '../../assets/Tutorial/btn_drop.svg';
import { ReactComponent as Calendar } from '../../assets/common/calendar.svg';

const TutorialPage = () => {
  return (
    <>
      <BackHeaderComponent text='튜토리얼' />
      <SMakeFundingContainer>
        <SCategoryWrapper>펀딩 만들기</SCategoryWrapper>
        <TitleDescription
          color='jade'
          num='01'
          title='원하는 선물 선택하기'
          description='금액대별로 원하는 선물을 추가할 수 있어요'
          component={() => (
            <SWhiteContainer>
              <Slider />
            </SWhiteContainer>
          )}
        ></TitleDescription>
        <TitleDescription
          color='jade'
          num='02'
          title='펀딩 소개하기'
          description='펀딩의 이름을 짓고, 펀딩을 소개해 주세요'
          component={() => (
            <SWhiteContainer>
              <SSecond1Wrapper>민지 생일선물 사주기</SSecond1Wrapper>
              <SSecond2Wrapper>나한테 필요한 건 바로 "에어팟"</SSecond2Wrapper>
            </SWhiteContainer>
          )}
        ></TitleDescription>
        <TitleDescription
          color='jade'
          num='03'
          title='펀딩 기간과 배송지 입력하기'
          description='펀딩 마감일과 배송지를 입력해 주세요'
          component={() => (
            <SContainer>
              <SDateContainer>2024.07.12</SDateContainer>
              <SDateContainer style={{ color: 'var(--gray-400)' }}>
                펀딩 마감일 <Calendar />
              </SDateContainer>
            </SContainer>
          )}
        ></TitleDescription>
        <TitleDescription
          color='jade'
          num='04'
          title='펀딩 공개여부 설정하기'
          description='원하는 친구들에게만 펀딩을 공유할 수 있어요'
          component={() => (
            <SWhiteContainer
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: '11px',
              }}
            >
              <OpenLock />
              <SFourthTextWrapper>모두에게 공개</SFourthTextWrapper>
              <ClosedLock />
              <SFourthTextWrapper>친구에게 공개</SFourthTextWrapper>
            </SWhiteContainer>
          )}
        ></TitleDescription>
      </SMakeFundingContainer>
      <SMiddleContainer>
        <Present />
      </SMiddleContainer>
      <SJoinFundingContainer>
        <SCategoryWrapper>펀딩 참여하기</SCategoryWrapper>
        <TitleDescription
          color='orange'
          num='01'
          title='참여할 금액 입력하기'
          description='펀딩 달성까지 남은 금액을 확인하고
              원하는 금액만큼 펀딩에 참여할 수 있어요'
          component={() => (
            <SWhiteContainer>
              <SBoldWrapper>60% 달성</SBoldWrapper>
              <STextWrapper>
                100% 달성까지
                <span style={{ color: 'var( --black)' }}>84000원 </span>
                남았어요!
              </STextWrapper>
              <Slider2></Slider2>
              <SPriceBtnContainer>
                가격대별 선물 보기
                <Drop />
              </SPriceBtnContainer>
            </SWhiteContainer>
          )}
        ></TitleDescription>
        <TitleDescription
          color='orange'
          num='02'
          title='펀딩 소개하기'
          description='메세지는 닉네임, 익명으로 전달할 수 있어요'
          component={() => (
            <SWhiteContainer>
              <STextWrapper>둥둥</STextWrapper>민지~~생일 축하해!!
            </SWhiteContainer>
          )}
        ></TitleDescription>
        <SLogoWrapper>
          <Logo />
        </SLogoWrapper>
      </SJoinFundingContainer>
    </>
  );
};

const SMakeFundingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  height: 844px;
  margin-top: 13px;

  background-color: var(--gray-100);
`;
const SCategoryWrapper = styled.div`
  align-self: flex-start;

  margin-left: 20px;
  padding-top: 20px;

  ${H2}
`;
const SWhiteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  padding: 20px;

  border-radius: 20px;
  background-color: var(--white);
`;
const SSecond1Wrapper = styled.div`
  ${H2}
`;
const SSecond2Wrapper = styled.div`
  ${B3}
  color: var(--gray-400);
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;

  width: 335px;
  height: 64px;
  padding: 0px 8px 0px 8px;
`;
const SDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 17px;

  width: 160px;
  height: 64px;

  border-radius: 20px;
  background-color: var(--white);
`;
const SFourthTextWrapper = styled.div`
  ${C2}
  color: var(--gray-500);
`;
const SMiddleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 80px;
`;
const SJoinFundingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 12px;

  height: 796px;
  margin-top: 13px;

  background-color: var(--gray-100);
`;
const SBoldWrapper = styled.div`
  ${T1}
`;
const STextWrapper = styled.div`
  ${B3}
  color: var(--gray-500);
`;
const SPriceBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;

  width: 152px;
  height: 33px;

  border: 1px solid var(--gray-100);
  border-radius: 20px;

  color: var(--gray-400);
  font-size: 14px;
`;
const SLogoWrapper = styled.div`
  padding: 40px;
`;

export default TutorialPage;
