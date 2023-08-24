import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem } from '../api/apiService';
import { removeItemFromCart, toggleItemDetails, updateItemQuantity, fetchCartItems } from '../redux/slices/cartSlice';
import { CartItem } from './CartItem';

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

  const handleUpdateQuantity = (productId, quantity) => {
    quantity = quantity > 1 ? parseInt(quantity) : 1;
    updateCartItem({ productId, quantity })
      .then((data) => {
        // Update the cart item in the Redux store
        dispatch(updateItemQuantity({productId, quantity}));
      })
      .catch((error) => {
        console.error('Error updating cart item:', error);
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
        cartState.items.map((item, index) => (
          <CartItem key={item.id} item={item} onRemoveFromCart={handleRemoveFromCart} onToggleDetails={toggleDetails} onUpdateQuantity={handleUpdateQuantity} />
        ))
      )}
    </>
  );
}
