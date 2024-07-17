import React, { useState } from 'react';
import styled from 'styled-components';
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
      <SContentsContainer>
        <FundingParticipants></FundingParticipants>
        <SContentContainer>
          <STitleContainer>선물 후기</STitleContainer>
          <STextBoxWrapper
            placeholder='선물 후기를 작성해주세요!'
            value={reviewText}
            onChange={handleInputChange}
          ></STextBoxWrapper>
        </SContentContainer>
      </SContentsContainer>
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
`;
const SContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;

  width: 335px;
  margin-top: 24px;
`;
const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  width: 335px;
  height: 210px;
  margin-top: 8px;
`;

const STitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 76px;
  height: 22px;
  padding: 0px 8px 0px 8px;

  color: var(--black);
  font-size: 16px;
  font-weight: 500;
`;

const STextBoxWrapper = styled.textarea`
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
const SBtnWrapper = styled.div`
  position: fixed;
  bottom: 0;
`;
