import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Button, Collapse, Form, Row, Col } from 'react-bootstrap';
import styles from '../styles/CartPage.module.css';

export function CartItem({ item, onRemoveFromCart, onToggleDetails, onUpdateQuantity }) {
  // Get the state of the item's quantity from the Redux store
  const quantity = useSelector((state) => state.cart.items.find((cartItem) => cartItem.id === item.id)?.quantity);

  // Use a local state variable to keep track of the current value of the input field
  const [inputValue, setInputValue] = useState(quantity);

  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5>
          <b>{item.title}</b>
        </h5>
        <div>
          x{quantity} ${item.price * quantity}
        </div>
      </Card.Header>
      <Collapse in={item.showDetails}>
        <Card.Body className={styles['card-body']}>
          <Row>
            <Col className={styles['image-column']}>
              <div className={`${styles['cart-image']} d-flex justify-content-center align-items-center`}>
                <img src={item.image} alt={item.name} className={`${styles['cart-image-img']} img-fluid`} />
              </div>
            </Col>
            <Col>
              <h3>Additional Information:</h3>
              <div className={`ml-4 ${styles['cart-info']}`}>
                <p>Category: {item.category}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Rating: {item.rating.rate}</p>
                <p>Rating Count: {item.rating.count}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <h3>Description:</h3>
            <p>{item.description}</p>
          </Row>
          <Row className="mt-3">
            <Col xs={6}>
              <Form.Control type="number" min="1" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </Col>
            <Col xs={6}>
              <Button variant="primary" onClick={() => onUpdateQuantity(item.id, inputValue)}>
                Update Quantity
              </Button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12}>
              <Button variant="danger" onClick={() => onRemoveFromCart(item.id)}>
                Delete
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Collapse>
      <Button variant="link" onClick={() => onToggleDetails(item.id)}>
        {item.showDetails ? 'Hide Details' : 'Show Details'}
      </Button>
    </Card>
  );
}
