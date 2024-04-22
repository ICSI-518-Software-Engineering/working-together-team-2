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
import { LabelValueType } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import {
  Button,
  Divider,
  Drawer,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
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
          accessorFn: (item) => dayjs(item.deliveryDate).format(DATE_FORMAT),
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

  /**
   * ============ Delivery Details =============
   */

  const deliveryDetails: LabelValueType[] = useMemo(
    () => [
      {
        label: "Order Status",
        value: selectedOrder?.status ?? "--",
      },
      {
        label: "Delivery Type",
        value: selectedOrder?.deliveryType ?? "--",
      },
      {
        label: "Delivery Date",
        value: dayjs(selectedOrder?.deliveryDate).format(DATE_FORMAT) ?? "--",
      },
      {
        label: "Name",
        value: selectedOrder?.customerDetails?.name ?? "--",
      },
      {
        label: "Email",
        value: selectedOrder?.customerDetails?.email ?? "--",
      },
      {
        label: "Phone Number",
        value: selectedOrder?.customerDetails?.phone ?? "--",
      },
      {
        label: "Address",
        value: selectedOrder?.customerDetails?.address ?? "--",
      },
      {
        label: "City",
        value: selectedOrder?.customerDetails?.city ?? "--",
      },
      {
        label: "State",
        value: selectedOrder?.customerDetails?.state ?? "--",
      },
      {
        label: "Zip",
        value: selectedOrder?.customerDetails?.zip ?? "--",
      },
    ],
    [selectedOrder]
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
          <Divider />

          {/* Address Details */}
          <Typography variant="h6" fontWeight="bold">
            Delivery Details
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {deliveryDetails.map((d) => (
                  <TableRow key={d.label}>
                    <TableCell variant="head">{d.label}</TableCell>
                    <TableCell>{d.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Drawer>
    </DashboardLayout>
  );
};

export default DashboardOrdersHistoryPage;

const DATE_FORMAT = "DD-MMM-YYYY";
