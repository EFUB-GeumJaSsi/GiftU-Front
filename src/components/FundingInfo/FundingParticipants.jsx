import styled from 'styled-components';
import { T1, B3 } from '../../styles/font';
import { ReactComponent as ProfileDefault } from '../../assets/common/profile_default.svg';

const FundingParticipants = ({ list = [] }) => {
  console.log(list);
  const participantItem = (it, idx) => (
    <SItemContainer key={idx}>
      {it.userImageUrl && !it.anonymous ? (
        <SImg src={it.userImageUrl} alt='profile' />
      ) : (
        <SProfileDefault alt='default' />
      )}
      <SNameSpan>{it.anonymous ? '익명' : it.nickname}</SNameSpan>
    </SItemContainer>
  );

  return (
    <SLayout>
      <STextContainer>
        <STitleSpan>{list.length}명이 참여했어요!</STitleSpan>
        {list.length > 0 && (
          <STextSpan>
            가장 많이 기여한 사람은{' '}
            <SBoldTextSpan>{list[0].nickname}</SBoldTextSpan> 님이에요
          </STextSpan>
        )}
      </STextContainer>
      {list && list.length > 0 ? (
        <SParticipantsContainer>
          {list.map((it, idx) => participantItem(it, idx))}
        </SParticipantsContainer>
      ) : (
        <SWrapper>
          <STextSpan>아직 참여한 사람이 없어요</STextSpan>
        </SWrapper>
      )}
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  height: 203px;

  border-radius: 16px;
  background: var(--gray-100);
`;
const STextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin: 20px 24px 0 24px;
`;
const STitleSpan = styled.span`
  ${T1}
`;
const STextSpan = styled.span`
  ${B3}
  color: var(--gray-500);
`;
const SBoldTextSpan = styled(STextSpan)`
  color: var(--black);
`;
const SParticipantsContainer = styled.div`
  display: flex;
  overflow: scroll;

  margin: 0 11px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const SItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  padding: 16px 8px;
`;
const SImg = styled.img`
  width: 48px;
  height: 48px;

  border-radius: 50%;
  background: var(--gray-300);
`;
const SProfileDefault = styled(ProfileDefault)`
  width: 48px;
  height: 48px;

  border-radius: 50%;
`;
const SNameSpan = styled.span`
  width: 61px;
  height: 34px;

  ${B3}
  color: var(--gray-500);
  text-align: center;
`;
const SWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export default FundingParticipants;
