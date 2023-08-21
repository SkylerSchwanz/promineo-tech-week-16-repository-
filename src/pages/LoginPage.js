import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { HeaderContainer } from '../components/HeaderContainer';
import Login from '../components/Login';
import styles from '../styles/LoginPage.module.css';

export function LoginPage() {
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in, and navigate to the home page if so
    if (token) {
      navigate('/');
    }
  }, [token, navigate]); // Add token and navigate as dependencies to useEffect

  const handleSuccessfulLogin = () => {
    setError(null);
    navigate('/');
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div>
      <HeaderContainer />
      {error && <p className={styles.error}>{error}</p>}
      <Login onSuccessfulLogin={handleSuccessfulLogin} onError={handleError} />
    </div>
  );
}
