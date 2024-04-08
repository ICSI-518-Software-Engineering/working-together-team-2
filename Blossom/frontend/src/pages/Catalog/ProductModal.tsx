import React from 'react';
import { Box, Typography, Button, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

// Define the theme for the modal here or import from your themes file
const modalTheme = createTheme({
    palette: {
        primary: {
            main: '#4caf50', // Background color for the rating box
        },
        text: {
            primary: '#ffa000', // Text color for the rating box
        },
    },
    typography: {
        fontSize: 12, // Font size for the rating
        fontWeightBold: 700, // Font weight for the rating
    },
});

// Define the Product interface to describe the expected structure of props
interface Product {
    name: string;
    price: number;
    rating: number;
    imageUrl: string;
    description: string;
}

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
    return (
        <ThemeProvider theme={modalTheme}>
            <Modal open={isOpen} onClose={onClose}>
                <Box style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white', padding: '20px', borderRadius: '8px', outline: 'none',
                    width: '400px', // Increased width of the modal
                    textAlign: 'center', // Center aligning text
                }}>
                    <IconButton
                        onClick={onClose}
                        style={{ position: 'absolute', top: '5px', right: '5px' }}
                        aria-label="Close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                    <Typography variant="h6" color="textPrimary" style={{ marginTop: '20px', fontWeight: 'bold' }}>{product.name}</Typography>
                    <Box display="flex" alignItems="center" justifyContent="center" my={2}>
                        {[...Array(product.rating)].map((_, i) => (
                            <StarIcon key={i} style={{ color: '#FFD700' }} />
                        ))}
                        {[...Array(5 - product.rating)].map((_, i) => (
                            <StarBorderIcon key={i} style={{ color: '#FFD700' }} />
                        ))}
                    </Box>
                    <Typography variant="body1" color="textSecondary" style={{ marginBottom: '10px' }}>{product.description}</Typography>
                    <Typography variant="h6" color="textPrimary">Price: ${product.price}</Typography> {/* Displaying price */}
                    <Button
                        startIcon={<ShoppingCartIcon />}
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        startIcon={<MonetizationOnIcon />}
                        variant="contained"
                        color="secondary"
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        Buy Now
                    </Button>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default ProductModal;
