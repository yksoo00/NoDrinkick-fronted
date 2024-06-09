import React, { useEffect, useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const clientKey = 'test_ck_DnyRpQWGrNWwyL1BeLW08Kwv1M9E';

function Payment({ amount, customerName }) { // amount와 customerName props 추가
  const [isTossLoaded, setIsTossLoaded] = useState(false);


  console.log(amount);
  console.log(customerName);
  useEffect(() => {
    let tossPayments;

    loadTossPayments(clientKey).then(tp => {
      tossPayments = tp;
      window.tossPayments = tossPayments;
      setIsTossLoaded(true);
    }).catch(error => {
      console.error('Failed to load Toss Payments:', error);
    });

    return () => {
      if (tossPayments) {
        // tossPayments.cancelPayment();
      }
    };
  }, []);

  useEffect(() => {
    if (isTossLoaded) {
      handlePayment();
    }
  }, [isTossLoaded]);

  const handlePayment = () => {
    const random = new Date().getTime() + Math.random();
    const randomId = btoa(random);

    const orderId = randomId;
    const orderName = '킥보드 이용 결제 1건';

    const convertAppScheme = (url) => {
      const intentRegex = /^intent:\/\/(.+?)#Intent;(.+);end;$/;
      const match = url.match(intentRegex);
      if (match) {
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
        //successUrl: `http://localhost:3000/success?orderId=${orderId}&amount=${amount}`,
        //failUrl: `http://localhost:3000/fail?orderId=${orderId}&amount=${amount}`,

        flowMode: 'DIRECT',
        easyPay: '토스페이',
      }).then((response) => {
        if (response.paymentUrl) {
          const appSchemeUrl = convertAppScheme(response.paymentUrl);
          window.location.href = appSchemeUrl;
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
      <h1>결제 진행 중...</h1>
    </div>
  );
}

export default Payment;
