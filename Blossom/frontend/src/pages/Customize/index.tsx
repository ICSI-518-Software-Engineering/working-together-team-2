import React, { useState, useEffect, useMemo } from 'react';
import header from '../../assets/header.png';
import ig from '../../assets/ig.png';
import wa from '../../assets/wa.png';
import fb from '../../assets/fb.png';
import { AppBar, Box, Button, Autocomplete, createTheme, CssBaseline, FormControl, TextField, ThemeProvider, Toolbar, Typography } from '@mui/material';


// Theme Configuration
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
    },
    typography: {
        h4: {
            fontWeight: 600,
        },
    },
});

interface Vendor {
    id: string; // Add ID property
    name: string;
    email: string;
}

// Product Types
const productTypes = ["Flower", "Vase"] as const;

// Type for Product Types
type ProductType = typeof productTypes[number];


interface Product {
    name: string;
    price: number;
    rating: number;
    imageUrl: string;
    description: string;
    stock: number;
    image: string;
    tags: string[];
    type: ProductType;
    stockInNumber: number;
    isActive: boolean;
}

const CustomizePage: React.FC = () => {
   

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'white' }}>
                <AppBar position="static" color="primary" sx={{ borderRadius: '8px', overflow: 'hidden', mx: 'auto', width: '80%' }}>
                    <Toolbar sx={{ justifyContent: 'space-between', height: '100%' }}>
                        <Box sx={{ width: '100px' }}>
                            <img src={header} alt="Left Decorative" style={{ height: 'auto', width: 'auto', maxHeight: '100%', maxWidth: '100%' }} />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#f8f8f8', // Light grey background for contrast
                            borderRadius: '8px',
                            p: 2, // Padding around the text
                            boxShadow: 2, // Box shadow for a subtle depth effect
                            mb: 3, // Margin bottom for spacing from the next element
                        }}>
                            <Typography
                                variant="h4"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.8rem', // Larger font size
                                    color: '#333', // Darker text color for contrast
                                    textShadow: '1px 1px 2px #aaa', // Text shadow for a subtle 3D effect
                                }}
                            >
                                Customize Your Bouquet
                            </Typography>
                        </Box>

                        <Box sx={{ width: '100px', display: 'flex', justifyContent: 'flex-end' }}>
                            <img src={header} alt="Right Decorative" style={{ height: 'auto', width: 'auto', maxHeight: '100%', maxWidth: '100%' }} />
                        </Box>
                    </Toolbar>
                </AppBar>

                
                {/* Footer */}
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
        </ThemeProvider >

    );
};

export default CustomizePage;
