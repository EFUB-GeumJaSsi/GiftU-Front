import styled from 'styled-components';
import { B1 } from '../../styles/font';
import TagSelectComponent from '../common/TagSelectComponent';
import FundingComponent from '../common/FundingComponent';

const List = ({ tags, selectedTag, onTagChange, openList, color }) => {
  return (
    <SLayout>
      <SNotiItemWrapper>
        <TagSelectComponent
          tags={tags}
          selectedTag={selectedTag}
          onTagChange={onTagChange}
          color={color}
        />
      </SNotiItemWrapper>
      {openList.length === 0 ? (
        selectedTag === '전체' ? (
          <SNoResultsWrapper>
            {color === 'orange'
              ? '아직 내가 참여한 펀딩이 없어요'
              : '아직 내가 만든 펀딩이 없어요'}
          </SNoResultsWrapper>
        ) : selectedTag === '진행' ? (
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
  flex-direction: column;
  align-items: center;

  height: calc(100% - 72px);
  width: 375px;
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

  ${B1}
  background-color: var(--gray-100);
  color: var(--gray-500);
`;
export default List;
