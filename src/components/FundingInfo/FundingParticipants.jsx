import styled from 'styled-components';
import { ReactComponent as ProfileDefault } from '../../assets/common/profile_default.svg';

const FundingParticipants = ({
  name = '김이화',
  list = [
    {
      image:
        'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
      name: '김이화',
    },
    { image: '', name: '이름은최대10글자' },
    { image: '', name: '이름은최대10글자' },
    { image: '', name: '이름은최대10글자' },
    { image: '', name: '이름은최대10글자' },
    { image: '', name: '이름은최대10글자' },
  ],
}) => {
  const participantItem = (it, idx) => (
    <SItemContainer key={idx}>
      {it.image ? (
        <SProfileWrapper src={it.image} alt='profile' />
      ) : (
        <SProfileDefault alt='default' />
      )}
      <SNameWrapper>{it.name}</SNameWrapper>
    </SItemContainer>
  );

  return (
    <SLayout>
      <STextContainer>
        <STitleWrapper>{list.length}명이 참여했어요!</STitleWrapper>
        <STextWrapper>
          가장 많이 기여한 사람은 <SBoldTextWrapper>{name}</SBoldTextWrapper>{' '}
          님이에요
        </STextWrapper>
      </STextContainer>
      <SParticipantsContainer>
        {list.map((it, idx) => participantItem(it, idx))}
      </SParticipantsContainer>
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
const STitleWrapper = styled.span`
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
`;
const STextWrapper = styled.span`
  color: var(--gray-500);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
const SBoldTextWrapper = styled(STextWrapper)`
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
const SProfileWrapper = styled.img`
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
const SNameWrapper = styled.span`
  width: 61px;
  height: 34px;

  color: var(--gray-500);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

export default FundingParticipants;
