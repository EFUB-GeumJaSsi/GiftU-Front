import styled from 'styled-components';
import { arrayChop } from '../../components/common/CarouselComponent';
import CarouselComponent from '../../components/common/CarouselComponent';
import VerticalCard from '../../components/Friend/VerticalCard';
import HorizontalCard from '../../components/Friend/HorizontalCard';
import { ReactComponent as IcnUnion } from '../../assets/Friend/icn_union.svg';

const data = null;
// const data = [
//   {
//     nickname: '닉네임1',
//     birthday: '3월 18일',
//   },
//   {
//     nickname: '닉네임2',
//     birthday: '5월 14일',
//   },
//   {
//     nickname: '닉네임999999999999999999999999',
//     birthday: '12월 21일',
//   },
// ];

const FriendPage = () => {
  const chopedDataList = data && arrayChop(data, 2);

  return (
    <SLayout>
      <SHeader>친구</SHeader>
      {data && (
        <SSection>
          <ST1>나에게 선물한 친구</ST1>
          <CarouselComponent pageLength={chopedDataList.length} pageWidth={335}>
            {chopedDataList.map((item, index) => (
              <SPageContainer key={index}>
                <VerticalCard data={item[0]} />
                {index === chopedDataList.length - 1 &&
                data.length % 2 !== 0 ? (
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
      )}
      <SSection>
        <STopContainer>
          <ST1>내 친구</ST1>
          <SBtn>
            <IcnUnion />
            친구 추가
          </SBtn>
        </STopContainer>
        {data ? (
          <SUl>
            {data.map((item, index) => (
              <li key={index}>
                <HorizontalCard data={item} />
              </li>
            ))}
          </SUl>
        ) : (
          <SB1>친구에게 초대 메시지를 보내보세요!</SB1>
        )}
      </SSection>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  overflow-x: hidden;
  flex-flow: column nowrap;

  width: 335px;
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
const SBtn = styled.button`
  border-radius: 20px;
  background-color: var(--jade-pri);

  color: var(--white);
  font-size: 12px;
  font-weight: 600;
  line-height: 120%;

  padding: 8px 12px 8px 8px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
`;
const SUl = styled.ul`
  display: flex;
  flex-flow: column nowrap;

  gap: 16px;
`;
const SB1 = styled.p`
  text-align: center;

  color: var(--gray-500);
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;

export default FriendPage;
