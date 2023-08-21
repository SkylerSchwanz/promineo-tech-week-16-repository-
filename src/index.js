import ReactDOM from 'react-dom/client';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchProducts } from './redux/slices/productSlice';
import ProductDetail from './pages/ProductDetail';
import { RegisterPage } from './pages/RegisterPage';
import { CartPage } from './pages/CartPage';

function App() {
  const dispatch = useDispatch();
  const tokenFromState = useSelector((state) => state.auth.token);
  const tokenFromLocalStorage = localStorage.getItem('accessToken'); // Assuming you store token as 'token' in local storage
  const isAuthenticated = tokenFromState || tokenFromLocalStorage;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Use a Route for authentication check */}
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
