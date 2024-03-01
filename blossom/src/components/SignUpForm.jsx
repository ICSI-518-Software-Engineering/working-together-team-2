// SignUpForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'; // Import axios for making API calls
import CustomNavBar from '../components/CustomNavBar';
import './SignUpForm.css';

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isVendor: false,
  });
  const [message, setMessage] = useState('');
  const [showPasswordInstructions, setShowPasswordInstructions] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
    setShowPasswordInstructions(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('/api/auth/signup', formData); // Make API call to sign up
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
    <>
      <CustomNavBar />
      <div className="signup-background">
        <div className="container mt-5">
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="signup-card">
                <Card.Body>
                  <Card.Title className="text-center mb-4">Sign Up</Card.Title>
                  {message && <Alert variant={message.includes('success') ? 'success' : 'danger'}>{message}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="signupUsername">
                      <Form.Label className="form-label">Username</Form.Label>
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
                      <Form.Label className="form-label">Email address</Form.Label>
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
                      <Form.Label className="form-label">Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handlePasswordChange}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                        title="Password must contain at least one digit, one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long."
                        required
                      />
                      {showPasswordInstructions && (
                        <Form.Text className="text-muted">Password must contain at least one digit, one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.</Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="confirmPassword">
                      <Form.Label className="form-label">Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
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

                    <Button variant="primary" type="submit" className="btn btn-block">
                      Sign Up
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
