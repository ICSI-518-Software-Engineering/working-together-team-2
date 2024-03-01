import React, { useState } from 'react';
import { Modal, Button, Container, Form, Row, Col } from 'react-bootstrap';
import CustomNavBar from '../components/CustomNavBar';

function Order2() {
  const [answers, setAnswers] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log(answers);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <CustomNavBar />
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <Form>
              <Form.Group controlId="question1">
                <Form.Label>Relation</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your answer"
                  name="answer1"
                  value={answers.answer1}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="question2">
                <Form.Label>Occasion</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your answer"
                  name="answer2"
                  value={answers.answer2}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="question3">
                <Form.Label>Characteristics</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your answer"
                  name="answer3"
                  value={answers.answer3}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md={8}>
            <Button variant="beige" className="btn-lg btn-block" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Recommended Bouquet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src="./assets/flower1.svg" className="img-fluid" alt="Image" />
            <p>Your Bouquet consists of x roses, y sunflowers, z lilies</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="beige" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="beige">Order Now!</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Order2;
