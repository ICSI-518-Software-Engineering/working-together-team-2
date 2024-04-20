import { Router } from "express";
import { sendErrorResponse } from "./lib/utils.js";
import OrderModel from "./models/OrderModel.js";

const orderRouter = Router();

orderRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const { orderData, totalPrice, cartData, vendorId } = body;

    const { deliveryType, deliveryDate, ...customerDetails } = orderData;
    const newOrder = await OrderModel.create({
      vendorId: vendorId,
      customerDetails: customerDetails,
      deliveryDate: deliveryDate,
      deliveryType: deliveryType,
      price: totalPrice,
      products: cartData.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      status: "Pending",
    });
    return res.json(newOrder);
  } catch (error) {
    return sendErrorResponse(error, res);
  }
});

orderRouter.get("/:vendorId", async (req, res) => {
  try {
    const orders = await OrderModel.find({
      vendorId: req.params.vendorId,
    })
      .populate("products.productId")
      .lean()
      .transform((res) =>
        res?.map((o) => ({
          ...o,
          products: o?.products?.map((p) => ({
            product: p.productId,
            quantity: p.quantity,
          })),
        }))
      );

    return res.json(orders);
  } catch (error) {
    return sendErrorResponse(error, res);
  }
});

orderRouter.put("/:orderId", async (req, res) => {
  try {
    const orders = await OrderModel.findByIdAndUpdate(
      req.params.orderId,
      req.body
    );
    return res.json(orders);
  } catch (error) {
    return sendErrorResponse(error, res);
  }
});
orderRouter.post('/buy-now', async (req, res) => {
  const { productId, vendorId, userId, details } = req.body;

  try {
      // Fetch the user, product, and vendor to ensure they exist
      const user = await UserModel.findById(userId);
      const product = await ProductModel.findById(productId);
      const vendor = await VendorModel.findById(vendorId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      if (!vendor) {
          return res.status(404).json({ message: 'Vendor not found' });
      }

      // Create the order with userId stored in customer.id
      const order = new OrderModel({
          products: [{
              productId: product._id,
              quantity: 1, // Assuming 1 for Buy Now, adjust if necessary
              name: product.name,
              image: product.image,
              description: product.description,
              price: product.price
          }],
          vendorId: vendor._id,
          customerDetails: {
              id: user._id, // Storing userId in customer.id
              name: user.name,
              email: user.email,
              phone: details.phone,
              address: details.address,
              city: details.city,
              state: details.state,
              zip: details.zip,
              deliveryDate: new Date(details.deliveryDate)
          },
          price: product.price,
          status: 'Pending',
          deliveryType: 'Delivery',
          deliveryDate: new Date(details.deliveryDate)
      });

      await order.save();

      // Update product stock after successful order creation
      await ProductModel.findByIdAndUpdate(productId, { $inc: { stock: -1 } });

      res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
      console.error('Error creating the order:', error);
      res.status(500).json({ message: 'Error creating the order', error: error.message });
  }
});

export default orderRouter;
