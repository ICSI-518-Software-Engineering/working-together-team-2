import {
  GetOrdersHistoryServiceResponseType,
  useGetOrdersHistoryService,
} from "@/api/orderServices";
import DataGrid from "@/components/DataGrid";
import KpiCard from "@/components/KpiCard";
import { LabelValueType } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import {
  DepartureBoard,
  DoNotDisturb,
  Hail,
  LocalShipping,
  NoCrash,
  Savings,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo } from "react";
import DashboardLayout from "..";

const DashboardOverviewPage: React.FC = () => {
  const { data: ordersHistory = [], isLoading } = useGetOrdersHistoryService();

  const ordersOverview = useMemo(
    () => getOrdersOverview(ordersHistory),
    [ordersHistory]
  );

  /**
   * ======== KPI Cards =========
   */
  const kpiCards: (LabelValueType<string, string | number> & {
    icon: React.ReactNode;
  })[] = [
    {
      label: "Total Budget",
      icon: <Savings fontSize="large" />,
      value: formatPrice(ordersOverview?.totalBudget ?? 0),
    },
    {
      label: "Pending Orders",
      icon: <DepartureBoard fontSize="large" />,
      value: ordersOverview?.pendingOrdersCount ?? 0,
    },
    {
      label: "Pickup Orders",
      icon: <Hail fontSize="large" />,
      value: ordersOverview?.pickupOrdersCount ?? 0,
    },
    {
      label: "Delivery Orders",
      icon: <LocalShipping fontSize="large" />,
      value: ordersOverview?.deliveryOrdersCount ?? 0,
    },
    {
      label: "Completed Orders",
      icon: <NoCrash fontSize="large" />,
      value: ordersOverview?.completedOrdersCount ?? 0,
    },
    {
      label: "Cancelled Orders",
      icon: <DoNotDisturb fontSize="large" />,
      value: ordersOverview?.cancelledOrdersCount ?? 0,
    },
  ];

  /**
   * ======== Overview table columns =======
   */
  const overviewTableColumns = useMemo(
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
          accessorFn: (item) => dayjs(item.deliveryDate).format("DD-MMM-YYYY"),
        },
        {
          accessorKey: "price",
          header: "Price",
          accessorFn: (item) => formatPrice(item.price),
        },
      ] as MRT_ColumnDef<GetOrdersHistoryServiceResponseType>[],
    []
  );

  return (
    <DashboardLayout>
      <Stack gap="1.5rem">
        {/* KPI Cards */}
        <Stack
          direction="row"
          alignItems="center"
          gap="2rem"
          flexWrap={{
            xs: "wrap",
            // sm: "nowrap",
          }}
        >
          {kpiCards.map((item) => (
            <KpiCard
              key={item.label}
              label={item.label}
              icon={item.icon}
              sx={{
                width: {
                  xs: "100%",
                  sm: "18rem",
                  height: "9rem",
                },
              }}
            >
              <Typography fontSize="2rem" mt="1rem" fontWeight="bolder">
                {item.value}
              </Typography>
            </KpiCard>
          ))}
        </Stack>

        {/* Recent Orders Table */}
        <DataGrid
          muiTableContainerProps={{
            sx: {
              minHeight: "50vh",
            },
          }}
          tableTitle="Recent Orders"
          columns={overviewTableColumns}
          rows={ordersHistory.slice(0, 10)}
          state={{ isLoading: isLoading }}
        />
      </Stack>
    </DashboardLayout>
  );
};

export default DashboardOverviewPage;

const getOrdersOverview = (
  ordersHistory: GetOrdersHistoryServiceResponseType[]
) => {
  const data = {
    totalBudget: 0,
    deliveryOrdersCount: 0,
    pickupOrdersCount: 0,
    completedOrdersCount: 0,
    pendingOrdersCount: 0,
    cancelledOrdersCount: 0,
  };

  if (!ordersHistory || ordersHistory.length === 0) {
    return data;
  }

  ordersHistory.forEach((o) => {
    if (o.status === "Cancelled") {
      data.cancelledOrdersCount += 1;
      return;
    }

    data.totalBudget += o.price;

    if (o.deliveryType === "Delivery") {
      data.deliveryOrdersCount += 1;
    } else {
      data.pickupOrdersCount += 1;
    }

    if (o.status === "Complete") {
      data.completedOrdersCount += 1;
    } else {
      data.pendingOrdersCount += 1;
    }
  });

  return data;
};
