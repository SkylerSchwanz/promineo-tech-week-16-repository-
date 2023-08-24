import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProductById } from '../redux/slices/productSlice';
import { Container, Row, Col } from 'react-bootstrap';
import { HeaderContainer } from '../components/HeaderContainer';
import styles from '../styles/ProductDetail.module.css';
import { addToCart } from '../api/apiService';
import ProductInfo from '../components/ProductInfo';

function ProductDetail() {
  const { id } = useParams();
  const product = useSelector((state) => selectProductById(state, parseInt(id)));
  const username = useSelector((state) => state.auth.username);

  async function handleAddToCart() {
    // Use the existing 'product' object from the outer scope
    const productPayload = {
      id: product.id,
    };

    try {
      // Call the addToCart function and pass in the user ID and product ID
      await addToCart({ username, productId: productPayload.id });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderContainer />
      <Container style={{ padding: '10vh 0' }}>
        <Link className={styles.Link} to={`/`} style={{ textDecoration: 'none' }}>
          <h1>Back</h1>
        </Link>
        <Row>
          <Col xs={12} md={4}>
            <img src={product.image} alt={product.title} style={{ width: '100%', maxWidth: '100%' }} />
          </Col>

          <Col xs={12} md={6} className="m-auto">
            <div>
              <ProductInfo category={product.category} title={product.title} price={product.price} rating={product.rating} />
              <div>
                <button onClick={handleAddToCart} className={styles['add-to-cart-button']}>
                  Add to cart
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductDetail;
