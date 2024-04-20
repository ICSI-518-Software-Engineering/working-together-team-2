import { Router } from "express";
import CartModel from "../models/CartModel.js";
import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";
import OrderModel from "../models/OrderModel.js";

const cartRouter = Router();

// Helper function to validate user as a customer
async function validateCustomer(userId) {
    const user = await UserModel.findById(userId);
    if (!user || user.isVendor) {
        throw new Error('Invalid user or user is a vendor');
    }
}
export function groupItemsByVendor(items) {
    const grouped = items.reduce((acc, item) => {
        const vendorId = item.vendor.id.toString();
        if (!acc[vendorId]) {
            acc[vendorId] = [];
        }
        acc[vendorId].push(item);

        return acc;
    }, {});

    // Convert the grouped object into an array of groups
    return Object.values(grouped);

}

cartRouter.post('/create-orders', async (req, res) => {
    const { userId, details } = req.body;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cart = await CartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Group items by vendor
        const ordersByVendor = cart.items.reduce((acc, item) => {
            const vendorId = item.vendor.id.toString();  // Ensure the vendor ID is a string for grouping
            if (!acc[vendorId]) {
                acc[vendorId] = [];
            }
            acc[vendorId].push(item);
            return acc;
        }, {});

        const orders = Object.keys(ordersByVendor).map(vendorId => ({
            products: ordersByVendor[vendorId].map(item => ({
                productId: item.product.id,
                name: item.product.name,
                image: item.product.image,
                description: item.product.description,
                price: item.product.price,
                quantity: item.quantity
            })),
            vendorId: vendorId,
            customerDetails: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: details.phone,
                address: details.address,
                city: details.city,
                state: details.state,
                zip: details.zip
            },
            price: ordersByVendor[vendorId].reduce((acc, item) => acc + item.product.price * item.quantity, 0),
            status: 'Pending',
            deliveryType: 'Delivery',
            deliveryDate: new Date(details.deliveryDate),
        }));

        for (const orderData of orders) {
            const order = new OrderModel(orderData);
            await order.save();
            // Update product quantities
            await Promise.all(orderData.products.map(async product => {
                await ProductModel.findByIdAndUpdate(product.productId, { $inc: { stockInNumber: -product.quantity } });
            }));
        }

        // Clear the cart after order placement
        await CartModel.findOneAndUpdate({ user: userId }, { $set: { items: [] } });

        res.json({ message: 'Orders created successfully' });
    } catch (error) {
        console.error('Error creating orders:', error);
        res.status(500).json({ message: 'Error creating orders', error: error.message });
    }
});


cartRouter.post('/update-cart', async (req, res) => {
    const { userId, productId, vendorId, quantity } = req.body;

    try {
        await validateCustomer(userId); // Validate user

        const product = await ProductModel.findById(productId);
        const vendor = await UserModel.findById(vendorId);

        if (!product) {
            return res.status(404).send('Product not found');
        }
        if (!vendor || vendor.isVendor !== true) {
            return res.status(404).send('Invalid vendor');
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
                    image: product.image,
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
        }
        
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send('Error removing item from cart: ' + error.message);
    }
});

// GET /api/cart
cartRouter.get('/', async (req, res) => {
    const { userId } = req.query;  // Assuming you're passing userId as a query parameter

    try {
        await validateCustomer(userId);
        const cart = await CartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }
        res.status(200).json(cart.items);
    } catch (error) {
        res.status(500).send('Error fetching cart: ' + error.message);
    }
});

export default cartRouter;