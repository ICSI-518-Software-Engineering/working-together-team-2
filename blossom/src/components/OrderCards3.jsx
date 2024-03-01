import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap';

function OrderCards3() {
  const [flowers, setFlowers] = useState([{ name: '', quantity: '' }]);
  const [wrappingType, setWrappingType] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');

  const handleAddFlower = () => {
    setFlowers([...flowers, { name: '', quantity: '' }]);
  };

  const handleFlowerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFlowers = [...flowers];
    updatedFlowers[index][name] = value;
    setFlowers(updatedFlowers);
  };

  const handleRemoveFlower = (index) => {
    const updatedFlowers = [...flowers];
    updatedFlowers.splice(index, 1);
    setFlowers(updatedFlowers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="florist-page">
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Order Flowers</h5>
                <Form onSubmit={handleSubmit} id="orderForm">
                  {/* Flower fields */}
                  {flowers.map((flower, index) => (
                    <div key={index} className="mb-3">
                      <label htmlFor={`flower${index}`} className="form-label">Flower {index + 1}</label>
                      <InputGroup>
                        <FormControl
                          type="text"
                          className="form-control"
                          id={`flower${index}`}
                          placeholder="Name of flower"
                          name="name"
                          value={flower.name}
                          onChange={(e) => handleFlowerChange(index, e)}
                        />
                        <select
                          className="form-select"
                          id={`flower${index}Quantity`}
                          name="quantity"
                          value={flower.quantity}
                          onChange={(e) => handleFlowerChange(index, e)}
                        >
                          <option selected>Quantity</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        {index > 0 && (
                          <Button variant="beige" onClick={() => handleRemoveFlower(index)}>
                            Remove
                          </Button>
                        )}
                      </InputGroup>
                    </div>
                  ))}
                  {/* Add more flowers button */}
                  <div className="mb-3">
                    <Button variant="beige" onClick={handleAddFlower}>Add Flower</Button>
                  </div>
                  {/* Type of wrapping */}
                  <div className="mb-3">
                    <label htmlFor="wrappingType" className="form-label">Type of Wrapping</label>
                    <select
                      className="form-select"
                      id="wrappingType"
                      value={wrappingType}
                      onChange={(e) => setWrappingType(e.target.value)}
                    >
                      <option selected>Select type of wrapping</option>
                      <option value="paper">Paper</option>
                      <option value="plastic">Plastic</option>
                      <option value="fabric">Fabric</option>
                    </select>
                  </div>
                  {/* Select vendor */}
                  <div className="mb-3">
                    <label htmlFor="selectVendor" className="form-label">Select Vendor</label>
                    <select
                      className="form-select"
                      id="selectVendor"
                      value={selectedVendor}
                      onChange={(e) => setSelectedVendor(e.target.value)}
                    >
                      <option selected>Select vendor</option>
                      <option value="vendor1">Vendor 1</option>
                      <option value="vendor2">Vendor 2</option>
                      <option value="vendor3">Vendor 3</option>
                    </select>
                  </div>
                  {/* Payment method */}
                  <div className="mb-3">
                    <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                    <select
                      className="form-select"
                      id="paymentMethod"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option selected>Select payment method</option>
                      <option value="creditCard">Credit Card</option>
                      <option value="paypal">Paypal</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                  {/* Toggle button for delivery options */}
                  <div className="mb-3">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="deliveryToggle"
                        checked={deliveryOption}
                        onChange={(e) => setDeliveryOption(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="deliveryToggle">Delivery to Home</label>
                    </div>
                  </div>
                  <Button type="submit" className="btn btn-beige btn-block">Customize</Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OrderCards3;
