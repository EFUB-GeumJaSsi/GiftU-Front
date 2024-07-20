import styled from 'styled-components';
import BackHeader from '../../components/common/BackHeader';
import BottomBackground from '../../components/common/BottomBackground';
import Button from '../../components/common/Button';
import { ReactComponent as IcnGift } from '../../assets/FungingOpen/icn_gift.svg';

const CompletePage = () => {
  return (
    <SLayout>
      <BackHeader />
      <SMain>
        <IcnGift />
        <SH3>펀딩 개설이 완료되었어요!</SH3>
        <SB2>
          {'내가 만든 펀딩은\n[마이]-[내가 만든 펀딩]에서\n확인할 수 있어요'}
        </SB2>
      </SMain>
      <BottomBackground
        Button={
          <Button
            btnInfo={{ text: '홈으로 돌아가기', color: 'orange', onClick: '' }}
          />
        }
      />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;

  height: 100vh;
`;
const SMain = styled.main`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  gap: 24px;

  transform: translateY(-72px);
`;
const SH3 = styled.h3`
  color: var(--black);
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;
`;
const SB2 = styled.p`
  color: var(--gray-500);
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  white-space: pre-line;
  text-align: center;
`;

export default CompletePage;
