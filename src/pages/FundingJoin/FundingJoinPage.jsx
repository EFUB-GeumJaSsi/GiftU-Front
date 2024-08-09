import styled from 'styled-components';
import { B1, B2, B3 } from '../../styles/font';
import { useContext, useEffect, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { DataContext, PageContext } from './IndexPage';
import { getFundingInfo } from '../../api/funding';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import FundingPercentage from '../../components/FundingInfo/FundingPercentage';
import PriceInputComponent from '../../components/common/PriceInputComponent';
import ScrollToTop from '../../components/common/ScrollToTop';
import ToastComponent from '../../components/common/ToastComponent';

const FundingJoinPage = () => {
  const { setCurrentPage } = useContext(PageContext);
  const {
    fundingJoinData,
    setFundingJoinData,
    errorMsg,
    toastShow,
    setToastShow,
  } = useContext(DataContext);
  const { fundingId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const imp_success = searchParams.get('imp_success');
  const navigate = useNavigate();
  const location = useLocation();
  const [giftList, setGiftList] = useState(location.state?.giftList);
  const [nowMoney, setNowMoney] = useState(location.state?.nowMoney);
  const [balance, setBalance] = useState(
    giftList && giftList[giftList.length - 1].price - nowMoney,
  );
  const [contributionAmount, setContributionAmount] = useState(
    fundingJoinData.contributionAmount,
  );
  const [name, setName] = useState(
    fundingJoinData.anonymity ? 'anony' : 'nickname',
  );
  const [message, setMessage] = useState(fundingJoinData.message);
  const [isDone, setIsDone] = useState(false);

  // 축하메시지 set
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // 닉네임/익명 여부 set
  const handleRadioChange = (e) => {
    setName(e.target.value);
  };

  // 펀딩 상세 정보 조회
  const readFundingInfo = async () => {
    try {
      const res = await getFundingInfo(fundingId);
      const data = res.data;
      setGiftList(data.giftList);
      setNowMoney(data.nowMoney);
      setBalance(data.giftList[data.giftList.length - 1].price - data.nowMoney);
    } catch (e) {
      console.log(e);
    }
  };

  // 결제하기 버튼 핸들러
  const handleClickPayment = () => {
    setFundingJoinData({
      fundingId: fundingId,
      contributionAmount: contributionAmount,
      anonymity: name === 'anony' ? true : false,
      message: message,
    });
    setCurrentPage('PaymentLandingPage');
  };

  // 참여 가능한 금액 입력 시 결제 버튼 활성화
  useEffect(() => {
    contributionAmount <= balance ? setIsDone(true) : setIsDone(false);
  }, [contributionAmount, balance, imp_success]);

  useEffect(() => {
    if (!giftList) {
      readFundingInfo();
    }
  }, [giftList]);

  useEffect(() => {
    sessionStorage.clear();
  }, [navigate]);

  return (
    <>
      <ScrollToTop />
      <BackHeaderComponent
        onClick={() => {
          navigate(`/funding/${fundingId}`, { replace: true });
        }}
      />
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
              onClick={handleClickPayment}
            />
          ) : (
            <ButtonComponent btnInfo={{ text: '결제하기' }} />
          )
        }
      />
      {toastShow && (
        <ToastComponent setToastShow={setToastShow}>{errorMsg}</ToastComponent>
      )}
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
