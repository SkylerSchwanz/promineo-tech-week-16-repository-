import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { HeaderContainer } from '../components/HeaderContainer';
import styles from '../styles/CartPage.module.css';
import { placeOrder } from '../api/apiService';
import { clearCart, fetchCartItems } from '../redux/slices/cartSlice';
import { CartSummary } from '../components/CartSummary';
import { CartContainer } from '../components/CartContainer';

export function CartPage() {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handlePlaceOrder = () => {
    placeOrder()
      .then(() => {
        dispatch(clearCart());
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  };

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const totalAmount = cartState.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <HeaderContainer />
      <div className={`${styles['container-div']} container mt-4`}>
        <Row>
          <Col md={8}>
            <CartContainer />
          </Col>

          <Col md={4}>
            <CartSummary cartItems={cartState.items} totalAmount={totalAmount} handlePlaceOrder={handlePlaceOrder} />
          </Col>
        </Row>
      </div>
    </>
  );
}
