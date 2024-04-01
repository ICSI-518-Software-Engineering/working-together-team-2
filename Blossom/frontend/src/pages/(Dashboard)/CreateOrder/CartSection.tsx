import { Stack, Typography } from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import useProductsStore from "./productsStore";

const CartSection: React.FC = () => {
  const { cart } = useProductsStore();
  const cartProducts = Object.values(cart);

  return (
    <>
      {" "}
      {/* Cart Title */}
      <Typography fontWeight="bold">
        Cart{" "}
        {cartProducts?.length > 0 ? `(${cartProducts.length} Products)` : ""}
      </Typography>
      {/* Cart Products */}
      <Stack gap="3rem" overflow="auto" mb="auto">
        {cartProducts?.map((item) => (
          <CartItem key={item.product._id} {...item} />
        ))}
      </Stack>
    </>
  );
};

export default CartSection;
