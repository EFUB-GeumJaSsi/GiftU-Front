/*
<SFundingListContainer>
  {fundingList.map((funding, index) => (
    <FundingComponent data={funding} key={index} />
  ))}
</SFundingListContainer>
SFundingListContainer로 감싸고 map을 이용하면 됩니다. 
*/

import styled from 'styled-components';
import { T1, B3 } from '../../styles/font';
import { useNavigate } from 'react-router-dom';
import TagComponent from './TagComponent';

const FundingComponent = ({ data, ...props }) => {
  const navigate = useNavigate();

  return (
    <SLayout onClick={() => navigate(`/funding/${data.fundingId}`)} {...props}>
      <SImg src={data.fundingImageUrl} alt='funding' />
      <STagWrapper>
        {data.status === 'IN_PROGRESS' ? (
          <TagComponent text='진행 중' color='jade' />
        ) : (
          <TagComponent text='종료' color='gray' />
        )}
      </STagWrapper>
      <STitleSpan>{data.fundingTitle}</STitleSpan>
      <STextContainer>
        <SGrayB3>개설</SGrayB3>
        <SBlackB3>{data.launcherNickname}</SBlackB3>
        <SGrayB3>마감</SGrayB3>
        <SBlackB3>{data.fundingEndDate}</SBlackB3>
      </STextContainer>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  padding: 8px;
  gap: 12px;

  cursor: pointer;
`;
const SImg = styled.img`
  width: 148px;
  height: 148px;

  border-radius: 16px;
`;
const STagWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const STitleSpan = styled.span`
  display: -webkit-box;
  overflow: hidden;

  width: 140px;
  height: 40px;

  ${T1}
  text-overflow: ellipsis;

  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const STextContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 4px 8px;
`;
const SB3 = styled.span`
  ${B3}
`;
const SBlackB3 = styled(SB3)`
  overflow: hidden;

  width: 107px;

  color: var(--black);
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const SGrayB3 = styled(SB3)`
  color: var(--gray-500);
`;

export default FundingComponent;
