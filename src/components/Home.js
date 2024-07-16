import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Title = styled.h2`
    color: #333;
`;

const StyledLink = styled(Link)`
    margin: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    &:hover {
    background-color: #0056b3;
    }
`;

const Home = () => {
    return (
        <HomeContainer>
            <Title>Welcome to E-commerce App</Title>
            <StyledLink to="/products">View Products</StyledLink>
            <StyledLink to="/cart">View Cart</StyledLink>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/signup">Signup</StyledLink>
        </HomeContainer>
    );
};

export default Home;
