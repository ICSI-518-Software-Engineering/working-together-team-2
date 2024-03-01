import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Table } from 'react-bootstrap';
import CustomNavBar from '../components/CustomNavBar';
import { Link } from 'react-router-dom';
import backgroundImage from '../content/assets/Ncsk4W.jpg'; // Import your background image

const Dashboard = ({ userName }) => { // Accept userName as a prop
  const [showOrderListingsModal, setShowOrderListingsModal] = useState(false);
  const [showAllOrdersModal, setShowAllOrdersModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleCloseOrderListingsModal = () => setShowOrderListingsModal(false);
  const handleShowOrderListingsModal = () => setShowOrderListingsModal(true);

  const handleCloseAllOrdersModal = () => setShowAllOrdersModal(false);
  const handleShowAllOrdersModal = () => setShowAllOrdersModal(true);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    // You can perform filtering based on the selected date here
  };

  const renderSampleTableRows = () => {
    const rows = [];
    for (let i = 0; i < 9; i++) {
      rows.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>Sample Bouquet {i + 1}</td>
          <td>2024-02-1{i + 1}</td>
          <td>${Math.floor(Math.random() * 100)}.00</td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <CustomNavBar />
      <Container className="mt-5">
        {/* Welcome user */}
        <Row>
          <Col>
            <h1>Welcome, {userName}!</h1> {/* Display user's name */}
          </Col>
        </Row>
        {/* Date Filter */}
        <Row>
          <Col>
            <label htmlFor="dateFilter">Filter by Date:</label>
            <input type="date" id="dateFilter" value={selectedDate} onChange={handleDateChange} />
          </Col>
        </Row>
        <Row>
          {/* Three square cards on the left */}
          <Col xs={3}>
            <Card className="mb-3" style={{ height: '33vh' }}>
              <Card.Body>
                <Card.Title>Order Placement</Card.Title>
                <Link to="/Order">
                  <Button variant="beige" block>Go to Order Placement</Button>
                </Link>
              </Card.Body>
            </Card>
            <Card className="mb-3" style={{ height: '33vh' }}>
              <Card.Body>
                <Card.Title>Order Listings</Card.Title>
                <Button variant="beige" block onClick={handleShowOrderListingsModal}>Go to Order Listings</Button>
              </Card.Body>
            </Card>
            <Card style={{ height: '33vh' }}>
              <Card.Body>
                <Card.Title>Customers Details</Card.Title>
                <Button variant="beige" block onClick={handleShowAllOrdersModal}>Go to Customers</Button>
              </Card.Body>
            </Card>
          </Col>
          {/* Three rectangular cards below the navbar */}
          <Col xs={9}>
            <Row>
              <Col md={4} className="mb-3">
                <Card style={{ height: '33vh' }}>
                  <Card.Body>
                    <Card.Title>Yet to be delivered </Card.Title>
                    <Card.Text>15 Orders are waiting </Card.Text>
                    <Button variant="beige" block>Start Delivering</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card style={{ height: '33vh' }}>
                  <Card.Body>
                    <Card.Title>Yet to be designed</Card.Title>
                    <Card.Text>13 Orders are waiting</Card.Text>
                    <Button variant="beige" block>Start Preparing</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card style={{ height: '33vh' }}>
                  <Card.Body>
                    <Card.Title>Completed</Card.Title>
                    <Card.Text>13 orders are completed</Card.Text>
                    <Button variant="beige" block>View Orders</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Modal for Order Listings */}
      <Modal show={showOrderListingsModal} onHide={handleCloseOrderListingsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Listings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Bouquet Description</th>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {renderSampleTableRows()}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="beige" onClick={handleCloseOrderListingsModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for All Orders */}
      <Modal show={showAllOrdersModal} onHide={handleCloseAllOrdersModal}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Bouquet Description</th>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {renderSampleTableRows()}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="beige" onClick={handleCloseAllOrdersModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;
