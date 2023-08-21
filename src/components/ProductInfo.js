import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/ProductDetail.module.css';

function ProductInfo({ category, title, price, rating }) {
  return (
    <div>
      <p>{category}</p>
      <h2 className={styles['product-title']}>{title}</h2>
      <h2>${price}</h2>
      <span>
        <FontAwesomeIcon icon={faStar} /> {rating.rate} <span className={styles['product-rating-count']}>({rating.count})</span>
      </span>
    </div>
  );
}

export default ProductInfo;
