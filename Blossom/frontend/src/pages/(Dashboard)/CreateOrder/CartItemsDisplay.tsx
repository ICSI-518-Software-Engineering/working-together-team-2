import { Stack } from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import { CartItemType } from "./productsStore";

type CartItemsDisplayProps = {
  preview?: boolean;
  cartProducts: CartItemType[];
};

const CartItemsDisplay: React.FC<CartItemsDisplayProps> = ({
  cartProducts,
  preview,
}) => {
  return (
    <Stack gap="3rem" overflow="auto" mb="auto">
      {cartProducts?.map?.((item) => (
        <CartItem preview={preview} key={item.product._id} {...item} />
      ))}
    </Stack>
  );
};

export default CartItemsDisplay;
