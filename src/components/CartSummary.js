import React from "react";
import { Button } from "react-bootstrap";

export function CartSummary({ cartItems, totalAmount, handlePlaceOrder }) {
  return (
    <div className="text-center">
      <h2>Cart Summary</h2>
      <p>Total Items: {cartItems.length}</p>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <Button variant="primary" onClick={handlePlaceOrder}>
        Purchase Items
      </Button>
    </div>
  );
}
