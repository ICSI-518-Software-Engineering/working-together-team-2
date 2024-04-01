import { Router } from "express";
import { sendErrorResponse } from "../lib/utils.js";
import OrderModel from "../models/OrderModel.js";

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

export default orderRouter;
