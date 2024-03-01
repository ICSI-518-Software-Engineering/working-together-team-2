// LoginCards.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function LoginCards() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={4}>
          <Card style={{marginBottom: '20px', transition: 'all 0.3s ease'}} className="shadow-lg">
            <Card.Img style={{transition: 'transform 0.3s ease'}} variant="top" src="./assets/vendor.svg" />
            <Card.Body>
              <Card.Title style={{fontSize: '1.5rem', fontWeight: 'bold'}} className="text-center mb-4">Are you a Vendor?</Card.Title>
              <Link to="/VendorLogin"> {/* Replace anchor tag with Link */}
                <Button variant="beige" className="btn btn-beige btn-block" style={{ backgroundColor: 'beige', color: '#333', fontWeight: 'bold' }}>Click here to login</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{marginBottom: '20px', transition: 'all 0.3s ease'}} className="shadow-lg">
            <Card.Img style={{transition: 'transform 0.3s ease'}} variant="top" src="./assets/customer.svg" />
            <Card.Body>
              <Card.Title style={{fontSize: '1.5rem', fontWeight: 'bold'}} className="text-center mb-4">Are you a Customer?</Card.Title>
              <Link to="/CustomerLogin"> {/* Replace anchor tag with Link */}
                <Button variant="beige" className="btn btn-beige btn-block" style={{ backgroundColor: 'beige', color: '#333', fontWeight: 'bold' }}>Click here to login</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginCards;
