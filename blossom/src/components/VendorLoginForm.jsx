import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function VendorLoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isVendor: true // Set isVendor to true by default for vendor login
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
      const response = await axios.post('/api/auth/login', formData);
      console.log('Login successful:', response.data);

      // Assuming response.data.userId exists
      const userId = response.data.userId;

      // Redirect to dashboard after successful login with the userId
      window.location.href = `/dashboard/${userId}`;
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure, e.g., display error message
    }
  };

  return (
    <div className="florist-page">
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card className="bg-white shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">Vendor Login</Card.Title>
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

                {/* Hidden field to include isVendor attribute */}
                <input type="hidden" name="isVendor" value={formData.isVendor} />

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

export default VendorLoginForm;
