import React, { useState, useEffect, useMemo } from 'react';
import header from '../../assets/header.png';
import ig from '../../assets/ig.png';
import wa from '../../assets/wa.png';
import fb from '../../assets/fb.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { AppBar, Box, Button, Autocomplete, createTheme, CssBaseline, FormControl, TextField, ThemeProvider, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductVisualizationModal from './ProductVisualizationModal';
import { CatalogItemDataType } from "../(Dashboard)/Catalog/typesAndData";
import { addToCart } from '../../api/cartServices';
import { createCustomCatalogService } from '../../api/catalogServices';
import { getSignedInUserDetails } from '@/utils/authUtils';
import BuyNowModal from '../Catalog/BuyNowModal'; // Import BuyNowModal


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
    const [vendor, setVendor] = useState('');
    const [filteredFlowers, setFilteredFlowers] = useState<Product[]>([]);
    const [selectedVase, setSelectedVase] = useState<Product | null>(null);
    const [filteredVases, setFilteredVases] = useState<Product[]>([]);
    const [selectedVendor, setSelectedVendor] = React.useState<Vendor | null>(null);
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [buyNowModalOpen, setBuyNowModalOpen] = useState(false);
    const [currentProductDetails, setCurrentProductDetails] = useState({ productId: '', vendorId: '', userId: '' });
    const handleBuyNow = async () => {
        if (!selectedVendor || flowerSelections.length === 0) {
            console.error('Vendor not selected or no flowers selected');
            return;
        }



        // Assuming these are your allowed types
        type ProductType = "Flower" | "Vase" | "Custom" | "FlowerAndVase";

        const customProductData: {
            name: string;
            description: string;
            price: number;
            tags: string[];
            type: ProductType; // Adjusted to use ProductType
            stockInNumber: number;
            image: string;
        } = {
            name: "Customized Product",
            description: generateSelectedProductsText(),
            price: calculateOrderTotal(),
            tags: flowerSelections.map(selection => selection.flower?.name).filter((name): name is string => !!name),
            type: "Custom", // Ensure this is one of the accepted values
            stockInNumber: 100,
            image: imageUrl ? imageUrl : `https://image.pollinations.ai/prompt/${encodeURIComponent(generateSelectedProductsText())}`
        };


        try {
            const createdProduct = await createCustomCatalogService(customProductData);
            const productId = createdProduct._id ? createdProduct._id : '';
            const user = getSignedInUserDetails();
            const userId = user?._id ? user._id : '';
            if (createdProduct && createdProduct._id) {
                setCurrentProductDetails({
                    productId: productId,
                    vendorId: selectedVendor.id,
                    userId: userId
                });
                setBuyNowModalOpen(true);
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };



    const handleImageUrlChange = (newImageUrl: string | null) => {
        setImageUrl(newImageUrl);
    };

    const [flowerSelections, setFlowerSelections] = useState<{ flower: Product | null, quantity: number }[]>([{ flower: null, quantity: 1 }]);


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
            fetchProductsByVendor();
        }
    }, [selectedVendor]);

    const fetchProductsByVendor = () => {
        fetch(`http://localhost:8086/api/products/in-stock-all`)
            .then(response => response.json())
            .then((responseData: any[]) => {
                const mappedProducts: Product[] = responseData.map(data => ({
                    name: data.name,
                    price: data.price,
                    rating: data.rating || 5,
                    imageUrl: data.image, // assuming data.image is the URL of the image
                    description: data.description,
                    stock: data.stockInNumber,
                    image: data.image, // this is redundant with imageUrl, adjust as needed
                    tags: data.tags || [], // provide default value if not present
                    type: data.type,
                    stockInNumber: data.stockInNumber,
                    isActive: data.isActive
                }));
                setProducts(mappedProducts);
            })
            .catch(error => console.error('Error fetching products:', error));
    };
    const generateSelectedProductsText = (): string => {
        let parts: string[] = [];  // Explicitly type the parts array

        // Iterate over flower selections
        flowerSelections.forEach(selection => {
            if (selection.flower) {
                // Include only the flower name, ensuring it is pluralized correctly
                const flowerName = selection.flower.name.toLowerCase();
                const pluralFlowerName = flowerName.endsWith('s') ? flowerName : `${flowerName}s`;
                parts.push(pluralFlowerName);
            }
        });

        // Construct the final text for the product visualization prompt
        let text = 'Generate a single realistic image of a product visualization of';
        if (parts.length > 0) {
            text += ` ${parts.join(', ')}`;
        }

        // Add selected vase if it exists
        if (selectedVase) {
            text += ` in a ${selectedVase.name.toLowerCase()} vase`;
        }

        return text;
    };



    const [showModal, setShowModal] = useState(false);


    const vases = useMemo(() => products.filter(p => p.type === 'Vase'), [products]);

    useEffect(() => {
        if (vendor) {
            setFilteredFlowers(products.filter(p => p.type === 'Flower'));
            setFilteredVases(products.filter(p => p.type === 'Vase'));
        } else {
            setFilteredFlowers([]);
            setFilteredVases([]);
            filteredVases;
        }
    }, [vendor]);


    useEffect(() => {
        if (selectedVendor) {
            setFilteredFlowers(products.filter(p => p.type === 'Flower'));
        } else {
            setFilteredFlowers([]);
        }
    }, [selectedVendor, products]);

    const handleAddFlower = () => {
        setFlowerSelections([...flowerSelections, { flower: null, quantity: 1 }]);
    };

    const handleFlowerChange = (index: number) => (_: React.ChangeEvent<{}>, value: Product | null) => {
        const newSelections = [...flowerSelections];
        newSelections[index].flower = value;
        setFlowerSelections(newSelections);
    };



    const handleVaseChange = (event: any, value: Product | null) => {
        event;
        setSelectedVase(value);
    };

    const calculateOrderTotal = () => {
        let total = flowerSelections.reduce((acc, selection) => acc + (selection.flower ? selection.flower.price * 15 : 0), 0);

        if (selectedVase) {
            total += selectedVase.price;
        }

        return total;
    };

    const handleAddToCart = async () => {
        if (!selectedVendor || flowerSelections.length === 0) {
            console.error('Vendor not selected or no flowers selected');
            return;
        }

        setVendor(selectedVendor.email);
        const customProductName = "Customized Product";
        const description = generateSelectedProductsText();
        const tags = flowerSelections.map(selection => selection.flower?.name).filter((name): name is string => !!name);
        const totalPrice = calculateOrderTotal();
        const selectedImageText = generateSelectedProductsText(); // Call the function here to get the text directly


        const customProductData: CatalogItemDataType = {

            name: customProductName,
            description,
            price: totalPrice,
            tags,
            type: "Custom",
            stockInNumber: 100,
            image: imageUrl ? imageUrl : `https://image.pollinations.ai/prompt/${selectedImageText}`  // Add image blob here
        };

        try {
            const createdProduct = await createCustomCatalogService(customProductData);
            const productId = createdProduct._id ? createdProduct._id : '';
            const user = getSignedInUserDetails();
            const userId = user?._id ? user._id : '';
            await addToCart({
                userId: userId,
                productId,
                vendorId: selectedVendor.id,
                quantity: 1
            });
            alert('Product added to cart!');
            console.log('Product added to cart successfully');
            location.reload();
        } catch (error) {
            alert('Error occure while adding to cart!');
            console.error('Error handling add to cart:', error);
        }
    };

    const handleVisualizeClick = () => {
        const selectedProductsText = generateSelectedProductsText(); // Call the function here to get the text directly
        // Now you can use the selectedProductsText to prompt an AI API or perform any other action
        console.log(selectedProductsText);
        setShowModal(true);
    };


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

                {/* Main Content */}
                <Box sx={{ p: 4, mx: 'auto', width: '80%', borderRadius: '8px', textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Select the best vendor</Typography>

                    <FormControl sx={{ mb: 2, width: '50%', mx: 'auto' }}>
                        <Autocomplete
                            options={vendors}
                            getOptionLabel={(option) => option.name}
                            value={selectedVendor}
                            onChange={(event: any, newVendor: Vendor | null) => {
                                event;
                                setSelectedVendor(newVendor);

                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Vendor"
                                    placeholder="Type to search vendors"
                                    sx={{
                                        '& .MuiInputLabel-root': { // Label styling
                                            color: 'black',
                                        },
                                        '& .MuiOutlinedInput-root': { // Input field styling
                                            color: 'black',
                                            '& fieldset': {
                                                borderColor: 'blue',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'darkblue',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'blue',
                                            },
                                        }
                                    }}
                                />
                            )}
                        />
                    </FormControl>
                    {/* Flower Selections */}
                    {flowerSelections.map((selection, index) => (
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                            <Autocomplete
                                options={filteredFlowers}
                                getOptionLabel={(option) => `${option.name} - $${option.price}`}
                                onChange={handleFlowerChange(index)}
                                disabled={!selectedVendor}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Flower"
                                        placeholder="Type to search flowers"
                                        sx={{
                                            width: 300,
                                            '& .MuiInputLabel-root': { color: 'black' },
                                            '& .MuiOutlinedInput-root': {
                                                color: 'black',
                                                '& fieldset': { borderColor: 'blue' },
                                                '&:hover fieldset': { borderColor: 'darkblue' },
                                                '&.Mui-focused fieldset': { borderColor: 'blue' },
                                            },
                                        }}
                                    />
                                )}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        <img src={option.image} alt={option.name} style={{ width: '30px', marginRight: '10px' }} />
                                        {`${option.name} - $${option.price}`}
                                    </li>
                                )}
                            />
                            <TextField
                                label="Price"
                                value={selection.flower?.price ? selection.flower?.price * 15 : 0}
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{ width: '100px', ml: 2, '& .MuiOutlinedInput-root': { borderColor: 'blue' } }}
                            />
                        </Box>
                    ))}

                    <Button startIcon={<AddIcon />} onClick={handleAddFlower} sx={{ my: 2 }}>
                        Add More Flowers
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                        <Autocomplete
                            options={vases}
                            getOptionLabel={(option) => `${option.name} - $${option.price}`}
                            onChange={handleVaseChange}
                            disabled={!selectedVendor}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Vase"
                                    placeholder="Type to search vases"
                                    sx={{
                                        width: 300,
                                        '& .MuiInputLabel-root': { color: 'black' },
                                        '& .MuiOutlinedInput-root': {
                                            color: 'black',
                                            '& fieldset': { borderColor: 'blue' },
                                            '&:hover fieldset': { borderColor: 'darkblue' },
                                            '&.Mui-focused fieldset': { borderColor: 'blue' },
                                        },
                                    }}
                                />
                            )}
                            renderOption={(props, option) => (
                                <li {...props}>
                                    <img src={option.image} alt={option.name} style={{ width: '30px', marginRight: '10px' }} />
                                    {`${option.name} - $${option.price}`}
                                </li>
                            )}
                        />
                    </Box>

                    <Box sx={{ backgroundColor: '#f0f0f0', padding: 2, borderRadius: 1, boxShadow: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6">Product Total: ${calculateOrderTotal().toFixed(2)}</Typography>
                        <Typography variant="h6">Customization Charge: $2.00</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Order Total: ${(calculateOrderTotal() + 2).toFixed(2)}</Typography>
                    </Box>

                    <Button startIcon={<ShoppingCartIcon />} variant="contained" color="primary" onClick={handleAddToCart} sx={{ mt: 2 }}>Add to Cart</Button>
                    <Button startIcon={<MonetizationOnIcon />} variant="contained" color="secondary" onClick={handleBuyNow} sx={{ mt: 2 }}>
                        Buy Now
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleVisualizeClick} sx={{ mt: 2 }}>Visualize</Button>
                    <ProductVisualizationModal
                        open={showModal}
                        onClose={() => setShowModal(false)}
                        selectedProductsText={generateSelectedProductsText()}
                        onImageUrlChange={handleImageUrlChange} // Pass the function as a prop
                    />
                    <BuyNowModal
                        open={buyNowModalOpen}
                        onClose={() => setBuyNowModalOpen(false)}
                        productId={currentProductDetails.productId}
                        vendorId={currentProductDetails.vendorId}
                        userId={currentProductDetails.userId}
                    />


                </Box>
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
