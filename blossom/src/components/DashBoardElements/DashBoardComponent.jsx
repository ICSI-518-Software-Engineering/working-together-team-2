// dashboard.jsx

import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DashboardComponent = () => {
  const navigation = useNavigate();

  const handleShowCatalog = () => {
    navigation.navigate('Catalog');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <style>{`
        .dashboard-card {
          border: none;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
          height: 200px; /* Set a fixed height for the cards */
          display: flex; /* Use flexbox to align content vertically */
          flex-direction: column; /* Align content vertically */
        }

        .dashboard-card:hover {
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }

        .card-body {
          flex: 1; /* Allow the card body to expand to fill the remaining space */
        }
      `}</style>
      <Row className="mb-3">
        <Col>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Orders pending</Card.Title>
              <Card.Text>
                View orders that are pending for processing.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Orders in Progress</Card.Title>
              <Card.Text>
                View orders that are currently being processed.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Orders delivered</Card.Title>
              <Card.Text>
                View orders that have been successfully delivered.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardComponent;
