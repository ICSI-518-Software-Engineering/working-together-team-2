// src/api/cartService.ts
import axios from 'axios';
const API_URL = 'http://localhost:8086/api/cart'; 

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

 // Update to your API's base URL

export const fetchCart = async (userId: string) => {
    try {
        const response = await axios.get(${API_URL}?userId=${userId});
        return response.data;
    } catch (error) {
        console.error('Failed to fetch cart:', error);
        throw error;
    }
};

export const updateCartItemQuantity = async (userId: string, productId: string, quantity: number) => {
    try {
        const response = await axios.put(${API_URL}/update-item, {
            userId,
            productId,
            quantity
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update cart item:', error);
        throw error;
    }
};

export const removeCartItem = async (userId: string, productId: string) => {
    try {
        const response = await axios.delete(${API_URL}/remove-item, {
            data: { userId, productId }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to remove cart item:', error);
        throw error;
    }
};