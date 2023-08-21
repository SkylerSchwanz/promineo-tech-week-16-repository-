import React from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import styles from '../styles/CartPage.module.css'

export function CartItem({ item, index, onRemoveFromCart, onToggleDetails }) {
  return (
    <Card key={index} className="mb-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        {item.title}
        <Button variant="danger" onClick={() => onRemoveFromCart(item.id)}>
          Delete
        </Button>
      </Card.Header>
      <Collapse in={item.showDetails}>
        <Card.Body className={styles['card-body']}>
          <div className={styles['cart-image']}>
            <img src={item.image} alt={item.name} className="img-fluid" />
          </div>
          <div className={`ml-4 ${styles['cart-info']}`}>
            <p>Category: {item.category}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Rating: {item.rating.rate}</p>
            <p>Rating Count: {item.rating.count}</p>
          </div>
        </Card.Body>
      </Collapse>
      <Button variant="link" onClick={() => onToggleDetails(item.id)}>
        {item.showDetails ? 'Hide Details' : 'Show Details'}
      </Button>
    </Card>
  );
}
