import React from 'react';
import { useSelector } from 'react-redux';
import { ProductCard } from './ProductCard';
import Filters from './Filters';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/ProductContainer.module.css';
import { Link } from 'react-router-dom';

function ProductContainer() {
  const products = useSelector((state) => state.products.products);
  const filters = useSelector((state) => state.filters);

  // Apply filters based on the filters object
  const filteredProducts = products.filter((product) => {
    // Apply your filter logic using the filters object
    const nameMatch = product.title.toLowerCase().includes(filters.nameFilter.toLowerCase());
    const categoryMatch = product.category.toLowerCase() === filters.categoryFilter.toLowerCase();
    const ratingMatch = product.rating.rate >= filters.minRatingFilter;
    const priceMatch = product.price >= filters.minPriceFilter && product.price <= filters.maxPriceFilter;

    // Return true if no filters are applied or if all filter conditions match
    return (
      (!filters.nameFilter || nameMatch) &&
      (!filters.categoryFilter || categoryMatch) &&
      (!filters.minRatingFilter || ratingMatch) &&
      (!filters.minPriceFilter || priceMatch)
    );
  });

  return (
    <Container fluid className={styles['product-container']}>
      <Row className={styles['filter-row']} style={{ padding: '10vh 0' }}>
        <Col xs={12} md={2} className="p-3">
          {/* Filters component */}
          <Filters />
        </Col>

        <Col xs={12} md={8}>
          {/* Render filteredProducts */}
          <Row xs={2} md={3} lg={4} className="g-4">
            {filteredProducts.map((product) => (
              <Col key={product.id}>
                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                  <ProductCard product={product} />
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductContainer;
