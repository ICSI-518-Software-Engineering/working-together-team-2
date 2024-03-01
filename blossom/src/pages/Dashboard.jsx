import React, { useState, useEffect } from 'react';
import { Row, Col, Nav, Navbar, Container, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Dashboard.css';
import axios from 'axios';

function Dashboard({ userName }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuVisible(!sideMenuVisible);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarVisible(false);
    generateOrdersForNextDays(date);
  };

  const generateOrdersForNextDays = async (startDate) => {
    // API call to fetch orders
    try {
      const response = await axios.get(`http://localhost:8086/api/orders`);
      const ordersData = response.data;
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    generateOrdersForNextDays(selectedDate);
  }, []);

  const getOrdersForSelectedDateAndNextTwoDays = () => {
    const selectedDateOrders = orders.filter(order => {
      const orderDate = new Date(order.date);
      return (
        orderDate.toDateString() === selectedDate.toDateString() ||
        orderDate.toDateString() === new Date(selectedDate.getTime() + 86400000).toDateString() || // Next day
        orderDate.toDateString() === new Date(selectedDate.getTime() + 2 * 86400000).toDateString() // Two days ahead
      );
    });
    return selectedDateOrders;
  };

  const handleFilterClick = () => {
    setCalendarVisible(!calendarVisible);
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className="dashboard">
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home">Your Brand</Navbar.Brand>
          <Navbar.Toggle onClick={toggleSideMenu} />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Button variant="secondary" onClick={handleFilterClick}>Filter</Button>
            </Nav>
            <Nav>
              <Nav.Link>{userName}</Nav.Link>
              <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row>
        <Col md={2} className={`side-menu ${sideMenuVisible ? 'show' : 'hide'}`}>
          <div className="menu-logo">Menu</div>
          <Nav className="flex-column">
            <Nav.Link>Create Order</Nav.Link>
            <Nav.Link>View Order</Nav.Link>
            <Nav.Link>Catalog</Nav.Link>
            <Nav.Link>Customer Details</Nav.Link>
            <Nav.Link>Current Dashboard</Nav.Link>
          </Nav>
        </Col>
        <Col md={10}>
          <h1>Dashboard</h1>
          {calendarVisible && (
            <div className="calendar">
              <Calendar onChange={handleDateChange} value={selectedDate} />
            </div>
          )}
          <div className="order-counts">
            {getOrdersForSelectedDateAndNextTwoDays().map((order, index) => (
              <div key={index} className="order-item">
                <p>{order.date}</p>
                <div className="status-counts">
                  <div className="status-box yet-to-deliver">Yet to deliver: {order.yetToDeliverCount}</div>
                  <div className="status-box yet-to-prepare">Yet to prepare: {order.yetToPrepareCount}</div>
                  <div className="status-box delivered">Delivered: {order.deliveredCount}</div>
                  <div className="status-box store-pickup">Store Pickup: {order.storePickupCount}</div>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
