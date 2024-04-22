import React, { useState, useEffect } from 'react';
import ProductModal from './ProductModal';
import header from '../../assets/header.png';
import {
    Checkbox, FormControlLabel, FormGroup, Typography, Autocomplete, TextField, Box,
    Grid, Pagination // Import Grid and Pagination here
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ig from '../../assets/ig.png';
import wa from '../../assets/wa.png';
import fb from '../../assets/fb.png';


const theme = createTheme({
    components: {
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: '#ff8c00', // Selected page number background color
                        color: 'white', // Selected page number text color
                    },
                    '&:hover': {
                        backgroundColor: '#ffa726', // Hover state background color
                        color: 'white', // Hover state text color
                    },
                    color: 'black', // Default text color
                },
            },
        },
    },
});

const ratingTheme = createTheme({
    palette: {
        primary: {
            main: '#333', // Background color for the rating box
        },
        text: {
            primary: '#ffffff', // Text color for the rating box
        },
    },
    typography: {
        fontSize: 12, // Font size for the rating
        fontWeightBold: 700, // Font weight for the rating
    },
});


interface Vendor {
    id: string; // Add ID property
    name: string;
    email: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
    rating: number;
    imageUrl: string;
    description: string;
}

// // Static data for vendors, sorted in ascending order by name
// const vendors: Vendor[] = [
//     { id: '1', name: 'Vendor 1', email: 'vendor1@example.com' },
//     { id: '2', name: 'Vendor2', email: 'vendor2@example.com' },
//     // Add more vendors here
// ].sort((a, b) => a.name.localeCompare(b.name));



// // Static data for products (will be replaced with API call)
// const productsByVendor: { [key: string]: Product[] } = {
//     'Giridhar': [
//         { name: 'Product adfiuefhwfkjbf', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         { name: 'Product A', price: 10, rating: 4, imageUrl: 'product_image_url', description: 'Product A description' },
//         { name: 'Product B', price: 20, rating: 3, imageUrl: 'product_image_url', description: 'Product B description' },
//         // Add more products for Vendor 1 here

