// src/api/cartService.ts
import axios from 'axios';

// Interface for adding to cart
interface AddToCartParams {
  userId: string;
  productId: string;
  vendorId: string;
  quantity: number;
}

// Function to add product to cart
export const addToCart = async (params: AddToCartParams): Promise<void> => {
  try {
    const response = await axios.post('http://localhost:8086/api/cart/update-cart', params);
    console.log('Product added to cart:', response.data);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw new Error('Failed to add product to cart');
  }
};

// Function to immediately buy the product
export const buyNow = async (params: AddToCartParams): Promise<void> => {
  try {
    const response = await axios.post('http://localhost:8086/api/cart/buy-now', params); // Assuming there's a buy-now endpoint
    console.log('Purchase completed:', response.data);
  } catch (error) {
    console.error('Error processing purchase:', error);
    throw new Error('Failed to complete purchase');
  }
};
