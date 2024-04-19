import mongoose, { Schema } from "mongoose";
import { z } from "zod";

const productTypes = ["Flower", "Vase", "FlowerAndVase"];

export const ProductMongooseSchema = new Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  tags: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: productTypes,
  },
  stockInNumber: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const ProductModel = mongoose.model("product", ProductMongooseSchema);

const productZodSchema = z.object({
  image: z.string().optional(),
  name: z.string({ required_error: "Name is required" }),
  description: z.string().optional(),
  price: z
    .number({ required_error: "Price is required" })
    .min(0, { message: "Price should be greater than or equal to 0" }),
  tags: z
    .string({ required_error: "Tags are required" })
    .array()
    .min(1, { message: "Atleast one tag is required" }),
  type: z.enum(productTypes, { required_error: "Product Type is required" }),
  stockInNumber: z
    .number({ required_error: "Stock in number is required" })
    .min(0, {
      message: "Stock in number should be greater than or equal to 0",
    }),
  isActive: z.boolean().optional(),
});

export const validateNewProductRequest = (product) => {
  return productZodSchema.parse(product);
};

export default ProductModel;
