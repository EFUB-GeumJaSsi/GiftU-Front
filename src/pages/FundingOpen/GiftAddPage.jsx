import styled from 'styled-components';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import ButtonComponent from '../../components/common/ButtonComponent';

const GiftAddPage = () => {
  const Btn = (
    <SBtnContainer>
      <ButtonComponent
        btnInfo={{ color: 'orange', text: '새로운 선물 추가하기' }}
      />
      <ButtonComponent btnInfo={{ color: 'jade', text: '펀딩 만들기' }} />
    </SBtnContainer>
  );

  // 추가한 선물마다 번호를 매겨서 가장 나중에 추가한 선물 구분
  const giftList = [
    { price: 10000, title: '선물', num: 0 },
    { price: 15000, title: '선물', num: 2 },
    { price: 30000, title: '선물', num: 3 },
    { price: 50000, title: '선물', num: 1 },
  ];

  return (
    <>
      <BackHeaderComponent />
      <SLayout>
        <STitleWrapper>선물을 추가했어요!</STitleWrapper>
        <FundingPercentage color='jade' giftList={giftList} type='add' />
      </SLayout>
      <BottomBackgroundComponent Button={Btn} />
    </>
  );
};

const SBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding: 24px 20px 180px 20px;
`;
const STitleWrapper = styled.span`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
`;

export default GiftAddPage;
