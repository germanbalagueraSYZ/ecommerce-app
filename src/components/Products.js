import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const ProductsContainer = styled.div`
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

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, 'products');
                const productsSnapshot = await getDocs(productsCollection);
                const productsData = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setProducts(productsData);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <ProductsContainer>
            <Title>Products</Title>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {products.map((product) => (
                <Product key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                </Product>
            ))}
        </ProductsContainer>
    );
};

export default Products;
