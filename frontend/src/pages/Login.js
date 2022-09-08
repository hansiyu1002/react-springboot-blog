import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { useLoginUserMutation } from '../services/apiSlice';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginUser, { isSuccess, isError, error }] = useLoginUserMutation();
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        /*
        axios
            .post('http://localhost:3000/users/login', { email, password })
            .then(({ data }) => console.log(data))
            .catch((err) => console.log(err));
        */
        loginUser({ email, password });
    }

    if (isSuccess) {
        setTimeout(() => {
            navigate("/my_blogs");
        }, 500);
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return(
        <Container>
            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-center">
                    <Form className="login_form" onSubmit={handleLogin}>
                        <h1 className="text-center">Login</h1>
                        {isError && <p className="alert alert-danger">{error.data}</p>}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <div className="py-4">
                            <p>
                                Don't have an account? <Link to="/signup">Signup</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={6} className="login_bg_container" />
            </Row>
        </Container>
    );
}

export default Login