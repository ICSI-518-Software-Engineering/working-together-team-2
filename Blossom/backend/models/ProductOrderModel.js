import mongoose, { Schema } from "mongoose";
import { OrderMongooseSchema } from "./OrderModel";
import { ProductMongooseSchema } from "./ProductModel";

export const ProductOrderMongooseSchema = new Schema({
  productId: ProductMongooseSchema,
  orderId: OrderMongooseSchema,
  quantity: {
    type: Number,
    required: true,
  },
});

const ProductOrderModel = mongoose.model(
  "productOrder",
  ProductOrderMongooseSchema
);

export default ProductOrderModel;
