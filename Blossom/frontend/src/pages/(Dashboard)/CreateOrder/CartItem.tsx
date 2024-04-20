import { formatPrice, lineClamp } from "@/lib/utils";
import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import useProductsStore, { CartItemType } from "./productsStore";

type CartItemProps = {
  preview?: boolean;
} & CartItemType;

const CartItem: React.FC<CartItemProps> = ({ product, quantity, preview }) => {
  const { changeQuantity, deleteFromCart } = useProductsStore((state) => ({
    changeQuantity: state.changeQuantity,
    deleteFromCart: state.deleteFromCart,
  }));

  if (!product) return null;
  return (
    <Stack
      alignItems="start"
      gap="1rem"
      direction="row"
      justifyContent="space-between"
    >
      {/* Left Container */}
      <Stack direction="row" gap="1rem">
        {/* Image */}
        <Box
          component="img"
          src={product.image || "/image_placeholder.jpg"}
          alt={product.name}
          width="6rem"
          height="6rem"
          borderRadius="0.5rem"
        />

        {/* Title */}
        <Stack gap="0.25rem" sx={{ wordBreak: "break-all" }}>
          {/* Name */}
          <Typography
            fontWeight="medium"
            sx={lineClamp(1)}
            title={product.name}
          >
            {product.name}
          </Typography>

          {/* Type */}
          <Typography color="gray" sx={lineClamp(1)} title={product.type}>
            {product.type}
          </Typography>

          {/* Price */}
          <Typography>{formatPrice(product.price * quantity)}</Typography>
        </Stack>
      </Stack>

      {/* Quantity Control */}
      <Stack direction="row" alignItems="center" gap="0.5rem">
        {/* Decrease */}
        {!preview && (
          <IconButton
            size="small"
            title="Decrease quantity"
            onClick={() => changeQuantity(product, quantity - 1)}
            disabled={quantity === 1}
          >
            <Remove />
          </IconButton>
        )}

        {/* Text Field */}
        <TextField
          value={preview ? `x ${quantity}` : quantity}
          onChange={({ target }) => {
            const newVal = Number(target.value);
            if (target.value && newVal === 0) {
              return;
            }
            return changeQuantity(product, newVal);
          }}
          size="small"
          sx={{
            width: "5rem",
          }}
          disabled={preview}
        />

        {/* Increase */}
        {!preview && (
          <IconButton
            size="small"
            title="Increase quantity"
            onClick={() => changeQuantity(product, quantity + 1)}
          >
            <Add />
          </IconButton>
        )}

        {/* Delete Icon */}
        {!preview && (
          <IconButton
            color="error"
            title="Remove from Cart"
            sx={{ ml: "0.3rem" }}
            onClick={() => deleteFromCart(product)}
          >
            <Delete />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
};

export default CartItem;
