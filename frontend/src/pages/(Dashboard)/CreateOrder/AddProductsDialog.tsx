import { useGetCatalogService } from "@/api/catalogServices";
import { CustomDialogBaseProps } from "@/components/CustomDialog";
import FullScreenCustomDialog from "@/components/FullScreenCustomDialog";
import { Close } from "@mui/icons-material";
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductsDisplay from "./ProductsDisplay";
import { productTypeOptions } from "./typesAndData";

type AddProductsDialogProps = CustomDialogBaseProps;

const AddProductsDialog: React.FC<AddProductsDialogProps> = (props) => {
  const { data: catalogItems = [], isLoading } = useGetCatalogService();
  const navigate = useNavigate();

  const [productType, setProductType] = useState<string>(
    productTypeOptions[0].value
  );

  return (
    <FullScreenCustomDialog {...props} isLoading={isLoading}>
      <AppBar>
        <Toolbar>
          {/* Close Button */}
          <IconButton edge="start" color="inherit" onClick={props.onClose}>
            <Close />
          </IconButton>

          {/* Title */}
          <Typography ml="1rem" variant="h6" flex={1}>
            Add Products
          </Typography>

          {/* Save Button */}
          <Button variant="outlined" color="inherit" onClick={props.onClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>

      <Stack gap="1rem" mt="5rem">
        {/* Product Type */}
        <FormControl>
          <FormLabel htmlFor="productType">Product Type</FormLabel>
          <RadioGroup
            id="productType"
            value={productType}
            onChange={(_, v) => setProductType(v)}
            row
          >
            {productTypeOptions?.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {/* Catalog Part */}
        <Autocomplete
          options={catalogItems}
          renderInput={(props) => (
            <TextField placeholder="Search Catalog" {...props} />
          )}
          getOptionKey={(item) => item._id as string}
          getOptionLabel={(item) => item.name}
        />

        {/* Custom Part */}

        {/* Products Display Section */}
        <Box mt="1rem">
          <ProductsDisplay
            products={catalogItems}
            onGoToCartClick={() => {
              navigate("#cart");
              props.onClose();
            }}
          />
        </Box>
      </Stack>
    </FullScreenCustomDialog>
  );
};

export default AddProductsDialog;
