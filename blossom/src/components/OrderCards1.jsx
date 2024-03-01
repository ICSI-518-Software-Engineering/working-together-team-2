import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const bouquetNames = [
    "Enchanted Garden Bouquet",
    "Sunset Serenade Bouquet",
    "Whispering Willow Bouquet",
    "Moonlit Majesty Bouquet",
    "Emerald Elegance Bouquet",
    "Sapphire Skies Bouquet",
    "Golden Harvest Bouquet",
    "Lavender Love Bouquet",
    "Ocean Breeze Bouquet",
    "Ruby Romance Bouquet",
    "Autumn Bliss Bouquet",
    "Starry Night Bouquet"
];

function OrderCards1() {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                {[...Array(12)].map((_, index) => {
                    const randomIndex = Math.floor(Math.random() * bouquetNames.length);
                    const randomName = bouquetNames[randomIndex];
                    return (
                        <Col md={4} key={index}>
                            <Card className="shadow-lg">
                                <Card.Img src={`./assets/flower${(index % 3) + 1}.svg`} alt={`Sample Image ${index % 3 + 1}`} />
                                <Card.Body>
                                    <Card.Title className="text-center mb-4">{randomName}</Card.Title>
                                    <Button href={`./order${(index % 3) + 1}.html`} className="btn-darl btn-block" style={{ fontWeight: 'bold' }}>Buy Now!</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}


export default OrderCards1;
