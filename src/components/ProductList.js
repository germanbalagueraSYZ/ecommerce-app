import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
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
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #c9302c;
  }
`;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

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

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'products', id));
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            setError(`Error: ${error.message}`);
            console.error("Error deleting product:", error);
        }
    };

    return (
        <ProductsContainer>
            <Title>Product List</Title>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {products.map((product) => (
                <Product key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <Button onClick={() => handleDelete(product.id)}>Delete</Button>
                </Product>
            ))}
        </ProductsContainer>
    );
};

export default ProductList;