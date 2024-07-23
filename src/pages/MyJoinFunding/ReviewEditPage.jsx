import styled from 'styled-components';
import { useState } from 'react';
import BackHeader from '../../components/common/BackHeader';
import FundingParticipants from '../../components/FundingInfo/FundingParticipants';
import Button from '../../components/common/Button';
import BottomBackground from '../../components/common/BottomBackground';

const ReviewEditPage = () => {
  const [reviewText, setReviewText] = useState('');

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };
  const Btn = (
    <Button
      btnInfo={{
        text: '완료',
        width: '335px',
        color: reviewText ? 'jade' : 'gray',
      }}
    ></Button>
  );
  return (
    <SLayout>
      <BackHeader text='선물후기'></BackHeader>
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
      <SBtnWrapper>
        <BottomBackground Button={Btn} />
      </SBtnWrapper>
    </SLayout>
  );
};
export default ReviewEditPage;

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
const SBtnWrapper = styled.div`
  position: fixed;
  bottom: 0;
`;
