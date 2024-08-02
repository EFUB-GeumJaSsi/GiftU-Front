import styled from 'styled-components';
import { useState, useEffect } from 'react';
import FundingComponent from '../../components/common/FundingComponent';
import TagSelectComponent from '../../components/common/TagSelectComponent';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import { getOpenList } from '../../api/funding';

const ListOpenPage = () => {
  const [tag, setTag] = useState('전체');
  const tags = ['전체', '진행', '종료'];
  const [openList, setOpenList] = useState([]);

  const readOpenList = async (status) => {
    try {
      const response = await getOpenList(status);
      setOpenList(response.data.fundings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tag === '전체') {
      readOpenList(null);
    } else if (tag === '진행') {
      readOpenList('IN_PROGRESS');
    } else {
      readOpenList('TERMINATED');
    }
  }, [tag]);

  return (
    <SLayout>
      <BackHeaderComponent text='내가 만든 펀딩' />
      <SNotiItemWrapper>
        <TagSelectComponent
          tags={tags}
          selectedTag={tag}
          onTagChange={setTag}
        />
      </SNotiItemWrapper>
      {openList.length === 0 ? (
        tag === '전체' ? (
          <SNoResultsWrapper>아직 내가 만든 펀딩이 없어요</SNoResultsWrapper>
        ) : tag === '진행' ? (
          <SNoResultsWrapper>진행 중인 펀딩이 없어요</SNoResultsWrapper>
        ) : (
          <SNoResultsWrapper>종료된 펀딩이 없어요</SNoResultsWrapper>
        )
      ) : (
        <SFundingContainer>
          {openList.map((funding, index) => (
            <FundingComponent data={funding} key={index} />
          ))}
        </SFundingContainer>
      )}
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
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
const SNoResultsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  width: 100%;

  background-color: var(--gray-100);
  color: var(--gray-500);

  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;

export default ListOpenPage;
