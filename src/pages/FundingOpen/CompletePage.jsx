import styled from 'styled-components';
import BackHeader from '../../components/common/BackHeader';
import CompletePageComponent from '../../components/common/CompletePageComponent';
import BottomBackground from '../../components/common/BottomBackground';
import Button from '../../components/common/Button';
import { ReactComponent as IcnGift } from '../../assets/FungingOpen/icn_gift.svg';

const CompletePage = () => {
  return (
    <SLayout>
      <BackHeader />
      <CompletePageComponent
        Icon={IcnGift}
        heading='펀딩 개설이 완료되었어요!'
        paragraph={`내가 만든 펀딩은\n[마이]-[내가 만든 펀딩]에서\n확인할 수 있어요`}
      />
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

// 레이아웃 스타일
const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;

  height: 100vh;
`;

export default CompletePage;
