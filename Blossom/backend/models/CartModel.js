// models/CartModel.js

import mongoose, { Schema } from "mongoose";

export const cartItemSchema = new Schema({
    product: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: String,
        image: String,
        description: String,
        price: Number
    },
    vendor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
            required: true
        },
        name: String,
        email: String
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
});

export const cartSchema = new Schema({
    user: {
        type: String,  // assuming user ID is a string; adjust type as necessary
        required: true
    },
    items: [cartItemSchema],
    modifiedOn: {
        type: Date,
        default: Date.now
    }
});

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;