import { Router } from "express";
import CartModel from "../models/CartModel.js";
import ProductModel from "d:/downloads/Blossom/backend/models/ProductModel.js";
import UserModel from "d:/downloads/Blossom/backend/models/UserModel.js";

const cartRouter = Router();

// Helper function to validate user as a customer
async function validateCustomer(userId) {
    const user = await UserModel.findById(userId);
    if (!user || user.isVendor) {
        throw new Error('Invalid user or user is a vendor');
    }
}

cartRouter.post('/update-cart', async (req, res) => {
    const { userId, productId, vendorId, quantity } = req.body;

    try {
        await validateCustomer(userId); // Validate user

        const product = await ProductModel.findById(productId);
        const vendor = await UserModel.findById(vendorId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        let cart = await CartModel.findOne({ user: userId });
        if (!cart) {
            cart = new CartModel({ user: userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product.id.toString() === productId);
        if (itemIndex !== -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: {
                    id: product._id,
                    name: product.name,
                    imageUrl: product.imageUrl,
                    description: product.description,
                    price: product.price
                },
                vendor: {
                    id: vendor._id,
                    name: vendor.name,
                    email: vendor.email
                },
                quantity
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send('Error updating cart: ' + error.message);
    }
});

cartRouter.put('/update-quantity', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        await validateCustomer(userId); // Validate user

        const cart = await CartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        const itemIndex = cart.items.findIndex(item => item.product.id.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).send('Item not found in cart');
        }

        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send('Error updating quantity: ' + error.message);
    }
});

cartRouter.delete('/remove-item', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        await validateCustomer(userId); // Validate user

        const cart = await CartModel.findOneAndUpdate(
            { user: userId },
            { $pull: { items: { "product.id": productId } } },
            { new: true }
        );
        if (!cart) {
            return res.status(404).send('Cart not found');

        if (!vendor || vendor.isVendor !== true) {
            return res.status(404).send('Invalid vendor');
    
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send('Error removing item from cart: ' + error.message);
    }
});

export default cartRouter;
