import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import FundingParticipants from '../../components/FundingInfo/FundingParticipants';
import ButtonComponent from '../../components/common/ButtonComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import { postReview, getReview, patchReview } from '../../api/review';

const ReviewEditPage = () => {
  const { fundingId } = useParams();
  const [reviewText, setReviewText] = useState('');
  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };
  const createReview = async (fundingId, reviewText) => {
    try {
      const response = await postReview(fundingId, reviewText);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const readReview = async (fundingId) => {
    try {
      const response = await getReview(fundingId);
      if ((response.data.reviewContent = '')) setReviewText([]);
      else setReviewText(response.data.reviewContent);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateReview = async (fundingId, reviewText) => {
    try {
      const response = await patchReview(fundingId, reviewText);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    readReview(fundingId);
  }, []);

  const handleFormSubmit = () => {
    createReview(fundingId, reviewText);
  };
  //updateReview(fundingId, reviewText);
  //else
  const Btn = (
    <ButtonComponent
      btnInfo={{
        text: '완료',
        width: '335px',
        color: reviewText ? 'jade' : 'gray',
      }}
      onClick={handleFormSubmit}
    />
  );
  return (
    <SLayout>
      <BackHeaderComponent text='선물후기'></BackHeaderComponent>
      <SContentContainer>
        <FundingParticipants />
        <SForm>
          <SLegend>선물 후기</SLegend>
          <STextarea
            placeholder='선물 후기를 작성해주세요!'
            value={reviewText}
            onChange={handleInputChange}
          />
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
    outline: none;
  }
`;

export default ReviewEditPage;
