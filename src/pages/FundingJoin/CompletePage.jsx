import styled from 'styled-components';
import { H3, B2 } from '../../styles/font';
import { useNavigate } from 'react-router-dom';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import { ReactComponent as IcnGift } from '../../assets/FundingJoin/gift_icon.svg';

const CompletePage = () => {
  const navigate = useNavigate();

  const Btn = (
    <ButtonComponent
      btnInfo={{ text: '홈으로 돌아가기', color: 'orange' }}
      onClick={() => navigate('/', { replace: true })}
    />
  );

  return (
    <SLayout>
      <BackHeaderComponent onClick={() => navigate('/', { replace: true })} />
      <SMain>
        <IcnGift />
        <SH3>{'펀딩 참여가 완료되었어요!'}</SH3>
        <SP>{`내가 만든 펀딩은\n[마이]-[내가 참여한 펀딩]에서\n확인할 수 있어요`}</SP>
      </SMain>
      <BottomBackgroundComponent Button={Btn} />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;

  height: 100%;
`;
const SMain = styled.main`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  gap: 24px;
  margin-bottom: 88px;
`;
const SH3 = styled.h3`
  ${H3}
  color: var(--black);
`;
const SP = styled.p`
  ${B2}
  color: var(--gray-500);
  white-space: pre-line;
  text-align: center;
`;

export default CompletePage;
