import styled from 'styled-components';
import { useEffect, useState } from 'react';
import NavComponent from '../../components/common/NavComponent';
import Calendar from '../../components/Home/Calendar';
import FundingComponent from '../../components/common/FundingComponent';
import icn_search from '../../assets/common/search.svg';

const HomePage = () => {
  const [possibleFundingList, setPossibleFundingList] = useState([]);

  useEffect(() => {
    setPossibleFundingList([]);
  }, []);

  return (
    <SLayout>
      <section>
        <SInput
          type='text'
          id='search-bar'
          placeholder='어떤 펀딩을 찾고 있나요?'
          readOnly
          onClick={() => {
            console.log('검색페이지로 라우팅!');
            console.log('검색 페이지 인풋필드 포커스');
          }}
        />
      </section>
      <SSection>
        <STextContainer>
          <SH2>곧 마감되는 펀딩</SH2>
          <SB4>기간이 얼마 남지 않은 펀딩을 확인하세요!</SB4>
        </STextContainer>
        <Calendar />
      </SSection>
      <SSection>
        <SH2>참여 가능한 펀딩</SH2>
        <SFundingUl>
          {possibleFundingList.map((item, index) => (
            <FundingComponent data={item} key={index} />
          ))}
        </SFundingUl>
      </SSection>
      <NavComponent />
    </SLayout>
  );
};

// 텍스트 스타일
const SH2 = styled.h2`
  color: var(--black);
  font-size: 20px;
  font-weight: 700;
  line-height: 140%;
`;
const SB4 = styled.p`
  color: var(--gray-500);
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;
`;

// 스타일 컴포넌트
const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;

  width: fit-content;
  margin: 0 auto;
  padding: 40px 0 128px;
  gap: 24px;
`;
const SSection = styled.section`
  display: flex;
  flex-flow: column nowrap;

  gap: 16px;
`;
const SInput = styled.input`
  width: 335px;
  height: 56px;
  padding: 17px 20px 17px 52px;

  border-radius: 40px;
  background-color: var(--gray-100);
  background-image: url(${icn_search});
  background-repeat: no-repeat;
  background-position: 20px center;

  box-sizing: border-box;

  &::placeholder {
    color: var(--gray-400);
    font-size: 16px;
    font-weight: 500;
    line-height: 140%;
  }
`;
const STextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  gap: 8px;
`;
const SFundingUl = styled.ul`
  display: flex;
  flex-flow: row wrap;

  gap: 8px;
`;

export default HomePage;
