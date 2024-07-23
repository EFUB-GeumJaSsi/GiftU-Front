import styled from 'styled-components';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import { ReactComponent as GiftIcon } from '../../assets/FundingJoin/gift_icon.svg';

const CompletePage = () => {
  const Btn = (
    <ButtonComponent btnInfo={{ text: '홈으로 돌아가기', color: 'orange' }} />
  );

  return (
    <>
      <BackHeaderComponent />
      <SLayout>
        <GiftIcon />
        <STextContainer>
          <SBigTextWrapper>펀딩 참여가 완료되었어요!</SBigTextWrapper>
          <SSmallTextWrapper>
            {
              '내가 참여한 펀딩은\n[마이]-[내가 참여한 펀딩]에서\n확인할 수 있어요'
            }
          </SSmallTextWrapper>
        </STextContainer>
      </SLayout>
      <BottomBackgroundComponent Button={Btn} />
    </>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: center;
  align-items: center;

  height: 80vh;
`;
const STextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
`;
const SBigTextWrapper = styled.span`
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;
`;
const SSmallTextWrapper = styled.p`
  color: var(--gray-500);
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  white-space: pre-line;
`;

export default CompletePage;
