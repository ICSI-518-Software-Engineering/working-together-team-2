import DataGrid from "@/components/DataGrid";
import KpiCard from "@/components/KpiCard";
import { LabelValueType } from "@/lib/constants";
import { Hail, LocalShipping } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import React from "react";
import DashboardLayout from "..";

const DashboardOverviewPage: React.FC = () => {
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
            sm: "nowrap",
          }}
        >
          {kpiCards.map((item) => (
            <KpiCard
              key={item.label}
              label={item.label}
              icon={item.icon}
              sx={{ width: { xs: "100%", sm: "15rem" } }}
            >
              <Typography fontSize="2rem" mt="1rem" fontWeight="bolder">
                7
              </Typography>
            </KpiCard>
          ))}
        </Stack>

        {/* Recent Orders Table */}
        <DataGrid columns={[]} rows={[]} />
      </Stack>
    </DashboardLayout>
  );
};

export default DashboardOverviewPage;

/**
 * ======== DATA =========
 */
const kpiCards: (LabelValueType & { icon: React.ReactNode })[] = [
  {
    label: "Pickup Orders",
    icon: <Hail fontSize="large" />,
    value: "pickupOrders",
  },
  {
    label: "Delivery Orders",
    icon: <LocalShipping fontSize="large" />,
    value: "deliveryOrders",
  },
];
