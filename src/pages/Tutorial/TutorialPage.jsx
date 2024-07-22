import styled from 'styled-components';
import BackHeader from '../../components/common/BackHeader';
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
    <SLayout>
      <BackHeader text='튜토리얼' />
      <SMakeFundingContainer>
        <STopTitleWrapper>펀딩 만들기</STopTitleWrapper>
        <SContentboxContainer>
          <STitleBoxContainer>
            <SNumWrapper>01</SNumWrapper>
            <STitleWrapper>원하는 선물 선택하기</STitleWrapper>
          </STitleBoxContainer>
          <SExplainBoxWrapper>
            <SExplainWrapper>
              금액대별로 원하는 선물을 추가할 수 있어요
            </SExplainWrapper>
          </SExplainBoxWrapper>
          <SSubContentContainer>
            <Slider></Slider>
          </SSubContentContainer>
        </SContentboxContainer>
        <SContentboxContainer>
          <STitleBoxContainer>
            <SNumWrapper>02</SNumWrapper>
            <STitleWrapper>펀딩 소개하기</STitleWrapper>
          </STitleBoxContainer>
          <SExplainBoxWrapper>
            <SExplainWrapper>
              펀딩의 이름을 짓고, 펀딩을 소개해 주세요
            </SExplainWrapper>
          </SExplainBoxWrapper>
          <SSubContentContainer>
            <SSecond1Wrapper>민지 생일선물 사주기</SSecond1Wrapper>
            <SSecond2Wrapper>나한테 필요한 건 바로 "에어팟"</SSecond2Wrapper>
          </SSubContentContainer>
        </SContentboxContainer>
        <SContentboxContainer>
          <STitleBoxContainer>
            <SNumWrapper>03</SNumWrapper>
            <STitleWrapper>펀딩 기간과 배송지 입력하기</STitleWrapper>
          </STitleBoxContainer>
          <SExplainBoxWrapper>
            <SExplainWrapper>
              펀딩 마감일과 배송지를 입력해 주세요
            </SExplainWrapper>
          </SExplainBoxWrapper>
          <SContainer>
            <SSmallSubContainer>2024.07.12</SSmallSubContainer>
            <SSmallSubContainer style={{ color: 'var(--gray-400)' }}>
              펀딩 마감일 <Calendar></Calendar>
            </SSmallSubContainer>
          </SContainer>
        </SContentboxContainer>
        <SContentboxContainer>
          <STitleBoxContainer>
            <SNumWrapper>04</SNumWrapper>
            <STitleWrapper>펀딩 공개여부 설정하기</STitleWrapper>
          </STitleBoxContainer>
          <SExplainBoxWrapper>
            <SExplainWrapper>
              원하는 친구들에게만 펀딩을 공유할 수 있어요
            </SExplainWrapper>
          </SExplainBoxWrapper>
          <SSubContentContainer
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: '11px',
            }}
          >
            <OpenLock></OpenLock>
            <SFourthTextWrapper>모두에게 공개</SFourthTextWrapper>
            <div style={{ gap: '10px' }}></div>
            <ClosedLock></ClosedLock>
            <SFourthTextWrapper>친구에게 공개</SFourthTextWrapper>
          </SSubContentContainer>
        </SContentboxContainer>
      </SMakeFundingContainer>
      <SMiddleContainer>
        <Present></Present>
      </SMiddleContainer>
      <SJoinFundingContainer>
        <STopTitleWrapper>펀딩 참여하기</STopTitleWrapper>
        <SContentboxContainer>
          <STitleBoxContainer>
            <SNumWrapper style={{ color: 'var(--orange-pri)' }}>01</SNumWrapper>
            <STitleWrapper>참여할 금액 입력하기</STitleWrapper>
          </STitleBoxContainer>
          <SExplainBoxWrapper>
            <SExplainWrapper>
              펀딩 달성까지 남은 금액을 확인하고<br></br>
              원하는 금액만큼 펀딩에 참여할 수 있어요
            </SExplainWrapper>
          </SExplainBoxWrapper>
          <SSubContentContainer>
            <SBoldWrapper>60% 달성</SBoldWrapper>
            <STextWrapper>
              100% 달성까지{' '}
              <span style={{ color: 'var( --black)' }}>84000원 </span>남았어요!
            </STextWrapper>
            <Slider2></Slider2>
            <SPriceBtnContainer>
              가격대별 선물 보기<span style={{ padding: '4px' }}></span>
              <Drop></Drop>
            </SPriceBtnContainer>
          </SSubContentContainer>
        </SContentboxContainer>
        <SContentboxContainer>
          <STitleBoxContainer>
            <SNumWrapper style={{ color: 'var(--orange-pri)' }}>02</SNumWrapper>
            <STitleWrapper>펀딩 소개하기</STitleWrapper>
          </STitleBoxContainer>
          <SExplainBoxWrapper>
            <SExplainWrapper>
              메세지는 닉네임, 익명으로 전달할 수 있어요
            </SExplainWrapper>
          </SExplainBoxWrapper>
          <SSubContentContainer>
            <STextWrapper>둥둥</STextWrapper>민지~~생일 축하해!!
          </SSubContentContainer>
        </SContentboxContainer>
        <SLogoWrapper>
          <Logo></Logo>
        </SLogoWrapper>
      </SJoinFundingContainer>
    </SLayout>
  );
};
export default TutorialPage;

const SLayout = styled.div``;
const SMakeFundingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  height: 844px;
  margin-top: 13px;

  background-color: var(--gray-100);
`;
const STopTitleWrapper = styled.div`
  align-self: flex-start;

  margin-left: 20px;
  padding-top: 20px;

  font-size: 20px;
  font-weight: 700;
`;
const SContentboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  width: 344px;
`;
const STitleBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  height: 22px;
  padding: 0px 8px 0px 8px;
`;
const SNumWrapper = styled.header`
  font-weight: 700;
  font-size: 17px;
  color: var(--jade-pri);
`;
const STitleWrapper = styled.div`
  font-weight: 600;
  font-size: 16px;
`;
const SExplainBoxWrapper = styled.div`
  display: flex;
  padding: 0px 36px 0px 36px;
  gap: 8px;

  width: 307px;

  line-height: 19px;
`;
const SExplainWrapper = styled.div`
  margin-bottom: 5px;

  font-weight: 500;
  font-size: 14px;
  color: var(--gray-500);
`;

const SSubContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  padding: 20px;

  border-radius: 20px;
  background-color: var(--white);
`;
const SSecond1Wrapper = styled.div`
  font-weight: 700;
  font-size: 20px;
`;
const SSecond2Wrapper = styled.div`
  font-weight: 500;
  font-size: 14px;
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
const SSmallSubContainer = styled.div`
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
  font-weight: 500;
  font-size: 12px;
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
  font-weight: 700;
  font-size: 17px;
`;
const STextWrapper = styled.div`
  font-weight: 500;
  font-size: 14px;
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
