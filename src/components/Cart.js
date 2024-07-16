import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const CartContainer = styled.div`
    padding: 20px;
`;

const Product = styled.div`
    border: 1px solid #ddd;
    padding: 20px;
    margin: 10px 0;
    border-radius: 4px;
`;

const Title = styled.h2`
    color: #333;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
    background-color: #0056b3;
    }
`;

const Cart = () => {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    return (
        <CartContainer>
            <Title>Cart</Title>
            {items.length === 0 && <p>Your cart is empty</p>}
            {items.map((item) => (
                <Product key={item.id}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>${item.price}</p>
                    <Button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</Button>
                </Product>
            ))}
        </CartContainer>
    );
};

export default Cart;