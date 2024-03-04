const express = require('express');
const router = express.Router();

const generateMockData = () => {
    const startDate = new Date(); // Start from current date
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30); // Generate data for 30 days

    const data = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().split('T')[0];
        data.push({
            date: formattedDate,
            yetToDeliverCount: Math.floor(Math.random() * 10),
            yetToPrepareCount: Math.floor(Math.random() * 10),
            deliveredCount: Math.floor(Math.random() * 10),
            storePickupCount: Math.floor(Math.random() * 10)
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
};

router.get('/', (req, res) => { // Corrected route definition
    const mockData = generateMockData();
    res.json(mockData);
});

// GET /orders/:vendorId/:orderId
router.get('/:vendorId/:orderId', async (req, res) => {
    try {
        const { vendorId, orderId } = req.params;

        // Find order by vendorId and orderId
        const order = await Order.findOne({ vendorId, orderId });

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

