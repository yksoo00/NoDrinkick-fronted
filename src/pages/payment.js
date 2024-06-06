import React, { useEffect } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const clientKey = 'test_ck_DnyRpQWGrNWwyL1BeLW08Kwv1M9E';

function Payment() {
  useEffect(() => {
    let tossPayments;

    loadTossPayments(clientKey).then(tp => {
      tossPayments = tp;
      window.tossPayments = tossPayments; // tossPayments 객체를 전역에 저장
    }).catch(error => {
      console.error('Failed to load Toss Payments:', error);
    });

    return () => {
      if (tossPayments) {
        // tossPayments.cancelPayment();
      }
    };
  }, []);

  const handlePayment = () => {
    const random = new Date().getTime() + Math.random(); // 난수 생성
    const randomId = btoa(random); // 난수를 btoa(base64)로 인코딩한 orderID

    const amount = 1500;
    const orderId = randomId;
    const orderName = '킥보드 이용 결제 1건';
    const customerName = '노드링킥 결제';

    const convertAppScheme = (url) => {
      const intentRegex = /^intent:\/\/(.+?)#Intent;(.+);end;$/;
      const match = url.match(intentRegex);
      if (match) {
        // 앱 스킴 URL로 변환
        return `supertoss://${match[1]}`;
      }
      return url;
    };

    if (window.tossPayments) {
      window.tossPayments.requestPayment('카드', {
        amount,
        orderId,
        orderName,
        customerName,
        successUrl: `http://nodrinkick.com/success?orderId=${orderId}&amount=${amount}`,
        failUrl: `http://nodrinkick.com/fail?orderId=${orderId}&amount=${amount}`,
        flowMode: 'DIRECT',
        easyPay: '토스페이',
      }).then((response) => {
        if (response.paymentUrl) {
          const appSchemeUrl = convertAppScheme(response.paymentUrl); // URL 변환 함수 호출
          window.location.href = appSchemeUrl; // 변환된 URL로 이동
        }
      }).catch(function (error) {
        if (error.code === 'USER_CANCEL') {
          // 결제 고객이 결제창을 닫았을 때 에러 처리
        } else if (error.code === 'INVALID_CARD_COMPANY') {
          // 유효하지 않은 카드 코드에 대한 에러 처리
        } else {
          console.error('Payment error:', error);
        }
      });
    } else {
      console.error('Toss Payments is not loaded.');
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={handlePayment}>카드결제</button>
    </div>
  );
}

export default Payment;