import styled from 'styled-components';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import CompletePageComponent from '../../components/common/CompletePageComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import { ReactComponent as IcnGift } from '../../assets/FungingOpen/icn_gift.svg';

const CompletePage = () => {
  return (
    <SLayout>
      <BackHeaderComponent />
      <CompletePageComponent
        Icon={IcnGift}
        heading='펀딩 개설이 완료되었어요!'
        paragraph={`내가 만든 펀딩은\n[마이]-[내가 만든 펀딩]에서\n확인할 수 있어요`}
      />
      <BottomBackgroundComponent
        Button={
          <ButtonComponent
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
`;

export default CompletePage;
