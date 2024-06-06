import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

const Success = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    const approvePayment = async () => {
      try {
        const authToken = 'Basic ' + btoa('test_sk_QbgMGZzorzDNmGElEvov3l5E1em4:'); // 시크릿 키를 Base64로 인코딩

        // 인스턴스 생성
        const instance = axios.create({
          headers: {
            'Authorization': authToken,
            'Content-Type': 'application/json',
          },
        });

        // 인스턴스로 요청 보내기
        const response = await instance.post('https://api.tosspayments.com/v1/payments/confirm', {
          paymentKey,
          orderId,
          amount,
        });

        console.log('Payment approved:', response.data);
      } catch (error) {
        console.error('Failed to approve payment:', error);
      }
    };

    if (paymentKey && orderId && amount) {
      approvePayment();
    }

    const redirectTimer = setTimeout(() => {
      history.push('/main');
    }, 100000);

    return () => clearTimeout(redirectTimer);
  }, [paymentKey, orderId, amount, history]);

  const handleConfirm = () => {
    history.push('/main');
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>결제 성공</h2>
        <p>주문번호: {orderId}</p>
        <p>결제 금액: {amount}원</p>
        <button onClick={handleConfirm}>확인</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  box: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
};

export default Success;