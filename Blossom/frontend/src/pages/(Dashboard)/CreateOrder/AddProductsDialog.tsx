import { useGetCatalogService } from "@/api/catalogServices";
import { CustomDialogBaseProps } from "@/components/CustomDialog";
import FullScreenCustomDialog from "@/components/FullScreenCustomDialog";
import { Close, Delete, Search, Telegram } from "@mui/icons-material";
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
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
  debounce,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductsDisplay from "./ProductsDisplay";
import {
  ProductSearchType,
  collaborativeFilter,
  productTypeOptions,
} from "./typesAndData";

type AddProductsDialogProps = CustomDialogBaseProps;

const AddProductsDialog: React.FC<AddProductsDialogProps> = (props) => {
  const { data: catalogItems = [], isLoading } = useGetCatalogService();
  const navigate = useNavigate();

  const [searchString, setSearchString] = useState<string>("");

  const [productType, setProductType] = useState<ProductSearchType>(
    productTypeOptions[0].value
  );
  const customSearchFlowerRef = useRef<HTMLInputElement | null>(null);
  const customSearchVaseRef = useRef<HTMLInputElement | null>(null);
  const [displayImage, setDisplayImage] = useState<boolean>(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);

  const filteredCatalogItems = useMemo(() => {
    if (!searchString) return catalogItems;

    // if (productType === "catalog") {
    // return catalogItems.filter((item) => {
    //   const token = searchString?.toLowerCase();
    //   let flag = false;
    //   flag =
    //     flag ||
    //     item?.name?.toLowerCase?.().includes?.(token) ||
    //     token?.includes(item?.name?.toLowerCase?.());
    //   flag = flag || item?.description?.toLowerCase?.().includes?.(token);
    //   flag =
    //     flag ||
    //     item?.tags?.some(
    //       (t) =>
    //         t.toLowerCase().includes(token) || token.includes(t.toLowerCase())
    //     );
    //   flag =
    //     flag ||
    //     item.type?.toLowerCase?.().includes(token) ||
    //     token.includes(item.type?.toLowerCase?.());
    //   return flag;
    // });
    // }

    // // If it is custom search
    return catalogItems.filter((item) =>
      collaborativeFilter(item, searchString)
    );
  }, [catalogItems, searchString]);

  console.log(customSearchFlowerRef?.current?.value);

  return (
    <FullScreenCustomDialog {...props} isLoading={isLoading}>
      {/* Top Bar */}
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

      {/* Search Type & Search Results */}
      <Stack gap="1rem" mt="5rem">
        {/* Product Type */}
        <FormControl>
          <FormLabel htmlFor="productType">Product Type</FormLabel>
          <RadioGroup
            id="productType"
            value={productType}
            onChange={(_, v) => {
              setProductType(v as ProductSearchType);
              setDisplayImage(false);
            }}
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

        {/* Custom Search */}
        {productType === "custom" && (
          <Stack gap="1rem">
            {/* Search & GO Button */}
            <Stack
              gap="0.5rem"
              direction="row"
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                setDisplayImage(true);
                setIsGeneratingImage(true);
                e.stopPropagation();
              }}
              onReset={() => setDisplayImage(false)}
            >
              {/* <TextField
                inputRef={customSearchRef}
                sx={{ flexGrow: 1 }}
                placeholder="Type in anything like occasion, description etc..."
                required
              /> */}
              {/* <DropdownBase
                label="Flower"
                options={catalogItems
                  ?.filter((item) => item.type === "Flower")
                  .map((item) => ({ label: item.name, value: item.name }))}
              /> */}

              {/* Flower */}
              <Box width="50%">
                <Autocomplete
                  renderInput={(params) => (
                    <TextField
                      inputRef={customSearchFlowerRef}
                      label="Flower"
                      {...params}
                    />
                  )}
                  options={catalogItems
                    ?.filter((item) => item.type === "Flower")
                    .map((item) => item.name)}
                />
              </Box>

              {/* Vase */}
              <Box width="50%">
                <Autocomplete
                  renderInput={(params) => (
                    <TextField
                      inputRef={customSearchVaseRef}
                      label="Vase"
                      {...params}
                    />
                  )}
                  options={catalogItems
                    ?.filter((item) => item.type === "Vase")
                    .map((item) => item.name)}
                />
              </Box>

              <Button color="inherit" startIcon={<Telegram />} type="submit">
                GO
              </Button>
              <Button color="error" startIcon={<Delete />} type="reset">
                Clear
              </Button>
            </Stack>

            {/* Image */}

            {displayImage && (
              <Stack
                width="100%"
                gap="2rem"
                direction="row"
                height={isGeneratingImage ? "4rem" : "40rem"}
              >
                {isGeneratingImage && (
                  <Stack direction="row" gap="0.5rem" alignItems="center">
                    <CircularProgress size="1.5rem" />
                    <Typography>
                      Image generation in progress. Please wait...
                    </Typography>
                  </Stack>
                )}
                <Box
                  // width="40rem"
                  height={isGeneratingImage ? 0 : "40rem"}
                  component="img"
                  src={`https://image.pollinations.ai/prompt/${encodeURIComponent(
                    (customSearchFlowerRef?.current?.value ?? "") +
                      " with " +
                      (customSearchVaseRef?.current?.value ?? "")
                  )}`}
                  onLoad={() => setIsGeneratingImage(false)}
                />
              </Stack>
            )}
          </Stack>
        )}

        {/* Search Catalog */}
        <Autocomplete
          options={catalogItems}
          renderInput={(props) => (
            <TextField
              placeholder="Search for catalog recommendations"
              {...props}
              InputProps={{
                startAdornment: <Search />,
              }}
            />
          )}
          getOptionKey={(item) => (typeof item === "string" ? item : item._id)}
          getOptionLabel={(item) =>
            typeof item === "string" ? item : item.name
          }
          freeSolo
          onInputChange={debounce((_, v) => setSearchString(v), 300)}
        />

        {/* Products Display Section */}
        <Box mt="1rem">
          <ProductsDisplay
            products={filteredCatalogItems}
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
