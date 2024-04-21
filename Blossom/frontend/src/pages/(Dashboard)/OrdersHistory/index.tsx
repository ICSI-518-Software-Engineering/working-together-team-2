import {
  GetOrdersHistoryServiceResponseType,
  OrderStatusType,
  useGetOrdersHistoryService,
  useUpdateOrdersHistoryService,
} from "@/api/orderServices";
import DataGrid from "@/components/DataGrid";
import { formatPrice } from "@/lib/utils";
import {
  Button,
  Drawer,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo, useState } from "react";
import DashboardLayout from "..";
import CartItemsDisplay from "../CreateOrder/CartItemsDisplay";

const DashboardOrdersHistoryPage: React.FC = () => {
  const { data: ordersHistory = [], isLoading } = useGetOrdersHistoryService();

  const { mutate: updateOrder, isPending } = useUpdateOrdersHistoryService();

  const [selectedOrder, setSelectedOrder] =
    useState<GetOrdersHistoryServiceResponseType | null>(null);

  /**
   * ======== Orders History table columns =======
   */
  const ordersHistoryTableColumns = useMemo(
    () =>
      [
        {
          accessorKey: "_id",
          header: "Order ID",
        },
        {
          accessorKey: "customerDetails.name",
          header: "Customer Name",
        },
        {
          accessorKey: "customerDetails.phone",
          header: "Customer Phone",
        },
        {
          accessorKey: "customerDetails.email",
          header: "Customer Email",
        },
        {
          accessorKey: "deliveryType",
          header: "Delivery Type",
        },
        {
          accessorKey: "deliveryDate",
          header: "Delivery Date",
        },
        {
          accessorKey: "price",
          header: "Price",
          accessorFn: (item) => formatPrice(item.price),
        },
        {
          accessorKey: "status",
          header: "Order Status",
          accessorFn: (item) => (
            <Select
              defaultValue={item.status}
              size="small"
              sx={{ width: "10rem" }}
              onChange={({ target }) =>
                updateOrder({
                  _id: item._id,
                  status: target?.value as OrderStatusType,
                })
              }
              disabled={isPending}
            >
              <MenuItem value="Complete">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          ),
          enableSorting: false,
        },
        {
          header: "",
          id: "view-order-details",
          accessorFn: (item) => (
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => setSelectedOrder(item)}
            >
              View Order Details
            </Button>
          ),
          enableSorting: false,
        },
      ] as MRT_ColumnDef<GetOrdersHistoryServiceResponseType>[],
    [isPending, updateOrder]
  );

  return (
    <DashboardLayout>
      <DataGrid
        rows={ordersHistory}
        columns={ordersHistoryTableColumns}
        tableTitle="Orders History"
        state={{ isLoading: isLoading }}
        muiTableContainerProps={{
          sx: {
            height: "75vh",
          },
        }}
      />

      {/* Sidebar */}
      <Drawer
        open={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        anchor="right"
      >
        <Stack gap="2rem" p="2rem">
          <Typography variant="h6" fontWeight="bold">
            Order Details
          </Typography>
          <CartItemsDisplay
            preview
            cartProducts={selectedOrder?.products ?? []}
          />
        </Stack>
      </Drawer>
    </DashboardLayout>
  );
};

export default DashboardOrdersHistoryPage;
