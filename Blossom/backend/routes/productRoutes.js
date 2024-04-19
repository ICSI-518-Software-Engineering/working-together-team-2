import { Router } from "express";
import { sendErrorResponse } from "../lib/utils.js";
import ProductModel, {
  validateNewProductRequest,
} from "../models/ProductModel.js";

const productRouter = Router();

productRouter.get("/:productId?", async (req, res) => {
  try {
    const { productId } = req.params;

    // If no product id
    if (!productId) {
      const products = await ProductModel.find({});
      return res.json(products);
    }

    // If there is product id
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).send("No product found");
    }

    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something unexpected happened!!");
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const product = validateNewProductRequest(req.body);

    const newProduct = new ProductModel(product);
    await newProduct.save();
    return res.send("Product saved successfully");
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

export default productRouter;
