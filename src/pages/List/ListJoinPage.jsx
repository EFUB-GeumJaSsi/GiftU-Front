import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FundingComponent from '../../components/common/FundingComponent';
import TagSelectComponent from '../../components/common/TagSelectComponent';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import { getJoinList } from '../../api/funding';

const ListJoinPage = () => {
  const [tag, setTag] = useState('전체');
  const tags = ['전체', '진행', '종료'];
  const [joinList, setJoinList] = useState([]);
  const navigate = useNavigate();

  const readJoinList = async (status) => {
    try {
      const response = await getJoinList(status);
      setJoinList(response.data.fundings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tag === '전체') {
      readJoinList();
    } else if (tag === '진행') {
      readJoinList('IN_PROGRESS');
    } else {
      readJoinList('TERMINATED');
    }
  }, [tag]);

  const handleClick = (funding) => {
    navigate(`/fundings/${funding.fundingId}`);
  };

  return (
    <SLayout>
      <BackHeaderComponent text='내가 참여한 펀딩' />
      <SNotiItemWrapper>
        <TagSelectComponent
          tags={tags}
          selectedTag={tag}
          onTagChange={setTag}
          color='orange'
        />
      </SNotiItemWrapper>
      {joinList.length === 0 ? (
        tag === '전체' ? (
          <SNoResultsWrapper>아직 내가 참여한 펀딩이 없어요</SNoResultsWrapper>
        ) : tag === '진행' ? (
          <SNoResultsWrapper>진행 중인 펀딩이 없어요</SNoResultsWrapper>
        ) : (
          <SNoResultsWrapper>종료된 펀딩이 없어요</SNoResultsWrapper>
        )
      ) : (
        <SFundingContainer>
          {joinList.map((funding, index) => (
            <FundingComponent
              result={funding}
              key={index}
              onClick={() => handleClick(funding)}
            />
          ))}
        </SFundingContainer>
      )}
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const SNotiItemWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 20px;
`;

const SFundingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 7px;
  row-gap: 8px;

  cursor: pointer;
`;
const SNoResultsWrapper = styled.p`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  width: 100%;

  background-color: var(--gray-100);
  color: var(--gray-500);
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;

export default ListJoinPage;
