import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isVendor: false,
  });
  const [message, setMessage] = useState(null);

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
      const response = await axios.post('/api/auth/signup', formData);
      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="bg-white shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">Sign Up</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="signupUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signupEmail">
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

                <Form.Group className="mb-3" controlId="signupPassword">
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

                <Form.Group className="mb-3 form-check" controlId="signupType">
                  <Form.Check
                    type="checkbox"
                    label="Sign up as vendor"
                    name="isVendor"
                    checked={formData.isVendor}
                    onChange={(e) => setFormData({ ...formData, isVendor: e.target.checked })}
                  />
                </Form.Group>

                <Button variant="beige" type="submit" className="btn btn-block">
                  Sign Up
                </Button>
              </Form>
              {message && <p className="text-center mt-3">{message}</p>}
              <p className="text-center mt-3">
                Already have an account? <Link to="/">Login</Link>{' '}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SignUpForm;
