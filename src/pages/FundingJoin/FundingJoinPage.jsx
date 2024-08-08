import styled from 'styled-components';
import { B1, B2, B3 } from '../../styles/font';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFundingInfo, postFundingJoin } from '../../api/funding';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import PriceInputComponent from '../../components/common/PriceInputComponent';

const FundingJoinPage = () => {
  const navigate = useNavigate();
  const { fundingId } = useParams();
  const [giftList, setGiftList] = useState(null);
  const [nowMoney, setNowMoney] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contributionAmount, setContributionAmount] = useState(null);
  const [name, setName] = useState('nickname');
  const [message, setMessage] = useState('');
  const [isDone, setIsDone] = useState(false);

  // 축하메시지 set
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // 닉네임/익명 여부 set
  const handleRadioChange = (e) => {
    setName(e.target.value);
  };

  // 펀딩 정보 조회
  const readFundingInfo = async () => {
    try {
      const res = await getFundingInfo(fundingId);
      const giftList = res.data.giftList;
      const nowMoney = res.data.nowMoney ? res.data.nowMoney : 0;
      setGiftList(giftList);
      setNowMoney(nowMoney);
      setBalance(giftList[giftList.length - 1].price - nowMoney);
    } catch (e) {
      console.log(e);
    }
  };

  // 펀딩 참여
  const createFundingJoin = async () => {
    const name = 'nickname' ? false : true;
    try {
      const res = await postFundingJoin(
        fundingId,
        contributionAmount,
        name,
        message,
      );
      navigate('참여 완료 페이지 이동');
    } catch (e) {
      console.log(e);
    }
  };

  // 참여 가능한 금액 입력 시 결제 버튼 활성화
  useEffect(() => {
    contributionAmount <= balance ? setIsDone(true) : setIsDone(false);
  }, [contributionAmount, balance]);

  // 최초 렌더링 데이터 read
  useEffect(() => {
    readFundingInfo();
  }, []);

  return (
    <>
      <BackHeaderComponent />
      <SLayout>
        <FundingPercentage
          type='info'
          color='var(--orange-pri)'
          giftList={giftList}
          nowMoney={
            contributionAmount && isDone
              ? nowMoney + parseInt(contributionAmount)
              : nowMoney
          }
          joinPrice={
            contributionAmount && isDone ? contributionAmount : undefined
          }
        />
        <SForm>
          <SContainer>
            <SLabel htmlFor='price'>
              <STextSpan>금액</STextSpan>
              <SStarSpan>*</SStarSpan>
            </SLabel>
            <PriceInputComponent
              focusColor='var(--orange-pri)'
              price={contributionAmount}
              setPrice={setContributionAmount}
              placeholder='펀딩에 참여할 금액을 입력해 주세요'
            />
            {balance && contributionAmount > balance && (
              <SWarningSpan>
                {balance?.toLocaleString()}원보다 적은 금액을 입력해 주세요
              </SWarningSpan>
            )}
          </SContainer>
          <SContainer>
            <SLabel>
              <STextSpan>이름</STextSpan>
              <SStarSpan>*</SStarSpan>
            </SLabel>
            <SButtonContainer>
              <SButtonWrapper htmlFor='nickname' checked={name === 'nickname'}>
                <input
                  id='nickname'
                  type='radio'
                  value='nickname'
                  checked={name === 'nickname'}
                  onChange={handleRadioChange}
                />
                닉네임
              </SButtonWrapper>
              <SButtonWrapper htmlFor='anony' checked={name === 'anony'}>
                <input
                  id='anony'
                  type='radio'
                  value='anony'
                  checked={name === 'anony'}
                  onChange={handleRadioChange}
                />
                익명
              </SButtonWrapper>
            </SButtonContainer>
          </SContainer>
          <SContainer>
            <STextSpan htmlFor='message'>축하메시지</STextSpan>
            <STextarea
              id='message'
              value={message}
              onChange={handleMessageChange}
              placeholder='친구에게 전달될 메시지를 입력해 주세요'
            />
          </SContainer>
        </SForm>
      </SLayout>
      <BottomBackgroundComponent
        Button={
          contributionAmount && isDone ? (
            <ButtonComponent
              btnInfo={{ text: '결제하기', color: 'orange' }}
              onClick={createFundingJoin}
            />
          ) : (
            <ButtonComponent btnInfo={{ text: '결제하기' }} />
          )
        }
      />
    </>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  padding: 24px 20px 128px 20px;
`;
const SForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

const SContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SLabel = styled.label`
  display: flex;
`;
const STextSpan = styled.span`
  margin-left: 8px;

  ${B1}
`;
const SStarSpan = styled(STextSpan)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 2px;

  color: var(--orange-pri);
`;
const SWarningSpan = styled.span`
  margin-left: 8px;

  ${B3}
  color: var(--red);
`;
const STextarea = styled.textarea`
  height: 132px;
  padding: 20px 24px;

  border-radius: 16px;
  border: 0;
  background: var(--gray-100);

  ${B2}

  resize: none;

  &::placeholder {
    color: var(--gray-400);
  }

  &:focus {
    outline: 2px solid var(--orange-pri);
  }
`;
const SButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 8px;

  input[type='radio'] {
    -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
    -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거
    appearance: none; // 기본 브라우저에서 기본 스타일 제거
    width: 24px;
    height: 24px;
    border: 2px solid var(--orange-pri); // 체크되지 않았을 때의 테두리 색상
    border-radius: 50%;
    outline: none; // focus 시에 나타나는 기본 스타일 제거
    cursor: pointer;
  }

  input[type='radio']:checked {
    background-color: var(--orange-pri); // 체크 시 내부 원으로 표시될 색상
    border: 7px solid var(--orange-sec); // 테두리가 아닌, 테두리와 원 사이의 색상
    box-shadow: 0 0 0 2px var(--orange-pri); // 얘가 테두리가 됨
    // 그림자로 테두리를 직접 만들어야 함 (퍼지는 정도를 0으로 주면 테두리처럼 보입니다.)
    // 그림자가 없으면 그냥 설정한 색상이 꽉 찬 원으로만 나옵니다.
  }
`;
const SButtonWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 16px;

  padding-left: 16px;
  height: 64px;

  border-radius: 16px;
  background: ${(props) =>
    props.checked ? 'var(--orange-sec)' : 'var(--gray-100)'};
  ${B2}
  color: ${(props) => (props.checked ? 'var(--black)' : 'var(--gray-400)')};

  cursor: pointer;
`;

export default FundingJoinPage;
