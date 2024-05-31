// src/components/Success.js
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
        const response = await axios.post('https://api.nodrinkick.com/api/payment-result', {
          paymentKey,
          orderId,
          amount,
          success: true,
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
    }, 10000);

    return () => clearTimeout(redirectTimer);
  }, [paymentKey, orderId, amount, history]);

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>결제 성공</h2>
        <p>주문번호: {orderId}</p>
        <p>결제 금액: {amount}원</p>
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
