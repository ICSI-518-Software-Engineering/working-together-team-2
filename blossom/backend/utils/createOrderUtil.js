

const generateOrderId = (orderType) => {
    const timestamp = new Date().getTime();
    let orderId = timestamp.toString();
    if (orderType === 'web') {
        orderId += 'DELW';
    } else if (orderType === 'store') {
        orderId += 'STR';
    }
    return orderId;
};

module.exports = { generateOrderId };



const validateOrder = (req) => {
    const { lineItems, deliveryType, orderType, occasion, relationWithRecipient } = req.body;
    if (!lineItems || lineItems.length === 0) {
        return 'Line items are required';
    }
    if (!deliveryType || !['delivery', 'pickup'].includes(deliveryType)) {
        return 'Delivery type must be either "delivery" or "pickup"';
    }
    if (!orderType || !['web', 'store'].includes(orderType)) {
        return 'Order type must be either "web" or "store"';
    }
    if (!occasion) {
        return 'Occasion is required';
    }
    if (!relationWithRecipient) {
        return 'Relation with recipient is required';
    }
    return null; // Indicates validation success
};

module.exports = { validateOrder };
