import styled from 'styled-components';
import BackHeader from '../../components/common/BackHeader';
import FundingSpan from '../../components/FundingInfo/FundingSpan';
import TopFundingInfo from '../../components/FundingInfo/TopFundingInfo';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import CongratsMessage from '../../components/FundingInfo/CongratsMessage';
import BottomBackground from '../../components/common/BottomBackground';
import Button from '../../components/common/Button';

const tempList = [
  {
    name: '이름은최대8글자',
    message:
      '축하 메시지가 표시될 거예요 메시지는 여러 줄이어도 모두 표시되도록 설정해 주세요',
  },
  {
    name: '김이화',
    message: '생일 축하해!',
  },
  {
    name: '이름은최대8글자',
    message:
      '축하 메시지가 표시될 거예요 메시지는 여러 줄이어도 모두 표시되도록 설정해 주세요',
  },
];

const FundingInfoPage = () => {
  const Btn = <Button btnInfo={{ text: '선물하기', color: 'orange' }} />;

  return (
    <>
      <BackHeader />
      <SLayout>
        <TopFundingInfo color='orange' />
        <FundingSpan type='orange' />
        <FundingPercentage color='orange' />
        <CongratsMessage list={tempList} />
      </SLayout>
      <BottomBackground Button={Btn} />
    </>
  );
};

export default FundingInfoPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  padding: 16px 16px 40px 16px;
`;
