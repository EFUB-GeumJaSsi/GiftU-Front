import styled from 'styled-components';
import { arrayChop } from '../../components/common/CarouselComponent';
import CarouselComponent from '../../components/common/CarouselComponent';
import Button from '../../components/common/Button';
import VerticalCard from '../../components/Friend/VerticalCard';
import HorizontalCard from '../../components/Friend/HorizontalCard';

const data = [
  {
    nickname: '닉네임1',
    birthday: '3월 18일',
  },
  {
    nickname: '닉네임2',
    birthday: '5월 14일',
  },
  {
    nickname: '닉네임999999999999999999999999',
    birthday: '12월 21일',
  },
];

const FriendPage = () => {
  const chopedDataList = arrayChop(data, 2);

  return (
    <SLayout>
      <SHeader>친구</SHeader>
      <SSection>
        <ST1>나에게 선물한 친구</ST1>
        <CarouselComponent pageLength={chopedDataList.length} pageWidth={335}>
          {chopedDataList.map((item, index) => (
            <SPageContainer key={index}>
              <VerticalCard data={item[0]} />
              {index === chopedDataList.length - 1 && data.length % 2 !== 0 ? (
                <div style={{ visibility: 'hidden' }}>
                  <VerticalCard />
                </div>
              ) : (
                <VerticalCard data={item[1]} />
              )}
            </SPageContainer>
          ))}
        </CarouselComponent>
      </SSection>
      <SSection>
        <STopContainer>
          <ST1>내 친구</ST1>
          <Button
            btnInfo={{
              text: '+ 친구 추가',
              color: 'jade',
              width: '84px',
              onClick: '',
            }}
          />
        </STopContainer>
        <SUl>
          {data.map((item, index) => (
            <li key={index}>
              <HorizontalCard data={item} />
            </li>
          ))}
        </SUl>
      </SSection>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  overflow-x: hidden;
  flex-flow: column nowrap;

  width: fit-content;
  margin: 40px auto 104px auto;
  gap: 24px;
`;
const SHeader = styled.header`
  color: var(--black);
  font-size: 22px;
  font-weight: 700;
  line-height: 140%;
`;
const SSection = styled.section`
  display: flex;
  flex-flow: column nowrap;

  gap: 16px;
`;
const ST1 = styled.h1`
  color: var(--black);
  font-size: 17px;
  font-weight: 700;
  line-height: 120%;
`;
const SPageContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;

  gap: 15px;
`;
const STopContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;
const SUl = styled.ul`
  display: flex;
  flex-flow: column nowrap;

  gap: 16px;
`;

export default FriendPage;
