// createOrder.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
// const Customer = require('../models/customer');
const { validateOrder } = require('../utils/createOrderUtil');
const { generateOrderId } = require('../utils/createOrderUtil');

router.post('/', async (req, res) => {
    try {
        // Validate order details
        // const { error } = validateOrder(req.body);
        // if (error) {
        //     return res.status(400).json({ error: error.details[0].message });
        // }

        // Generate order ID
        const timestamp = new Date().getTime();
        let orderId = timestamp.toString();
        if (req.body.orderType === 'web') {
            orderId += 'DELW';
        } else if (req.body.orderType === 'store') {
            orderId += 'STR';
        }

        // Calculate overall cost
        let overallCost = 0;
        req.body.productDetails.forEach(product => {
            // Calculate cost for each product detail
            let productCost = 0;
            productCost += product.cost.vase;
            productCost += product.cost.wrapping;
            productCost += product.cost.giftCard;
            product.cost.flowers.forEach(flower => {
                productCost += flower.quantity * flower.costPerUnit;
            });
            overallCost += productCost;
        });

        // Create new order record
        const orderData = { ...req.body, orderId, overallCost };
        const order = new Order(orderData);
        const savedOrder = await order.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;
