import React from 'react';
import { Card } from 'react-bootstrap';
import styles from '../styles/ProductContainer.module.css';

export function ProductCard({ product, onClick }) {
  const { image, category, title, price } = product;
  return (
    <Card className={`${styles.Card} h-100 Card`} style={{ cursor: 'pointer', border: 'none'}} onClick={onClick}>
      <div className="h-100" style={{ backgroundColor: 'white', padding: '10px', alignItems: 'center', display: 'flex' }}>
        <Card.Img variant="top" src={image} className="w-100" />
      </div>
      <Card.Body style={{ whiteSpace: 'nowrap', width: '100%' }}>
        <Card.Text className={styles['category-text']}>{category}</Card.Text>
        <Card.Title className={styles['title-text']} style={{ overflowX: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {title}
        </Card.Title>
        <Card.Text className={styles['price-text']}>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
