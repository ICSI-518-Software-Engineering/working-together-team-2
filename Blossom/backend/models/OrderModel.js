import mongoose, { Schema } from "mongoose";

export const OrderMongooseSchema = new Schema({
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "product",
        unique: false,
      },
      quantity: Number,
    },
  ],
  vendorId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    unique: false,
  },
  customerDetails: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    address: String,
    city: String,
    state: String,
    zip: String,
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Pending", "Complete", "Cancelled"],
  },
  deliveryType: {
    type: String,
    enum: ["Pickup", "Delivery"],
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
});

const OrderModel = mongoose.model("order", OrderMongooseSchema);

export default OrderModel;
