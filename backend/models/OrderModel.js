import mongoose, { Schema } from "mongoose";
import { ProductOrderMongooseSchema } from "./ProductOrderModel";
import { UserMongooseSchema } from "./UserModel";

export const OrderMongooseSchema = new Schema({
  products: [ProductOrderMongooseSchema],
  userId: UserMongooseSchema,
  price: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["PENDING", "DONE"],
  },
  orderType: {
    type: String,
    enum: ["PICKUP", "DELIVERY"],
  },
});

const OrderModel = mongoose.model("order", OrderMongooseSchema);

export default OrderModel;
