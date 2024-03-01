import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ActionCards() {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={4}>
                    <Card className="shadow-lg">
                        <Card.Img src="./assets/flower1.svg" alt="Sample Image 1" />
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Premade bouquets</Card.Title>
                            <Button  className="btn-dark btn-block" style={{ fontWeight: 'bold' }}><Link to="/Order1">Click here to order</Link></Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-lg">
                        <Card.Img src="./assets/flower2.svg" alt="Sample Image 2" />
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Curated as per the personality of your loved ones</Card.Title>
                            <Button  className="btn-dark btn-block" style={{ fontWeight: 'bold' }}><Link to="/Order2">Click here to order</Link></Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-lg">
                        <Card.Img src="./assets/flower3.svg" alt="Sample Image 3" />
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Make your own bouquet</Card.Title>
                            <Button  className="btn-dark btn-block" style={{ fontWeight: 'bold' }}><Link to="/Order3">Click here to order</Link></Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ActionCards;
