import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FundingComponent from '../../components/common/FundingComponent';
import TagSelectComponent from '../../components/common/TagSelectComponent';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';

const ListPage = ({ headerText, buttons, message }) => {
  const [fundingList, setFundingList] = useState([]);
  const navigate = useNavigate();
  const FundingList = [
    // {
    //   fundingId: 1,
    //   launcherNickname: '퍼비',
    //   fundingTitle: '제목1',
    //   fundingEndDate: '2024-09-18',
    //   status: 'IN_PROGRESS',
    //   fundingImageUrl:
    //     'https://localhost:8080/image/d953fdec-b85f-4ce9-b7f5-7a',
    // },
    // {
    //   fundingId: 2,
    //   launcherNickname: '퍼비',
    //   fundingTitle: '제목3',
    //   fundingEndDate: '2024-09-18',
    //   status: 'IN_PROGRESS',
    //   fundingImageUrl:
    //     'https://localhost:8080/image/d953fdec-b85f-4ce9-b7f5-7a',
    // },
    // {
    //   fundingId: 4,
    //   launcherNickname: '퍼비',
    //   fundingTitle: '제목4',
    //   fundingEndDate: '2024-09-18',
    //   status: 'IN_PROGRESS',
    //   fundingImageUrl:
    //     'https://localhost:8080/image/d953fdec-b85f-4ce9-b7f5-7a',
    // },
  ];

  useEffect(() => {
    setFundingList(FundingList);
  }, []);

  const handleClick = (funding) => {
    funding.status === 'IN_PROGRESS'
      ? navigate(`/funding-detail/${funding.fundingId}/isOngoing`)
      : navigate(`/funding-detail/${funding.fundingId}/end`);
  };

  return (
    <SLayout>
      <BackHeaderComponent text={headerText} />
      <SNotiItemWrapper>
        <TagSelectComponent buttons={buttons} />
      </SNotiItemWrapper>
      {fundingList.length === 0 ? (
        <SNoResultsWrapper>{message}</SNoResultsWrapper>
      ) : (
        <SFundingContainer>
          {fundingList.map((funding, index) => (
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
  justify-content: center;
  padding-top: 246px;

  width: 100%;
  height: 100vh;

  background-color: var(--gray-100);
  color: var(--gray-500);
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;

export default ListPage;
