import React, { useState, useEffect } from 'react';
import header from '../../assets/header.png';
import {
    Checkbox, FormControlLabel, FormGroup, Typography, Autocomplete, TextField, Box,
    Grid, Pagination // Import Grid and Pagination here
} from '@mui/material';
import ig from '../../assets/ig.png';
import wa from '../../assets/wa.png';
import fb from '../../assets/fb.png';




interface Vendor {
    id: string; // Add ID property
    name: string;
    email: string;
}

interface Product {
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
    const [selectedVendor, setSelectedVendor] = React.useState<Vendor | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    // Function to handle opening modal
    const handleOpenModal = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };
    const [page, setPage] = useState(1);
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
                <div style={{ width: '250px', padding: '20px', backgroundColor: '#f4f4f4', color: 'black' }}>
                    <Typography variant="h6" style={{ marginBottom: '10px' }}>Filters</Typography>
                    {/* Price Filter */}
                    <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>Price</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="0-50" />
                        <FormControlLabel control={<Checkbox />} label="50-100" />
                        {/* Add more price ranges */}
                    </FormGroup>

                    {/* Ingredient Filter */}
                    <Typography variant="subtitle1" style={{ margin: '20px 0' }}>Ingredients</Typography>
                    <FormGroup>
                        {/* Add checkboxes for each ingredient */}
                        <FormControlLabel control={<Checkbox />} label="Roses" />
                        <FormControlLabel control={<Checkbox />} label="Sunflowes" />
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