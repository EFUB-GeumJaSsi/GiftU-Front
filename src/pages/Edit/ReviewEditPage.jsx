import styled from 'styled-components';
import { useState, useEffect } from 'react';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import FundingParticipants from '../../components/FundingInfo/FundingParticipants';
import ButtonComponent from '../../components/common/ButtonComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import { postReview, getReview, patchReview } from '../../api/review';
import { getFundingInfo } from '../../api/funding';
import { useNavigate, useParams } from 'react-router-dom';

const ReviewEditPage = () => {
  const { fundingId } = useParams();
  const [reviewText, setReviewText] = useState('');
  const [contributers, setContributers] = useState('');
  const [isReviewExists, setIsReviewExists] = useState(false);
  const [data, setData] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const readFundingInfo = async () => {
    try {
      const res = await getFundingInfo(fundingId);
      const data = res.data;
      console.log(data);
      data.contributers && setContributers(data.contributers);
      if (data.existedReview === true) {
        setIsReviewExists(true);
      }
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const createReview = async () => {
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
      setReviewText(response.data.reviewContent);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchReview = async () => {};
    if (isReviewExists) {
      readReview(fundingId);
    }
    fetchReview();
  }, [fundingId]);

  const updateReview = async (fundingId, reviewText) => {
    try {
      const response = await patchReview(fundingId, reviewText);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (fundingId) {
      readFundingInfo();
    }
  }, [fundingId]);

  const handleFormSubmit = async () => {
    if (!isReviewExists) await createReview();
    else {
      await updateReview(fundingId, reviewText);
    }
    navigate(`/funding/${fundingId}`);
  };
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