//     ],
//     'Vendor2': [
//         { name: 'Product X', price: 15, rating: 5, imageUrl: 'product_image_url', description: 'Product X description' },
//         { name: 'Product Y', price: 25, rating: 4, imageUrl: 'product_image_url', description: 'Product Y description' },
//         // Add more products for Vendor 2 here
//     ],
//     // Add more vendors and products here
// };
const productsPerPage = 12;
const CatalogPage = () => {
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [priceFilter, setPriceFilter] = useState<string[]>([]);
    const [ingredientFilter, setIngredientFilter] = useState<string[]>([]);
    // Filter products based on price


    // Function to handle opening modal
    const handleOpenModal = (product: Product,vendor:Vendor) => {
        console.log(product.id);

        setSelectedVendor(vendor);
        setSelectedProduct(product);
        setModalOpen(true);
    };
    const [page, setPage] = useState(1);

    const applyFilters = () => {
        return products
            .filter(product => priceFilter.length === 0 || priceFilter.some(range => {
                const [min, max] = range.split('-').map(Number);
                return product.price >= min && product.price <= max;
            }))
            .filter(product => ingredientFilter.length === 0 || ingredientFilter.some(ingredient => product.description.toLowerCase().includes(ingredient.toLowerCase())));
    };
    const handlePriceFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = event.target;
        setPriceFilter(prev => checked ? [...prev, value] : prev.filter(item => item !== value));
    };

    const handleIngredientFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = event.target;
        setIngredientFilter(prev => checked ? [...prev, value] : prev.filter(item => item !== value));
    };


    const filteredProducts = applyFilters();
    const totalProducts = selectedVendor ? products.length : 0;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    useEffect(() => {
        // Fetch vendors from API
        fetch('http://localhost:8086/api/auth/vendors')
            .then(response => response.json())
            .then((responseData: any[]) => {
                // Map the response data to Vendor objects
                const mappedVendors: Vendor[] = responseData.map((data: any) => ({
                    id: data._id,
                    name: data.name,
                    email: data.email
                }));
                // Set the vendors in state
                setVendors(mappedVendors);
            })
            .catch(error => console.error('Error fetching vendors:', error));
    }, []);

    useEffect(() => {
        if (selectedVendor) {
            fetchProductsByVendor(selectedVendor.id);
        }
    }, [selectedVendor]);

    const fetchProductsByVendor = (vendorId: string) => {
        fetch(`http://localhost:8086/api/products/in-stock`)
            .then(response => response.json())
            .then((responseData: any[]) => {
                const mappedProducts: Product[] = responseData.map(data => ({
                    id: data._id,
                    name: data.name,
                    price: data.price,
                    rating: data.rating || 5,
                    imageUrl: data.image,
                    description: data.description,
                    stock: data.stockInNumber,
                }));
                setProducts(mappedProducts);
            })
            .catch(error => console.error('Error fetching products:', error));
    };


    // Function to handle closing modal
    const handleCloseModal = () => {
        setSelectedProduct(null);
        setModalOpen(false);
    };


    return (
        <>
            <div style={{ display: 'flex', backgroundColor: 'white', minHeight: '100vh' }}>
                {/* Sidebar */}
                {/* Filters Section */}
                <div style={{ width: '250px', padding: '20px', backgroundColor: '#f4f4f4', color: 'black' }}>
                    <Typography variant="h6" style={{ marginBottom: '10px' }}>Filters</Typography>
                    {/* Price Filter */}
                    <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>Price</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={handlePriceFilterChange} value="0-50" />} label="0-50" />
                        <FormControlLabel control={<Checkbox onChange={handlePriceFilterChange} value="50-100" />} label="50-100" />
                        {/* Add more price ranges */}
                    </FormGroup>

                    {/* Ingredient Filter */}
                    <Typography variant="subtitle1" style={{ margin: '20px 0' }}>Ingredients</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={handleIngredientFilterChange} value="Roses" />} label="Roses" />
                        <FormControlLabel control={<Checkbox onChange={handleIngredientFilterChange} value="Sunflowers" />} label="Sunflowers" />
                        {/* Add checkboxes for each ingredient */}
                    </FormGroup>
                </div>

                {/* Main Content */}
                <div style={{ flex: 1, padding: '20px', marginRight: '200px' }}>
                    {/* Header with Image and Select Vendor Option */}
                    <Box style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAE1DC', padding: '20px', borderRadius: '8px', height: '250px' }}>
                        <Box style={{ zIndex: 2, textAlign: 'center' }}>
                            <Typography variant="h4" style={{ color: '#333', fontWeight: 'bold', marginBottom: '0.5em' }}>
                                Discover Your Style
                            </Typography>
                            <Typography variant="subtitle1" style={{ color: '#333', fontWeight: 'bold', marginBottom: '0.5em' }}>
                                Select Vendor
                            </Typography>
                            <Autocomplete
                                options={vendors}
                                getOptionLabel={(option) => option.name}
                                style={{ width: 300, backgroundColor: 'white', borderRadius: '4px' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Search for a vendor"
                                        variant="outlined"
                                    />
                                )}
                                value={selectedVendor}
                                onChange={(event: any, newVendor: Vendor | null) => {
                                    setSelectedVendor(newVendor);
                                    setPage(1);
                                }}
                                isOptionEqualToValue={(option, value) => option.email === value?.email}
                            />
                        </Box>
                        <Box style={{ position: 'absolute', top: '20px', left: '20px' }}>
                            <img
                                src={header}
                                alt="Header Background Left"
                                style={{ height: '210px', borderRadius: '8px' }}
                            />
                        </Box>
                        <Box style={{ position: 'absolute', top: '20px', right: '20px' }}>
                            <img
                                src={header}
                                alt="Header Background Right"
                                style={{ height: '210px', borderRadius: '8px' }}
                            />
                        </Box>
                    </Box>
                    {selectedVendor && (
                        <Grid container spacing={2} style={{ marginTop: theme.spacing(2) }}>
                            {filteredProducts
                                .sort((a, b) => b.rating - a.rating) // Sort products by rating in descending order
                                .slice((page - 1) * productsPerPage, page * productsPerPage) // Pagination logic
                                .map((product, index) => (
                                    <Grid item xs={12} sm={3} key={index} onClick={() => handleOpenModal(product, selectedVendor)}>
                                        <Box textAlign="center" p={2} boxShadow={2} borderRadius={2} position="relative">
                                            {/* Rating displayed in top right corner */}
                                            <ThemeProvider theme={ratingTheme}>
                                                <Box
                                                    position="absolute"
                                                    top={0}
                                                    right={0}
                                                    zIndex={1}
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    {[...Array(product.rating)].map((_, i) => (
                                                        <StarIcon key={i} fontSize="small" style={{ color: '#FFD700' }} />
                                                    ))}
                                                    {[...Array(5 - product.rating)].map((_, i) => (
                                                        <StarBorderIcon key={i} fontSize="small" style={{ color: '#FFD700' }} />
                                                    ))}
                                                </Box>
                                            </ThemeProvider>

                                            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />

                                            {/* Centered box with pink background color containing product name and price */}
                                            <Box
                                                bgcolor="#FF69B4"
                                                p={1}
                                                mt={1}
                                                borderRadius={4}
                                                width="fit-content"
                                                mx="auto" // Center the box horizontally
                                            >
                                                <Typography variant="body1" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{product.name}</Typography>
                                                <Typography variant="body2" style={{ color: '#87CEEB', fontWeight: 'bold' }}>${product.price.toFixed(2)}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                        </Grid>
                    )}

                    {/* Pagination component */}
                    {selectedVendor && totalPages > 1 && (
                        <ThemeProvider theme={theme}>
                            <Box display="flex" justifyContent="center" mt={4}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </Box>
                        </ThemeProvider>
                    )}



                    {/* Additional content can go here */}

                    {/* Modal for displaying product details */}
                    {selectedProduct && selectedVendor && (
                        <ProductModal
                            product={selectedProduct}
                            vendor={selectedVendor}
                            isOpen={modalOpen}
                            onClose={handleCloseModal}
                        />
                    )}
                </div>
            </div>
            <div style={{
                backgroundColor: '#002e63',
                color: 'white',
                padding: '20px',
                textAlign: 'center',
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

        </>
    );
};

export default CatalogPage;