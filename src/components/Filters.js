import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setNameFilter, setCategoryFilter, setMinRatingFilter, setMaxPriceFilter, setMinPriceFilter, clearFilters } from '../redux/slices/filterSlice';
import styles from '../styles/ProductContainer.module.css';

const availableCategories = ["men's clothing", "women's clothing", 'jewelery', 'electronics'];

function Filters() {
  const dispatch = useDispatch();
  const [nameFilter, setNameFilterValue] = useState('');
  const [categoryFilter, setCategoryFilterValue] = useState('');
  const [minRatingFilter, setMinRatingFilterValue] = useState(0);
  const [minPriceFilter, setMinPriceFilterValue] = useState(1);
  const [maxPriceFilter, setMaxPriceFilterValue] = useState(Infinity);

  const handleClearFilters = () => {
    setNameFilterValue('');
    setCategoryFilterValue('');
    setMinRatingFilterValue(0);
    setMinPriceFilterValue(1);
    setMaxPriceFilterValue(Infinity);
    dispatch(clearFilters());
  }

  const handleApplyFilters = () => {
    dispatch(setNameFilter(nameFilter));
    dispatch(setCategoryFilter(categoryFilter));
    dispatch(setMinRatingFilter(minRatingFilter));
    dispatch(setMinPriceFilter(minPriceFilter));
    dispatch(setMaxPriceFilter(maxPriceFilter));
  };

  return (
    <Container className={styles['filters-container']}>
      <Row>
        <Col>
          <Form.Group controlId="nameFilter">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={nameFilter} onChange={(e) => setNameFilterValue(e.target.value)} placeholder="Filter by name" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="categoryFilter">
            <Form.Label>Category</Form.Label>
            {availableCategories.map((category, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                id={`categoryCheckbox-${index}`}
                label={category}
                checked={category === categoryFilter}
                onChange={() => setCategoryFilterValue(category)}
              />
            ))}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="priceRange">
            <Form.Label>Price Range</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="number"
                  value={minPriceFilter}
                  onChange={(e) => setMinPriceFilterValue(Number(e.target.value))}
                  placeholder="Minimum price"
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  value={maxPriceFilter}
                  onChange={(e) => setMaxPriceFilterValue(Number(e.target.value))}
                  placeholder="Maximum price"
                />
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="minRatingFilter">
            <Form.Label>Minimum Rating</Form.Label>
            <Form.Control
              type="number"
              value={minRatingFilter}
              onChange={(e) => setMinRatingFilterValue(Number(e.target.value))}
              placeholder="Minimum rating"
              min="0" // Set the minimum value for the input
              max="5" // Set the maximum value for the input
              step="0.5" // Set the step increment for decimal values
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <div className={`d-flex justify-content-between ${styles['buttons-container']}`}>
            <Button variant="primary" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
            <Button variant="secondary" onClick={handleClearFilters}>
              Reset Filters
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Filters;