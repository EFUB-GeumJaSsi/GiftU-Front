import styled from 'styled-components';
import { B1 } from '../../styles/font';
import { useState, useEffect } from 'react';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import FundingParticipants from '../../components/FundingInfo/FundingParticipants';
import ButtonComponent from '../../components/common/ButtonComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import { postReview, patchReview } from '../../api/review';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const ReviewEditPage = () => {
  const { fundingId } = useParams();
  const location = useLocation();
  const [reviewText, setReviewText] = useState(location.state?.reviewText);
  const existedReview = location.state?.reviewText;

  const [contributers, setContributers] = useState(
    location.state?.contributers,
  );
  const isFull = reviewText ? true : '';
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const createReview = async () => {
    try {
      const response = await postReview(fundingId, reviewText);
      window.location.reload();
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

  const handleFormSubmit = async () => {
    existedReview === '' ? createReview() : updateReview(fundingId, reviewText);
    navigate(`/funding/${fundingId}`, { replace: true });
  };
  const Btn = (
    <ButtonComponent
      disabled={!isFull}
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
        <FundingParticipants list={contributers} />
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
  ${B1}
  color: var(--black);
`;
const STextarea = styled.textarea`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 20px;

  border: 2px solid transparent;
  border-radius: 16px;
  background-color: var(--gray-100);

  ${B1}
  color: var(--black);

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
