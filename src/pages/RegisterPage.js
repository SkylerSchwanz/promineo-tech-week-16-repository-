import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { HeaderContainer } from '../components/HeaderContainer';
import Register from '../components/Register';
import styles from '../styles/LoginPage.module.css';

export function RegisterPage() {
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSuccessfulRegister = () => {
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
      <Register onSuccessfulRegister={handleSuccessfulRegister} onError={handleError} />
    </div>
  );
}
