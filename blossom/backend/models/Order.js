const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema({
    id: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: [String], required: true },
    productType: { type: String, enum: ['suggested', 'customized', 'catalog'], required: true },
    cost: {
        flowers: [{
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            costPerUnit: { type: Number, required: true }
        }],
        vase: { type: Number, required: true },
        wrapping: { type: Number, required: true },
        giftCard: { type: Number, required: true }
    }
});

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    vendorId: { type: String, required: true },
    timestamp: { type: Date, required: true },
    customer: {
        name: { type: String },
        email: { type: String },
        phone: { type: String }
    },
    deliveryDateTime: { type: Date, required: true },
    productDetails: { type: [productDetailSchema], required: true },
    deliveryType: { type: String, enum: ['delivery', 'pickup'], required: true },
    deliveryAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String }
    },
    deliveryAmount: { type: Number },
    deliveryInstructions: { type: String },
    orderTotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    paymentDetails: {
        method: { type: String, required: true },
        transactionId: { type: String, required: true },
        amountPaid: { type: Number, required: true }
    },
    orderStatus: { type: String, enum: ['fresh', 'designed', 'delivered', 'completed'], required: true },
    orderType: { type: String, enum: ['web', 'store'], required: true },
    occasion: { type: String, required: true },
    relation: { type: String },
    overallCost: { type: Number, required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
