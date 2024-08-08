import styled from 'styled-components';
import { H2 } from '../../styles/font';
import { useState, useContext, useEffect } from 'react';
import { DataContext, PageContext } from './IndexPage';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import ButtonComponent from '../../components/common/ButtonComponent';

const GiftAddPage = () => {
  const { setCurrentPage } = useContext(PageContext);
  const { giftData, imageData } = useContext(DataContext);
  const [isTrue, setIsTrue] = useState(true);

  const Btn = (
    <SBtnContainer>
      <ButtonComponent
        btnInfo={{ text: '새로운 선물 추가하기', color: 'orange' }}
        onClick={() => setCurrentPage('GiftSetPage')}
      />
      <ButtonComponent
        btnInfo={{ text: '펀딩 만들기', color: isTrue ? 'jade' : 'gray' }}
        disabled={!isTrue}
        onClick={() => setCurrentPage('FundingSetPage')}
      />
    </SBtnContainer>
  );

  return (
    <SLayout>
      <BackHeaderComponent onClick={() => setCurrentPage('GiftSetPage-back')} />
      <SContainer>
        <STitleWrapper>선물을 추가했어요!</STitleWrapper>
        <FundingPercentage
          type='add'
          color='var(--jade-pri)'
          setIsTrue={setIsTrue}
          giftData={giftData}
          imageData={imageData}
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

  ${H2}
`;

export default GiftAddPage;
