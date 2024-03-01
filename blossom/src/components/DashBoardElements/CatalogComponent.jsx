import React, { useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';

const CatalogComponent = () => {
  // State to store existing items for flowers, vases, and wrappings
  const [flowers, setFlowers] = useState([]);
  const [vases, setVases] = useState([]);
  const [wrappings, setWrappings] = useState([]);

  // State for new item details
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [selectedItemType, setSelectedItemType] = useState('flowers'); // Default to flowers

  // Function to handle form submission to add a new item
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Add the new item to the selected item type in the Firestore catalog
      // await addCatalogItem(selectedItemType, newItemName, parseFloat(newItemPrice));
      // Update the local state array based on the selected item type
      switch (selectedItemType) {
        case 'flowers':
          setFlowers([...flowers, { name: newItemName, price: parseFloat(newItemPrice) }]);
          break;
        case 'vases':
          setVases([...vases, { name: newItemName, price: parseFloat(newItemPrice) }]);
          break;
        case 'wrappings':
          setWrappings([...wrappings, { name: newItemName, price: parseFloat(newItemPrice) }]);
          break;
        default:
          break;
      }
      // Reset the form fields
      setNewItemName('');
      setNewItemPrice('');
    } catch (error) {
      console.error('Error adding item to catalog:', error);
    }
  };

  return (
    <div>
      <h2>Catalog</h2>
      {/* Table to display existing items for flowers */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {selectedItemType === 'flowers' &&
            flowers.map((flower, index) => (
              <tr key={index}>
                <td>{flower.name}</td>
                <td>{flower.price}</td>
              </tr>
            ))}
          {selectedItemType === 'vases' &&
            vases.map((vase, index) => (
              <tr key={index}>
                <td>{vase.name}</td>
                <td>{vase.price}</td>
              </tr>
            ))}
          {selectedItemType === 'wrappings' &&
            wrappings.map((wrapping, index) => (
              <tr key={index}>
                <td>{wrapping.name}</td>
                <td>{wrapping.price}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* Form to add a new item */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Enter item name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              required
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              placeholder="Enter price (USD)"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              required
            />
          </Col>
          <Col>
            <Form.Select
              value={selectedItemType}
              onChange={(e) => setSelectedItemType(e.target.value)}
            >
              <option value="flowers">Flowers</option>
              <option value="vases">Vases</option>
              <option value="wrappings">Wrappings</option>
            </Form.Select>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Add to Catalog
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CatalogComponent;
