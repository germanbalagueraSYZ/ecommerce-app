import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #007bff;
`;

const NavLinks = styled.div`
  display: flex;
`;

const NavLink = styled(Link)`
  margin: 0 10px;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  background-color: #0056b3;
  border-radius: 4px;

  &:hover {
    background-color: #003d80;
  }
`;

const LogoutButton = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #c9302c;
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
      navigate('/');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <NavContainer>
      <NavLinks>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/product-list">List Products</NavLink> {/* Nuevo enlace para listar productos */}
      </NavLinks>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </NavContainer>
  );
};

export default Navbar;