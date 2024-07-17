import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            dispatch({ type: 'LOGIN_SUCCESS', payload: userCredential.user });
            navigate('/products');
        } catch (error) {
            setError(`Error during login: ${error.message}`);
            console.error("Error during login:", error);
        }
    };

    return (
        <HomeContainer>
            <Title>Login</Title>
            <Form onSubmit={handleLogin}>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <Button type="submit">Login</Button>
            </Form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <StyledLink to="/signup">Don't have an account? Sign up</StyledLink>
        </HomeContainer>
    );
};

export default Home;