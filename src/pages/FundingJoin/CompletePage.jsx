import styled from 'styled-components';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import CompletePageComponent from '../../components/common/CompletePageComponent';
import { ReactComponent as IcnGift } from '../../assets/FundingJoin/gift_icon.svg';

const CompletePage = () => {
  const Btn = (
    <ButtonComponent
      btnInfo={{ text: '홈으로 돌아가기', color: 'orange' }}
      onClick={window.location.replace('/')}
    />
  );

  return (
    <SLayout>
      <BackHeaderComponent />
      <CompletePageComponent
        Icon={IcnGift}
        heading='펀딩 참여가 완료되었어요!'
        paragraph={`내가 만든 펀딩은\n[마이]-[내가 참여한 펀딩]에서\n확인할 수 있어요`}
      />
      <BottomBackgroundComponent Button={Btn} />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;

  height: 100%;
`;

export default CompletePage;
