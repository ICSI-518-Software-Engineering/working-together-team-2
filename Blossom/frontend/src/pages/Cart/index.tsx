import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import {
    AppBar, Box, Grid, Typography, Paper, Button, TextField, Table,
    TableBody, Toolbar, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import header from '../../assets/header.png';
import ig from '../../assets/ig.png';
import wa from '../../assets/wa.png';
import fb from '../../assets/fb.png';
import { fetchCart, updateCartItemQuantity, removeCartItem } from '../../api/cartServices';
import { getSignedInUserDetails } from '@/utils/authUtils';
import CheckoutModal from './checkoutModal';

const theme = createTheme({
    palette: {
        primary: {
            main: '#f3e0dc',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f3e0dc',
                    boxShadow: 'none',
                    alignItems: 'center',
                    height: '150px',
                },
            },
        },
    },
    typography: {
        fontFamily: '',
    },
});
// TypeScript interfaces for Cart items
interface Product {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
}

interface Vendor {
    id: string;
    name: string;
    email: string;
}

interface CartItem {
    id: string;
    product: Product;
    vendor: Vendor;
    quantity: number;
}

// interface Cart {
//     user: string;
//     items: CartItem[];
//     modifiedOn: Date;
// }


const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const user = getSignedInUserDetails();
    const userId = user?._id;  // Assuming you store userId in localStorage
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const openCheckoutModal = () => setIsCheckoutOpen(true);
    const closeCheckoutModal = () => setIsCheckoutOpen(false);
    

    useEffect(() => {
        if (userId) {
            fetchCart(userId)
                .then(data => setCartItems(data))
                .catch(error => console.error('Failed to fetch cart:', error));
        }
    }, [userId]);

    const handleQuantityChange = (id: string, quantity: number) => {
        if (userId) {
            if (quantity < 1) return; // Optionally handle the scenario where the quantity is less than 1
            console.log(id);
            updateCartItemQuantity(userId, id, quantity)
                .then(updatedCart => setCartItems(updatedCart.items))
                .catch(error => console.error('Error updating cart item:', error));
        }

    };

    const handleRemoveItem = (id: string) => {
        if (userId)
            removeCartItem(userId, id)
                .then(updatedCart => setCartItems(updatedCart.items))
                .catch(error => console.error('Error removing item from cart:', error));
    };

    const getTotalCost = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };
    const [coupon, setCoupon] = useState('');


    const totalCost = getTotalCost();

    const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCoupon(event.target.value);
    };


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'white' }}>
                <AppBar position="static" color="primary" sx={{ borderRadius: '8px', overflow: 'hidden', mx: 'auto', width: '80%' }}>
                    <Toolbar sx={{ justifyContent: 'space-between', height: '100%' }}>
                        <Box sx={{ width: '100px' }}>
                            <img src={header} alt="Left Decorative" style={{ height: 'auto', width: 'auto', maxHeight: '100%', maxWidth: '100%' }} />
                        </Box>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: '8px' }}>
                            <Typography variant="h4" color="inherit">
                                Shopping Cart
                            </Typography>
                        </Box>
                        <Box sx={{ width: '100px', display: 'flex', justifyContent: 'flex-end' }}>
                            <img src={header} alt="Right Decorative" style={{ height: 'auto', width: 'auto', maxHeight: '100%', maxWidth: '100%' }} />
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* The main content of the page */}
                {/* Main content */}
                <TableContainer component={Paper} elevation={0} sx={{ mx: 'auto', my: '20px', width: '80%', borderRadius: '8px', bgcolor: '#f4f0ec' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell component="th" scope="row">
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={item.product.image} alt={item.product.name} style={{ width: '50px', marginRight: '20px' }} />
                                            <Typography>{item.product.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">${item.product.price}</TableCell>
                                    <TableCell align="right">
                                        <TextField
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))}
                                            sx={{ width: '60px' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                                    <TableCell align="right">
                                        <Button color="error" onClick={() => handleRemoveItem(item.product.id)}>
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* Centered Coupon Section */}
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <Paper elevation={1} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                                <TextField
                                    label="Use Coupon"
                                    variant="outlined"
                                    fullWidth
                                    value={coupon}
                                    onChange={handleCouponChange}
                                />
                                <Button variant="contained" color="primary" sx={{ ml: 2 }}>
                                    Apply
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Centered Order Total Section */}
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <Paper elevation={1} sx={{ p: 2, my: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Cart Total
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                                    <Typography variant="body1">Total products</Typography>
                                    <Typography variant="body1">${totalCost.toFixed(2)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                                    <Typography variant="h6">Grand Total</Typography>
                                    <Typography variant="h6">${totalCost.toFixed(2)}</Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{
                                        width: '100%',
                                        mt: 2,
                                        py: '10px',
                                        bgcolor: 'error.main',
                                        '&:hover': { bgcolor: 'error.dark' }
                                    }}
                                    onClick={openCheckoutModal}
                                >
                                    PROCEED TO CHECKOUT
                                </Button>
                                <CheckoutModal
                                    open={isCheckoutOpen}
                                    onClose={closeCheckoutModal}

                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </TableContainer>


                {/* Footer */}
                <div style={{
                    backgroundColor: '#002e63',
                    color: 'white',
                    padding: '20px',
                    textAlign: 'center',
                    borderRadius: '8px',
                }}>
                    <h3>Contact Us</h3>
                    <p>Email: example@example.com</p>
                    <p>Contact: +1 123 456 7890</p>
                    <p>Address: 123 Main Street, City, Country</p>
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
                </div>
            </Box>
        </ThemeProvider>
    );
};

export default CartPage;
