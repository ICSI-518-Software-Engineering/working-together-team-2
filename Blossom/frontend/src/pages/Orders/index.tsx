import React, { useMemo , useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  Stack,
  ThemeProvider,
  Toolbar,
  Table,
  TableBody,
  TableRow,
  Divider,
  TableContainer,
  TableCell,

  Typography,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import DataGrid from '@/components/DataGrid';
import CartItemsDisplay from '../(Dashboard)/CreateOrder/CartItemsDisplay';
import { formatPrice } from '@/lib/utils';
import dayjs from "dayjs";
import { LabelValueType } from "@/lib/constants";


// Assuming these icons are correctly imported from your assets
import ig from '../../assets/ig.png';
import wa from '../../assets/wa.png';
import fb from '../../assets/fb.png';
import { getSignedInUserDetails } from '@/utils/authUtils';

interface Product {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  stockInNumber: number;
  type: 'Flower' | 'Vase' | 'Custom' | 'FlowerAndVase';
  tags: string[];
  image: string;
  description: string;
}

interface CartItemType {
  product: Product;
  quantity: number;
}

interface Order {
  _id: string;
  vendorName: string;
  deliveryType: string;
  deliveryDate: string;
  price: number;
  status: 'Complete' | 'Pending' | 'Cancelled';
  products: CartItemType[];
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#f4f5fd',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const DashboardOrdersHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = getSignedInUserDetails();
      const userId = user ? user._id : ''; // Ensure a fallback in case _id isn't available
      if (!userId) {
        console.error('User ID is not available');
        setIsLoading(false);
        return; // Exit if no user ID is found
      }

      setIsLoading(true);
      try {
        // Note the usage of backticks here for the template literal
        const response = await fetch(`http://localhost:8086/api/order/user/${userId}`);
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
      setIsLoading(false);
    };

    fetchOrders();
  }, []);


  const columns = [
    { header: 'Order ID', accessorKey: '_id' },
    { header: 'Delivery Type', accessorKey: 'deliveryType' },
    { header: 'Delivery Date', accessorKey: 'deliveryDate' },
    { header: 'Price', accessorKey: 'price', accessorFn: (item: Order) => formatPrice(item.price) },
    { header: 'Order Status', accessorKey: 'status' },
    {
      header: '',
      id: 'view-order-details',
      accessorFn: (item: Order) => (
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
  ];
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
    ],
    [selectedOrder]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">Customer Order History</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'white' }}>
        <Box sx={{ p: 2, flexGrow: 1 }}>
          <DataGrid
            rows={orders}
            columns={columns}
            tableTitle="Your Orders"
            state={{ isLoading }}
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
        </Box>
        {/* Footer */}
        <Box component="footer" sx={{ p: 2, bgcolor: '#002e63', mt: 'auto' }}>
          <Typography sx={{ color: 'white', textAlign: 'center' }}>
            <strong>Contact Us</strong>
            <div>Email: example@example.com</div>
            <div>Contact: +1 123 456 7890</div>
            <div>Address: 123 Main Street, City, Country</div>
            <div style={{ marginTop: '20px' }}>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <img src={ig} alt="Instagram" style={{ width: '45px', marginRight: '10px' }} />
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <img src={fb} alt="Facebook" style={{ width: '30px', marginRight: '10px' }} />
              </a>
              <a href="https://api.whatsapp.com/send?phone=1234567890" target="_blank" rel="noopener noreferrer">
                <img src={wa} alt="WhatsApp" style={{ width: '50px' }} />
              </a>
            </div>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardOrdersHistoryPage;
const DATE_FORMAT = "DD-MMM-YYYY";
