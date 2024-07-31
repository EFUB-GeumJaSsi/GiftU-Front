import styled from 'styled-components';
import { useState } from 'react';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import ButtonComponent from '../../components/common/ButtonComponent';

// 추가한 선물마다 번호를 매겨서 가장 나중에 추가한 선물 구분
const giftList = [
  { price: 10000, title: '선물', num: 0 },
  { price: 15000, title: '선물', num: 3 },
  { price: 30000, title: '선물', num: 2 },
  { price: 50000, title: '선물', num: 1 },
];

const GiftAddPage = () => {
  const [isTrue, setIsTrue] = useState(true);

  const Btn = (
    <SBtnContainer>
      <ButtonComponent
        btnInfo={{ color: 'orange', text: '새로운 선물 추가하기' }}
      />
      {isTrue ? (
        <ButtonComponent btnInfo={{ color: 'jade', text: '펀딩 만들기' }} />
      ) : (
        <ButtonComponent btnInfo={{ text: '펀딩 만들기' }} />
      )}
    </SBtnContainer>
  );

  return (
    <SLayout>
      <BackHeaderComponent />
      <SContainer>
        <STitleWrapper>선물을 추가했어요!</STitleWrapper>
        <FundingPercentage
          type='add'
          color='var(--jade-pri)'
          giftList={giftList}
          setIsTrue={setIsTrue}
        />
      </SContainer>
      <BottomBackgroundComponent Button={Btn} />
    </SLayout>
  );
};

const SBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const SLayout = styled.div`
  padding-bottom: 160px;
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 24px 20px;
  gap: 64px;
`;
const STitleWrapper = styled.span`
  margin-left: 8px;

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
`;

export default GiftAddPage;
