import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import styles from '../styles/LoginPage.module.css';

const API_URL = 'http://localhost:3001';

export default function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setLoginError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();

        if (response.status === 400) {
          setLoginError('Incorrect username or password');
        } else {
          setLoginError(errorMessage || 'An error occurred during login. Please try again later.');
        }
      } else {
        setLoginError(''); // Clear any previous error message
        const data = await response.json();
        if (data.accessToken) {
          dispatch(setCredentials({ username, accessToken: data.accessToken }));
          navigate('/'); // Navigate to home page after successful login
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('An error occurred during login. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{ backgroundColor: 'transparent' }} className={styles['login-container']}>
      <Card className={styles['login-card']}>
        <Card.Body>
          <h1 className="mb-4" style={{textAlign: 'center'}}>Login</h1>
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
                margin: '15px auto',
                width: '75%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              variant="primary"
              type="submit"
              disabled={isLoading}
              className={styles['login-button']}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </Form>
          <p className="mt-3" style={{textAlign: 'center'}}>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
