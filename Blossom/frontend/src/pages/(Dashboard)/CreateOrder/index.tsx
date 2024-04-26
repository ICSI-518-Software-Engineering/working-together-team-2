import { useCreateOrderService } from "@/api/orderServices";
import CustomDatePicker from "@/components/CustomDatePicker";
import FullScreenLoader from "@/components/FullScreenLoader";
import Input from "@/components/Input";
import Radio from "@/components/Radio";
import { getSignedInUserDetails } from "@/utils/authUtils";
import { today } from "@/utils/dateUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DashboardLayout from "..";
import AddProductsDialog from "./AddProductsDialog";
import CartSection from "./CartSection";
import ConfirmOrderDialog from "./ConfirmOrderDialog";
import useProductsStore, {
  UseProductsStoreProps,
  calculateTotalPrice,
} from "./productsStore";
import {
  CreateOrderFormDataType,
  createOrderZodSchema,
  deliveryTypeOptions,
} from "./typesAndData";

const DashboardCreateOrderPage: React.FC = () => {
  const user = getSignedInUserDetails();
  const { mutate: createOrder, isPending } = useCreateOrderService();
  const { cart, resetCart } = useProductsStore();
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
  const { control, watch, handleSubmit, reset } =
    useForm<CreateOrderFormDataType>({
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        deliveryType: "",
        deliveryDate: "",
        address: "",
        city: "",
        state: "",
        zip: "",
      },
      resolver: zodResolver(createOrderZodSchema),
    });

  const deliveryType = watch("deliveryType");

  const handleCreateOrder = (
    data: CreateOrderFormDataType,
    cartData: UseProductsStoreProps["cart"]
  ) => {
    if (!user) return;
    const totalPrice = calculateTotalPrice(cart);
    createOrder(
      {
        orderData: data,
        totalPrice: totalPrice,
        cartData: Object.values(cartData).map((item) => ({
          product: { _id: item.product._id },
          quantity: item.quantity,
        })),
        vendorId: user._id,
      },
      {
        onSuccess: () => {
          toast.success("Order created successfully...");
          reset();
          resetCart();
        },
      }
    );
  };

  return (
    <DashboardLayout>
      <FullScreenLoader isLoading={isPending} label="Creating Order..." />
      <Box
        component="form"
        onSubmit={handleSubmit((d) => handleCreateOrder(d, cart))}
        ref={formRef}
      >
        <Stack direction={{ xs: "column", md: "row" }} height="88vh" gap="1rem">
          {/* Left Layout */}
          <Box
            component={Paper}
            p="1.5rem"
            display="flex"
            flexDirection="column"
            gap="2rem"
            minWidth="60%"
            overflow={{ xs: "initial", lg: "auto" }}
          >
            {/* Customer Details */}
            <Stack gap="2rem">
              <Typography fontWeight="bold">Customer Details</Typography>

              {/* Customer Details */}
              <Stack direction="row" gap="1rem">
                <Input
                  control={control}
                  id="name"
                  label="Customer Name"
                  placeholder="Enter customer name"
                  fullWidth
                  size="small"
                  // required
                />
                <Input
                  control={control}
                  id="email"
                  label="Customer Email"
                  placeholder="Enter customer email"
                  fullWidth
                  size="small"
                  // required
                />
                <Input
                  control={control}
                  id="phone"
                  label="Customer phone number"
                  placeholder="Enter customer phone number"
                  fullWidth
                  size="small"
                  // required
                  type="number"
                />
              </Stack>
            </Stack>

            {/* Product Type */}
            <Divider />
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setIsOpen(true)}
            >
              Add Products
            </Button>
            <Divider />

            {/* Delivery Type */}
            <Radio
              id="deliveryType"
              options={deliveryTypeOptions}
              control={control}
              label="Delivery Type"
              row
              // required
            />

            {/* Delivery Options */}
            {deliveryType === deliveryTypeOptions[1].value && (
              <Stack gap="2rem">
                <Typography fontWeight="bold">Delivery Details</Typography>

                {/* Address line */}
                <Stack direction="row">
                  <Input
                    id="address"
                    size="small"
                    label="Address"
                    control={control}
                    fullWidth
                    multiline
                    rows={2}
                    required
                  />
                </Stack>

                {/* Delivery Details 1 */}
                <Stack mt="0.5rem" direction="row" gap="1rem">
                  <CustomDatePicker
                    control={control}
                    id="deliveryDate"
                    textFieldProps={{ size: "small", required: true }}
                    minDate={today()}
                    label="Delivery Date"
                  />
                  <Input
                    id="city"
                    size="small"
                    label="City"
                    control={control}
                    fullWidth
                    required
                  />
                </Stack>

                {/* Delivery Details 2 */}
                <Stack mt="0.5rem" direction="row" gap="1rem">
                  <Input
                    id="state"
                    size="small"
                    label="State"
                    control={control}
                    fullWidth
                    required
                  />
                  <Input
                    id="zip"
                    size="small"
                    label="Zip"
                    control={control}
                    fullWidth
                    required
                  />
                </Stack>
              </Stack>
            )}

            {deliveryType === deliveryTypeOptions[0].value && (
              <Stack gap="2rem">
                <Typography fontWeight="bold">Pickup Details</Typography>
                {/* Pickup date */}
                <CustomDatePicker
                  control={control}
                  id="deliveryDate"
                  textFieldProps={{ size: "small", required: true }}
                  minDate={today()}
                  label="Pickup Date"
                />
              </Stack>
            )}
          </Box>

          {/* Right Content */}
          <Box
            component={Paper}
            p="1.5rem"
            display="flex"
            flexDirection="column"
            gap="2rem"
            flexGrow={1}
            overflow={{ xs: "initial", md: "auto" }}
            justifyContent="space-between"
          >
            {/* Cart Information */}
            <CartSection />

            {/* Confirm Order */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setIsConfirmDialogOpen(true)}
              disabled={Object.keys(cart ?? {})?.length === 0}
              color="secondary"
            >
              Proceed to payment
            </Button>
          </Box>
        </Stack>

        {/* Dialogs */}
        <AddProductsDialog open={isOpen} onClose={() => setIsOpen(false)} />
        <ConfirmOrderDialog
          open={isConfirmDialogOpen}
          onClose={() => setIsConfirmDialogOpen(false)}
          onConfirm={() => {
            if (formRef.current) {
              formRef.current.requestSubmit();
            }
          }}
        />
      </Box>
    </DashboardLayout>
  );
};

export default DashboardCreateOrderPage;
