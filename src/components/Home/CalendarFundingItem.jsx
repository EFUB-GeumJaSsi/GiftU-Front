import styled from 'styled-components';

const CalendarFundingItem = ({ data = {} }) => {
  const { fundingImageUrl, fundingTitle, launcherNickname } = data;

  return (
    <SItemContainer>
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

  border-radius: 50%;
`;

const STextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const STitleWrapper = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;

  width: 235px;
  height: 21px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;

  cursor: pointer;
`;

const SNameWrapper = styled.span`
  color: var(--gray-500);
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;

  cursor: pointer;
`;

export default CalendarFundingItem;
