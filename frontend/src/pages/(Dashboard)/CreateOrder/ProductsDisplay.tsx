import { GetCatalogServiceRecordType } from "@/api/catalogServices";
import { formatPrice, lineClamp } from "@/lib/utils";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import useProductsStore, { UseProductsStoreProps } from "./productsStore";

type ProductsDisplayProps = {
  products: GetCatalogServiceRecordType[];
  onGoToCartClick: () => unknown;
};

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({
  products,
  onGoToCartClick,
}) => {
  const { cart, addToCart } = useProductsStore();

  if (!products || products?.length === 0) {
    return <Alert severity="info">No Products Available</Alert>;
  }

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap="2rem"
      justifyContent={{ xs: "start", lg: "space-between" }}
    >
      {products?.map?.((product) => (
        <Product
          key={product._id}
          product={product}
          addToCart={addToCart}
          inCart={product._id in cart}
          goToCart={onGoToCartClick}
        />
      ))}
    </Stack>
  );
};

export default ProductsDisplay;

/**
 * ============= CUSTOM COMPONENT =================
 */

type ProductProps = {
  product: GetCatalogServiceRecordType;
  addToCart: UseProductsStoreProps["addToCart"];
  inCart: boolean;
  goToCart: ProductsDisplayProps["onGoToCartClick"];
};

const Product: React.FC<ProductProps> = ({
  product,
  addToCart,
  inCart,
  goToCart,
}) => {
  return (
    <Card sx={{ width: "21rem" }}>
      <CardMedia
        component="img"
        height={250}
        image={product.image || "/image_placeholder.jpg"}
        alt={product.name}
        sx={{
          width: "100%",
          height: "18rem",
          objectFit: "fill",
        }}
      />
      <CardContent>
        <Stack gap="0.5rem">
          <Typography fontSize="1.5rem" noWrap title={product.name}>
            {product.name}
          </Typography>
          <Typography color="gray" height="3rem" sx={lineClamp()}>
            {product.description}
          </Typography>
          <Typography fontSize="1.25rem">
            {formatPrice(product.price)}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          color="inherit"
          variant={inCart ? "contained" : "outlined"}
          onClick={() => {
            if (inCart) {
              return goToCart();
            }
            addToCart(product);
          }}
        >
          {inCart ? "Go to Cart" : "Add to Cart"}
        </Button>
      </CardActions>
    </Card>
  );
};
