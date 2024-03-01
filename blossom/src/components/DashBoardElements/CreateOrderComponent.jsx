import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './CreateOrderComponent.css'; // Import CSS file for styling

const CreateOrderComponent = () => {
    const [customerName, setCustomerName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [flowers, setFlowers] = useState(['']); // Initial flower field
    const [wrapping, setWrapping] = useState('');
    const [vase, setVase] = useState('');
    const [deliveryOption, setDeliveryOption] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [address, setAddress] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [totalCost, setTotalCost] = useState(0);

    // Sample flowers
    const sampleFlowers = [
        { name: "Rose", price: 10 },
        { name: "Lily", price: 8 },
        { name: "Tulip", price: 6 },
        { name: "Daisy", price: 5 },
        { name: "Orchid", price: 12 }
    ];

    // useEffect to recalculate total cost whenever there's a change in selected items
    useEffect(() => {
        // Calculate total cost based on selected items
        let calculatedCost = 0;
        flowers.forEach(flower => {
            const selectedFlower = sampleFlowers.find(sampleFlower => sampleFlower.name === flower);
            if (selectedFlower) {
                calculatedCost += selectedFlower.price;
            }
        });
        // Add the prices for wrapping and vase
        if (wrapping) {
            // Assuming wrapping prices are static
            calculatedCost += getWrappingPrice(wrapping);
        }
        if (vase) {
            // Assuming vase prices are static
            calculatedCost += getVasePrice(vase);
        }
        // Set the total cost
        setTotalCost(calculatedCost);
    }, [flowers, wrapping, vase]);

    // Helper function to get wrapping price
    const getWrappingPrice = (selectedWrapping) => {
        // Replace this with actual logic to get wrapping price
        return 5; // Sample price for wrapping
    };

    // Helper function to get vase price
    const getVasePrice = (selectedVase) => {
        // Replace this with actual logic to get vase price
        return 10; // Sample price for vase
    };

    // Function to handle adding more flowers
    const addFlower = () => {
        setFlowers([...flowers, '']);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Gather order data
        const orderData = {
            customerName,
            email,
            phoneNumber,
            flowers,
            wrapping,
            vase,
            deliveryOption,
            deliveryDate,
            address,
            apartmentNumber,
            city,
            state,
            zipcode,
            paymentMethod,
            totalCost,
        };
        try {
            // Place order using firestore function
            // await placeOrder(email, orderData);
            // Reset form fields after successful order placement
            setCustomerName('');
            setEmail('');
            setPhoneNumber('');
            setFlowers(['']);
            setWrapping('');
            setVase('');
            setDeliveryOption('');
            setDeliveryDate('');
            setAddress('');
            setApartmentNumber('');
            setCity('');
            setState('');
            setZipcode('');
            setPaymentMethod('');
            setTotalCost(0);
            // Optional: Display success message or navigate to another page
            console.log('Order placed successfully');
        } catch (error) {
            console.error('Error placing order: ', error);
            // Optional: Display error message to the user
        }
    };

    return (
        <div className="order-container blue-background">
            <h2 className="blue-text">Create Order</h2>
            <br />
            <br />
            <Form onSubmit={handleSubmit}>
                {/* Customer Details */}
                <Row>
                    <Col>
                        <Form.Group controlId="customerName">
                            <Form.Label className="blue-text">Customer Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                required
                                className="form-field"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="email">
                            <Form.Label className="blue-text">Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="form-field"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="phoneNumber">
                            <Form.Label className="blue-text">Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className="form-field"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Flower Selection */}
                <Form.Group controlId="flowers">
                    <Form.Label className="blue-text">Flower Selection</Form.Label>
                    {flowers.map((flower, index) => (
                        <Row key={index}>
                            <Col>
                                <Form.Control
                                    as="select"
                                    value={flower}
                                    onChange={(e) => {
                                        const updatedFlowers = [...flowers];
                                        updatedFlowers[index] = e.target.value;
                                        setFlowers(updatedFlowers);
                                    }}
                                    required
                                    className="form-field"
                                >
                                    <option value="">Select flower</option>
                                    {sampleFlowers.map((sampleFlower, i) => (
                                        <option key={i} value={sampleFlower.name}>
                                            {sampleFlower.name} - ${sampleFlower.price}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            {index === flowers.length - 1 && (
                                <Col xs="auto">
                                    <Button variant="secondary" onClick={addFlower}>
                                        +
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    ))}
                </Form.Group>

                {/* Wrapping Selection */}
                <Form.Group controlId="wrapping">
                    <Form.Label className="blue-text">Wrapping</Form.Label>
                    <Form.Control
                        as="select"
                        value={wrapping}
                        onChange={(e) => setWrapping(e.target.value)}
                        required
                        className="form-field"
                    >
                        <option value="">Select wrapping</option>
                        <option value="Paper">Paper - $5</option>
                        <option value="Plastic">Plastic - $3</option>
                        <option value="Eco-friendly Plastic">Eco-friendly Plastic - $8</option>
                        <option value="Recycled Paper">Recycled Paper - $4</option>
                    </Form.Control>
                </Form.Group>

                {/* Vase Selection */}
                <Form.Group controlId="vase">
                    <Form.Label className="blue-text">Vase</Form.Label>
                    <Form.Control
                        as="select"
                        value={vase}
                        onChange={(e) => setVase(e.target.value)}
                        required
                        className="form-field"
                    >
                        <option value="">Select vase</option>
                        <option value="Glass Vase">Glass Vase - $10</option>
                        <option value="Ceramic Vase">Ceramic Vase - $12</option>
                        <option value="Metal Vase">Metal Vase - $15</option>
                    </Form.Control>
                </Form.Group>

                {/* Delivery Option */}
                <Form.Group controlId="deliveryOption">
                    <Form.Label className="blue-text">Delivery Option</Form.Label>
                    <Form.Control
                        as="select"
                        value={deliveryOption}
                        onChange={(e) => {
                            setDeliveryOption(e.target.value);
                            // Reset delivery date when changing delivery option
                            setDeliveryDate('');
                        }}
                        required
                        className="form-field"
                    >
                        <option value="">Select delivery option</option>
                        <option value="Home delivery">Home delivery</option>
                        <option value="In-store pick up">In-store pick up</option>
                    </Form.Control>
                </Form.Group>

                {/* Delivery Date */}
                {deliveryOption === "In-store pick up" && (
                    <Form.Group controlId="inStorePickupDate">
                        <Form.Label className="blue-text">Pickup Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            required
                            className="form-field"
                        />
                    </Form.Group>
                )}

                {/* Delivery Details */}
                {deliveryOption === "Home delivery" && (
                    <>
                        <Form.Group controlId="deliveryDate">
                            <Form.Label className="blue-text">Delivery Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={deliveryDate}
                                onChange={(e) => setDeliveryDate(e.target.value)}
                                required
                                className="form-field"
                            />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label className="blue-text">Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="form-field"
                            />
                        </Form.Group>
                        <Form.Group controlId="apartmentNumber">
                            <Form.Label className="blue-text">Apt. Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={apartmentNumber}
                                onChange={(e) => setApartmentNumber(e.target.value)}
                                className="form-field"
                            />
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label className="blue-text">City</Form.Label>
                            <Form.Control
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                className="form-field"
                            />
                        </Form.Group>
                        <Form.Group controlId="state">
                            <Form.Label className="blue-text">State</Form.Label>
                            <Form.Control
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                                className="form-field"
                            />
                        </Form.Group>
                        <Form.Group controlId="zipcode">
                            <Form.Label className="blue-text">Zipcode</Form.Label>
                            <Form.Control
                                type="text"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                required
                                className="form-field"
                            />
                        </Form.Group>
                    </>
                )}

                {/* Total Cost */}
                <Form.Group controlId="totalCost">
                    <Form.Label className="blue-text">Total Cost</Form.Label>
                    <Form.Control
                        type="text"
                        value={`$${totalCost}`}
                        readOnly
                        className="form-field"
                    />
                </Form.Group>

                {/* Payment Method */}
                <Form.Group controlId="paymentMethod">
                    <Form.Label className="blue-text">Payment Method</Form.Label>
                    <Form.Control
                        as="select"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                        className="form-field"
                    >
                        <option value="">Select payment method</option>
                        <option value="Cash in store">Cash in store</option>
                        <option value="Cash on delivery">Cash on delivery</option>
                        <option value="Debit/Credit card">Debit/Credit card</option>
                    </Form.Control>
                </Form.Group>

                {/* Create Order Button */}
                <Button className="beige-button" type="submit">
                    Create Order
                </Button>
            </Form>
        </div>
    );
};

export default CreateOrderComponent;
