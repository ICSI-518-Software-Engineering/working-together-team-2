import CustomDatePicker from "@/components/CustomDatePicker";
import Input from "@/components/Input";
import Radio from "@/components/Radio";
import { today } from "@/utils/dateUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "..";
import {
  CreateOrderFormDataType,
  createOrderZodSchema,
  deliveryTypeOptions,
  productTypeOptions,
} from "./typesAndData";

const DashboardCreateOrderPage: React.FC = () => {
  const { control, watch } = useForm<CreateOrderFormDataType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      productType: "",
      deliveryType: "",
      deliveryDate: "",
    },
    resolver: zodResolver(createOrderZodSchema),
  });

  const deliveryType = watch("deliveryType");

  return (
    <DashboardLayout>
      <Box
        component={Paper}
        p="1.5rem"
        display="flex"
        flexDirection="column"
        gap="2rem"
      >
        {/* Customer Details */}
        <Stack gap="1rem">
          <Typography fontWeight="bold">Customer Details</Typography>
          <Stack direction="row" gap="1rem">
            <Input
              control={control}
              id="name"
              label="Customer Name"
              placeholder="Enter customer name"
              fullWidth
              size="small"
            />
            <Input
              control={control}
              id="email"
              label="Customer Email"
              placeholder="Enter customer email"
              fullWidth
              size="small"
            />
            <Input
              control={control}
              id="phone"
              label="Customer phone number"
              placeholder="Enter customer phone number"
              fullWidth
              size="small"
            />
          </Stack>
        </Stack>

        {/* Product Type */}
        <Radio
          id="productType"
          options={productTypeOptions}
          control={control}
          label="Product Type"
          row
        />

        {/* Delivery Type */}
        <Radio
          id="deliveryType"
          options={deliveryTypeOptions}
          control={control}
          label="Delivery Type"
          row
        />

        {/* Delivery Options */}
        {deliveryType === deliveryTypeOptions[1].value && (
          <Stack gap="1rem">
            <Typography fontWeight="bold">Delivery Details</Typography>
            <Stack direction="row" gap="1rem">
              <Input
                id="address"
                size="small"
                label="Address"
                control={control}
                fullWidth
                multiline
                rows={2}
              />
            </Stack>
            <Stack mt="0.5rem" direction="row" gap="1rem">
              <CustomDatePicker
                control={control}
                id="deliveryDate"
                textFieldProps={{ size: "small" }}
                minDate={today()}
                label="Delivery Date"
              />
              <Input
                id="city"
                size="small"
                label="City"
                control={control}
                fullWidth
              />
              <Input
                id="state"
                size="small"
                label="State"
                control={control}
                fullWidth
              />
              <Input
                id="zip"
                size="small"
                label="Zip"
                control={control}
                fullWidth
              />
            </Stack>
          </Stack>
        )}

        {/* <Dropdown
          control={control}
          id="productType"
          options={productTypeOptions}
          variant="outlined"
          size="small"
          label="Product Type"
        /> */}
      </Box>
    </DashboardLayout>
  );
};

export default DashboardCreateOrderPage;
