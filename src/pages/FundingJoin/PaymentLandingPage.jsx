import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { DataContext, PageContext } from './IndexPage';
import { getUserInfo } from '../../api/user';
import { postPayment } from '../../api/payment';
import SpinnerComponent from '../../components/common/SpinnerComponent';

const PaymentLandingPage = () => {
  const { setCurrentPage } = useContext(PageContext);
  const { fundingJoinData } = useContext(DataContext);

  // 이름과 이메일 위한 유저 정보 조회
  const readUserInfo = async () => {
    try {
      const res = await getUserInfo();
      return res.data;
    } catch {
      console.log(e);
    }
  };

  // 아임포트 결제 요청
  const requestPayment = async () => {
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
    };

    IMP.request_pay(data, callback);
  };

  // 아임포트 callback 함수
  const callback = (response) => {
    const { status, error_msg, imp_uid } = response;

    if (status === 'paid') {
      createPayment(imp_uid);
    } else {
      alert(error_msg);
      setCurrentPage('FundingJoinPage');
    }
  };

  // 서버에 결제 정보 전달
  const createPayment = async (uid) => {
    try {
      const res = await postPayment(
        uid,
        fundingJoinData.fundingId,
        fundingJoinData.contributionAmount,
      );
      setCurrentPage('CompletePage');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    requestPayment();
  }, []);

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
