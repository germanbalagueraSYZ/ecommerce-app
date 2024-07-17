import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home'; // Anteriormente Login.js
import Signup from './components/Signup';
import Products from './components/Products';
import ProductList from './components/ProductList'; // Importar ProductList
import Cart from './components/Cart';
import Admin from './components/Admin';
import Navbar from './components/Navbar'; // Importar Navbar
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <div>
        {isAuthenticated && <Navbar />} {/* Mostrar Navbar solo si el usuario está autenticado */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/products"
            element={
              <ErrorBoundary>
                <Products />
              </ErrorBoundary>
            }
          />
          <Route path="/product-list" element={<ProductList />} /> {/* Añadir ruta para ProductList */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
