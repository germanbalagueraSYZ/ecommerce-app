import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import styled from 'styled-components';

const AdminContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Title = styled.h2`
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
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

const Admin = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await addDoc(collection(db, 'products'), {
                name,
                description,
                price: parseFloat(price),
            });
            setMessage('Product added successfully!');
            setName('');
            setDescription('');
            setPrice('');
        } catch (error) {
            console.error("Error adding product:", error);
            setMessage('Error adding product');
        }
    };

    return (
        <AdminContainer>
            <Title>Add New Product</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    required
                />
                <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product Description"
                    required
                />
                <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Product Price"
                    required
                />
                <Button type="submit">Add Product</Button>
            </Form>
            {message && <p>{message}</p>}
        </AdminContainer>
    );
};

export default Admin;
