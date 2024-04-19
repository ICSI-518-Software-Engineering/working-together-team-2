import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, {  useState, useEffect } from 'react';
import {
    AppBar, Box, Grid, Typography, Paper, Button, TextField, Table,
    TableBody, Toolbar, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import header from '../../assets/header.png';
import ig from '../../assets/ig.png';
import wa from '../../assets/wa.png';
import fb from '../../assets/fb.png';
import { fetchCart, updateCartItemQuantity, removeCartItem } from '../../api/cartService';
import { getSignedInUserDetails } from '@/utils/authUtils';




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
    imageUrl: string;
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

interface Cart {
    user: string;
    items: CartItem[];
    modifiedOn: Date;
}


const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const user = getSignedInUserDetails();
    const userId = user?._id;  // Assuming you store userId in localStorage

    useEffect(() => {
        if (userId) {
            fetchCart(userId)
                .then(data => setCartItems(data))
                .catch(error => console.error('Failed to fetch cart:', error));
        }
    }, [userId]);

    const handleQuantityChange = (id: string, quantity: number) => {
        if(userId) {
            if (quantity < 1) return; // Optionally handle the scenario where the quantity is less than 1
            updateCartItemQuantity(userId, id, quantity)
                .then(updatedCart => setCartItems(updatedCart.items))
                .catch(error => console.error('Error updating cart item:', error));
        }
        
    };

    const handleRemoveItem = (id: string) => {
        if(userId)
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

                


   
                
            </Box>
        </ThemeProvider>
    );
};

export default CartPage;
