import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../api/apiService';
import { removeItemFromCart, toggleItemDetails, fetchCartItems } from '../redux/slices/cartSlice';
import { CartItem } from '../components/CartItem';

export function CartContainer() {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const toggleDetails = (itemID) => dispatch(toggleItemDetails(itemID));

  const handleRemoveFromCart = (productId) => {
    removeFromCart({ productId })
      .then(() => {
        dispatch(removeItemFromCart(productId));
      })
      .catch((error) => {
        console.error('Error removing from cart:', error);
      });
  };

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
        <>
          <h1>Your Cart</h1>
          {cartState.isLoading ? (
            <h1>Loading...</h1>
          ) : (
            cartState.items.map((item, index) => <CartItem key={index} item={item} onRemoveFromCart={handleRemoveFromCart} onToggleDetails={toggleDetails} />)
          )}
        </>
  );
}
