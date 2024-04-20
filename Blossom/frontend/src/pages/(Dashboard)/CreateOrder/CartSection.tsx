import { Typography } from "@mui/material";
import React from "react";
import CartItemsDisplay from "./CartItemsDisplay";
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
      <CartItemsDisplay cartProducts={cartProducts} />
    </>
  );
};

export default CartSection;
