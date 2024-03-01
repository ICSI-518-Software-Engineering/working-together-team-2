import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function CustomerLoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isVendor: false, // Set isVendor to false for customers
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Set isVendor field to false for customers
      const dataToSend = { ...formData, isVendor: false };
      const response = await axios.post('/api/auth/login', dataToSend);
      console.log('Login successful:', response.data);
      // Redirect to dashboard after successful login
      window.location.href = '/Order';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="florist-page">
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card className="bg-white shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">Customer Login</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="beige" type="submit" className="btn btn-block">
                  Login
                </Button>
              </Form>
              <p className="text-center mt-3">
                Don't have an account? <Link to="/SignUp">Sign up</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CustomerLoginForm;
