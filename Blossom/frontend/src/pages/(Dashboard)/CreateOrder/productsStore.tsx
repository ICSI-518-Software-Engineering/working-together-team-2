import { GetCatalogServiceRecordType } from "@/api/catalogServices";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItemType = {
  product: GetCatalogServiceRecordType;
  quantity: number;
};

export type UseProductsStoreProps = {
  cart: Record<string, CartItemType>;
  addToCart: (product: GetCatalogServiceRecordType) => void;
  changeQuantity: (
    product: GetCatalogServiceRecordType,
    quantity: number
  ) => void;
  deleteFromCart: (product: GetCatalogServiceRecordType) => void;
};

const useProductsStore = create<UseProductsStoreProps>()(
  persist(
    (set) => ({
      cart: {},

      addToCart: (product) => {
        set((prev) => ({
          cart: {
            ...prev["cart"],
            [product._id]: { product: product, quantity: 1 },
          },
        }));
      },

      changeQuantity: (product, quantity) => {
        set((prev) => ({
          cart: {
            ...prev["cart"],
            [product._id]: {
              product: product,
              quantity: quantity,
            },
          },
        }));
      },

      deleteFromCart: (product) => {
        set((prev) => {
          const prevCart = { ...prev["cart"] };
          delete prevCart[product._id];

          return {
            cart: prevCart,
          };
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useProductsStore;

/**
 * ============ UTILITY FUNCTION =================
 */

export const calculateTotalPrice = (cart: UseProductsStoreProps["cart"]) => {
  const cartItems = Object.values(cart);

  if (!cartItems) return 0;
  return cartItems.reduce((totalPrice, cartItem) => {
    totalPrice += cartItem.quantity * cartItem.product.price;
    return totalPrice;
  }, 0);
};
