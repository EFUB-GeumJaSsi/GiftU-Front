import styled from 'styled-components';
import { B1, B4 } from '../../styles/font';
import { useNavigate } from 'react-router-dom';

const CalendarFundingItem = ({ data = {} }) => {
  const navigate = useNavigate();
  const { fundingImageUrl, fundingTitle, launcherNickname, fundingId } = data;

  return (
    <SItemContainer onClick={() => navigate(`/funding/${fundingId}`)}>
      <SImageWrapper src={fundingImageUrl} alt='fundingImg' />
      <STextContainer>
        <STitleWrapper>{fundingTitle}</STitleWrapper>
        <SNameWrapper>{launcherNickname}</SNameWrapper>
      </STextContainer>
    </SItemContainer>
  );
};

const SItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  width: 319px;
  padding: 16px 0 16px 16px;

  background-color: var(--gray-100);
  border-radius: 16px;

  cursor: pointer;
`;
const SImageWrapper = styled.img`
  width: 48px;
  height: 48px;

  background: #d4d4d4;
  border-radius: 4px;
`;
const STextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const STitleWrapper = styled.span`
  width: 235px;
  height: 21px;

  ${B1}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;

  cursor: pointer;
`;
const SNameWrapper = styled.span`
  ${B4}
  color: var(--gray-500);

  cursor: pointer;
`;

export default CalendarFundingItem;
