import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import styles from '../styles/LoginPage.module.css';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:3001';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setRegisterError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Get the error message from the response
        setRegisterError(errorMessage || 'Error registering. Please try again.');
      } else {
        setRegisterError('');
        navigate('/login'); // Navigate to login page after successful registration
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setRegisterError('An error occurred during registration. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{ backgroundColor: 'transparent' }} className={styles['login-container']}>
      <Card className={styles['login-card']}>
        <Card.Body>
          <h1 className="mb-4" style={{ textAlign: 'center' }}>
            Register
          </h1>
          <Form onSubmit={handleSubmit}>
            {error && <p className="text-danger">{error}</p>}
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>
            <Button
              style={{
                margin: '15px auto', // This centers horizontally
                width: '75%',
                display: 'flex',
                justifyContent: 'center', // This centers vertically
                alignItems: 'center', // This centers vertically
              }}
              variant="primary"
              type="submit"
              disabled={isLoading}
              className={styles['login-button']}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </Form>
          <p className="mt-3" style={{ textAlign: 'center' }}>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
