import styled from 'styled-components';
import { useState } from 'react';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import FundingParticipants from '../../components/FundingInfo/FundingParticipants';
import ButtonComponent from '../../components/common/ButtonComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
const ReviewEditPage = () => {
  const [reviewText, setReviewText] = useState('');
  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };
  const Btn = (
    <ButtonComponent
      btnInfo={{
        text: '완료',
        width: '335px',
        color: reviewText ? 'jade' : 'gray',
      }}
    ></ButtonComponent>
  );
  return (
    <SLayout>
      <BackHeaderComponent text='선물후기'></BackHeaderComponent>
      <SContentContainer>
        <FundingParticipants></FundingParticipants>
        <SForm>
          <SLegend>선물 후기</SLegend>
          <STextarea
            placeholder='선물 후기를 작성해주세요!'
            value={reviewText}
            onChange={handleInputChange}
          ></STextarea>
        </SForm>
      </SContentContainer>
      <BottomBackgroundComponent Button={Btn} />
    </SLayout>
  );
};
const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;

  width: 335px;
`;
const SForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  width: 335px;
  height: 210px;
`;
const SLegend = styled.legend`
  color: var(--black);
  font-size: 16px;
  font-weight: 500;
`;
const STextarea = styled.textarea`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 20px;

  border: 2px solid transparent;
  border-radius: 16px;
  background-color: var(--gray-100);

  color: var(--black);
  font-weight: 500;
  font-size: 16px;

  resize: none;

  &::placeholder {
    color: var(--gray-400);
  }
  &:focus {
    border: 2px solid var(--jade-pri);
  }
`;

export default ReviewEditPage;
