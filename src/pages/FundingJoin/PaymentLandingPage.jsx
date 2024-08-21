import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DataContext, PageContext } from './IndexPage';
import { getUserInfo } from '../../api/user';
import { postPayment } from '../../api/payment';
import SpinnerComponent from '../../components/common/SpinnerComponent';

const PaymentLandingPage = () => {
  const { setCurrentPage } = useContext(PageContext);
  const { fundingJoinData, setErrorMsg, setToastShow } =
    useContext(DataContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const imp_success = searchParams.get('imp_success');
  const imp_uid = searchParams.get('imp_uid');
  const error_msg = searchParams.get('error_msg');

  // 이름과 이메일 위한 유저 정보 조회
  const readUserInfo = async () => {
    try {
      const res = await getUserInfo();
      return res.data;
    } catch {
      console.error(e);
    }
  };

  // 아임포트 결제 요청
  const requestPayment = async () => {
    sessionStorage.setItem('fundingData', JSON.stringify(fundingJoinData));
    const userData = await readUserInfo();

    const { IMP } = window;
    IMP.init(`${process.env.REACT_APP_IMP}`);

    const data = {
      pg: 'html5_inicis', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: `uid${new Date().getTime()}`, // 주문번호
      amount: fundingJoinData.contributionAmount, // 결제금액
      name: 'GiftU 펀딩 참여', // 주문명
      buyer_name: userData.nickname, // 구매자 이름
      buyer_email: userData.email, // 구매자 이메일
      m_redirect_url: `gift-u.netlify.app/funding/${fundingJoinData.fundingId}/join`,
    };

    IMP.request_pay(data, callback);
  };

  // 아임포트 callback 함수
  const callback = async (response) => {
    const { status, error_msg, imp_uid } = response;

    if (status === 'paid') {
      createPayment(imp_uid);
    } else {
      setErrorMsg(error_msg);
      setToastShow(true);
      setCurrentPage('FundingJoinPage');
    }
  };

  // 서버에 결제 정보 전달
  const createPayment = async (uid) => {
    try {
      await postPayment(
        uid,
        fundingJoinData.fundingId,
        fundingJoinData.contributionAmount,
      );
      await setCurrentPage('CompletePage');
    } catch (e) {
      console.error(e);
      // 결제 취소
      // 새로운 주소로 이동...
      setErrorMsg('결제를 다시 시도해주세요.');
      setToastShow(true);
      setCurrentPage('FundingJoinPage');
    }
  };

  useEffect(() => {
    if (imp_success === null) {
      requestPayment();
    }
    if (imp_success === 'true') {
      createPayment(imp_uid);
    }
    if (imp_success === 'false') {
      setErrorMsg(error_msg.split(' | ')[1]);
      error_msg && setToastShow(true);
      setCurrentPage('FundingJoinPage');
      return navigate(`/funding/${fundingJoinData.fundingId}/join`, {
        replace: true,
      });
    }
  }, [imp_success]);

  return (
    <SLayout>
      <SpinnerComponent />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default PaymentLandingPage;
