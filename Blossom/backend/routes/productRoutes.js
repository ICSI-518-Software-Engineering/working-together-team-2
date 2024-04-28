import { Router } from "express";
import { sendErrorResponse } from "../lib/utils.js";
import ProductModel, {
  validateNewProductRequest,
} from "../models/ProductModel.js";

const productRouter = Router();

productRouter.get("/in-stock", async (req, res) => {
  try {
    // Retrieve vendorId from query parameters
    const { vendorId } = req.query;
    
    if (!vendorId) {
      return res.status(400).json({ error: "Vendor ID is required" });
    }

    // Query for products that are in stock and match the vendorId
    const inStockProducts = await ProductModel.find({
      stockInNumber: { $gt: 0 },
      type: "FlowerAndVase",
      vendorId: vendorId  // Assuming the schema uses vendorId to reference the vendor
    }).sort({ updatedAt: -1 });

    return res.json(inStockProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something unexpected happened!!");
  }
});
productRouter.get("/in-stock-all", async (req, res) => {
  try {
    // Retrieve vendorId from query parameters
    const { vendorId } = req.query;
    
    if (!vendorId) {
      return res.status(400).json({ error: "Vendor ID is required" });
    }

    const inStockProducts = await ProductModel.find({
      $and: [
        { stockInNumber: { $gt: 0 } },
        { $or: [{ type: "Flower" }, { type: "Vase" }] },
        { vendorId: vendorId }  // Filter by vendorId
      ],
    }).sort({ updatedAt: -1 });

    return res.json(inStockProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something unexpected happened!!");
  }
});

productRouter.get("/:productId?", async (req, res) => {
  try {
    const { productId } = req.params;
    const vendorId = req.headers["vendor-id"];

    // If no product id
    if (!productId) {
      const products = await ProductModel.find({ vendorId }).sort({
        updatedAt: -1,
      });
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
    product.vendorId=  req.headers["vendor-id"];
    console.log("vendor id", req.headers["vendor-id"]);

    const newProduct = new ProductModel(product);
    const prod = await newProduct.save();
    return res.send(prod);
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

productRouter.put("/:productId", async (req, res) => {
  try {
    const product = validateNewProductRequest(req.body);

    await ProductModel.findByIdAndUpdate(req.params.productId, product);
    return res.send("Product updated successfully");
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

productRouter.delete("/:productId", async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.productId);
    return res.send("Product deleted successfully");
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

export default productRouter;
