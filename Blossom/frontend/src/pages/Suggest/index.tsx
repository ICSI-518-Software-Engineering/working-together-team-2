
import  { useState, useEffect } from 'react';
import ProductModal from '../Catalog/ProductModal';
import header from '../../assets/header.png';
import {
    Typography, Autocomplete, Select, MenuItem, TextField, Box, FormControl, InputLabel,
    Grid, Button
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


const occasionTags: Record<Occasion, string[]> = {
    "Mother's Day": ["roses", "peonies", "orchids", "lilies", "glass vase", "porcelain vase", "hydrangeas", "chrysanthemums", "baby's breath", "lavender"],
    "Valentine's Day": ["red roses", "pink tulips", "carnations", "lilies", "heart-shaped arrangement", "crystal vase", "white roses", "baby's breath", "peonies", "calla lilies"],
    "Christmas": ["poinsettias", "holly", "ivy", "fir branches", "red berries", "pinecones", "festive ribbon", "silver vase", "white lilies", "spruce"],
    "Birthday": ["daisies", "sunflowers", "colorful roses", "balloons", "mixed floral arrangement", "bright vase", "gerberas", "tulips", "snapdragons", "confetti"],
    "Wedding": ["white roses", "peonies", "lilies", "orchids", "elegant ribbon", "silk flowers", "satin vase", "gardenias", "hydrangeas", "baby's breath"],
    "Anniversary": ["roses", "orchids", "luxury arrangement", "mixed bouquets", "champagne vase", "peonies", "lilies", "red tulips", "ivory vase", "silk flowers"],
    "Graduation": ["tulips", "bright gerberas", "roses", "sunflowers", "celebratory ribbon", "modern vase", "daisies", "congratulatory card", "balloons", "snapdragons"],
    "New Year": ["white lilies", "sparkler features", "silver roses", "black vase", "new beginnings mix", "champagne glasses", "gold ribbon", "orchids", "party decor", "festive garland"],
    "Easter": ["easter lilies", "tulips", "pastel roses", "spring mix", "bunny decorations", "wicker basket", "hyacinths", "daffodils", "ribbon", "nest features"],
    "Thanksgiving": ["fall leaves", "chrysanthemums", "pumpkins", "cornucopia arrangement", "berry sprigs", "rustic vase", "autumn-hued ribbons", "sunflowers", "cattails", "harvest mix"]
};

// Tags for relationships focusing more on the bouquet composition
const relationshipTags: Record<Relationship, string[]> = {
    "Mother": ["roses", "tulips", "carnations", "orchids", "peonies", "elegant vase", "nurturing mix", "hydrangeas", "soft colors", "porcelain vase"],
    "Partner": ["romantic roses", "luxury bouquet", "lilies", "peonies", "passion arrangement", "heart-shaped vase", "red tulips", "crystal vase", "love blooms", "exotic mix"],
    "Friend": ["bright daisies", "sunflowers", "cheerful mix", "casual vase", "friendship blooms", "gerberas", "fun vase", "colorful snapdragons", "tulips", "lively roses"],
    "Colleague": ["professional orchids", "minimalist roses", "elegant lilies", "office suitable mix", "modern vase", "subtle colors", "sophisticated arrangement", "greenery", "neutral tones", "sleek design"],
    "Family": ["family mix", "varied roses", "sunflowers", "lilies", "comfort arrangement", "home vase", "warm colors", "hydrangeas", "family gathering blooms", "festive mix"]
};

// Define specific types for occasions and relationships
type Occasion = "Mother's Day" | "Valentine's Day" | "Christmas" | "Birthday" | "Wedding" | "Anniversary" | "Graduation" | "New Year" | "Easter" | "Thanksgiving";
type Relationship = "Mother" | "Partner" | "Friend" | "Colleague" | "Family";



function recommendProducts(occasion: Occasion | null, relationship: Relationship | null, products: Product[] | null): Product[] | null {
    if (occasion && relationship && products) {
        const productsScores = products.map(product => {
            let score = 0;
            const tags = [...occasionTags[occasion], ...relationshipTags[relationship]];
            tags.forEach(tag => {
                if (product.tags.includes(tag)) score += 10;
                if (product.description.toLowerCase().includes(tag.toLowerCase())) score += 5;
            });
            return { ...product, score };
        });

        // Sort by score and return the top matching products
        return productsScores.filter(p => p.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
    }
    return products;

}


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
    tags: string[];

}

interface IOccasionOption {
    label: string;
    value: Occasion;
}

interface IRelationshipOption {
    label: string;
    value: Relationship;
}

const SuggestPage = () => {
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [showProducts, setShowProducts] = useState<boolean>(false);

    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    // Filter products based on price


    // Function to handle opening modal
    const handleOpenModal = (product: Product, vendor: Vendor) => {
        console.log(product.id);

        setSelectedVendor(vendor);
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null);
    const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null);
    const handleSuggestion = () => {
        const recommendedProducts = recommendProducts(selectedOccasion, selectedRelationship, products);
        // Ensure that only Product[] is passed to setFilteredProducts, never null
        setFilteredProducts(recommendedProducts || []);
        setShowProducts(true);

        setShowProducts(true);
    }

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
        vendorId;
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
                    tags: data.tags
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
    const occasionOptions: IOccasionOption[] = Object.keys(occasionTags).map((occasion) => ({
        label: occasion,
        value: occasion as Occasion,
    }));

    const relationshipOptions: IRelationshipOption[] = Object.keys(relationshipTags).map((relationship) => ({
        label: relationship,
        value: relationship as Relationship,
    }));



    return (
        <>
            <div style={{ display: 'flex', backgroundColor: 'white', minHeight: '100vh' }}>
                {/* Main Content */}
                <div style={{ flex: 1, padding: '20px', marginRight: '150px', marginLeft: '150px' }}>
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
                                style={{ width: 300, backgroundColor: 'coral', borderRadius: '4px' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Search for a vendor"
                                        variant="outlined"
                                    />
                                )}
                                value={selectedVendor}
                                onChange={(event: any, newVendor: Vendor | null) => {
                                    event;
                                    setSelectedVendor(newVendor);

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
                    <>
                        {selectedVendor && (
                            <Box style={{
                                display: 'flex',
                                justifyContent: 'center', // Center horizontally
                                alignItems: 'center', // Center vertically
                                backgroundColor: 'white', // Keep overall background white
                                padding: '20px', // Add padding as needed
                                width: '100%' // Full width to center within
                            }}>
                                {/* Heading and Dropdown for selecting occasion */}
                                <Box style={{ margin: '0 20px' }}>  {/* Container for each dropdown and its label */}
                                    <Typography variant="subtitle1" style={{ color: '#333', fontWeight: 'bold', marginBottom: '0.5em' }}>
                                        Select Occasion
                                    </Typography>
                                    <FormControl style={{
                                        backgroundColor: 'coral', // Coral background for the dropdown
                                        borderRadius: '4px', // Rounded corners
                                        minWidth: 200, // Minimum width
                                        width: '100%' // Use full width of the container
                                    }}>
                                        <InputLabel></InputLabel>
                                        <Select
                                            value={selectedOccasion}
                                            onChange={(event) => setSelectedOccasion(event.target.value as Occasion)}
                                        >
                                            {occasionOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                                {/* Heading and Dropdown for selecting relationship */}
                                <Box style={{ margin: '0 20px' }}>  {/* Container for each dropdown and its label */}
                                    <Typography variant="subtitle1" style={{ color: '#333', fontWeight: 'bold', marginBottom: '0.5em' }}>
                                        Select Recipient's Relationship
                                    </Typography>
                                    <FormControl style={{
                                        backgroundColor: 'coral', // Coral background for the dropdown
                                        borderRadius: '4px', // Rounded corners
                                        minWidth: 200, // Minimum width
                                        width: '100%' // Use full width of the container
                                    }}>
                                        <InputLabel></InputLabel>
                                        <Select
                                            value={selectedRelationship}
                                            onChange={(event) => setSelectedRelationship(event.target.value as Relationship)}
                                        >
                                            {relationshipOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        )}

                        {/* Other JSX code */}
                    </>
                    <Box style={{ margin: '20px', textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!selectedOccasion && !selectedRelationship}
                            onClick={handleSuggestion}
                        >
                            Get Suggestions
                        </Button>
                    </Box>
                    {showProducts && selectedVendor && (
                        <Grid container spacing={2} justifyContent="center" style={{ marginTop: theme.spacing(2) }}>
                            {filteredProducts
                                .sort((a, b) => b.rating - a.rating) // Sort products by rating in descending order
                                .map((product, index) => (
                                    <Grid item
                                        xs={12}
                                        sm={filteredProducts.length === 1 ? 12 : (filteredProducts.length === 2 ? 6 : 4)}
                                        md={filteredProducts.length === 1 ? 12 : (filteredProducts.length === 2 ? 6 : 4)}
                                        lg={filteredProducts.length === 1 ? 12 : (filteredProducts.length === 2 ? 6 : 4)}
                                        key={index}
                                        onClick={() => handleOpenModal(product, selectedVendor)}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center'  // Ensures the content within the grid item is centered
                                        }}
                                    >
                                        <Box textAlign="center" p={2} boxShadow={2} borderRadius={2} position="relative" style={{ maxWidth: '300px', width: '100%' }}>
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

export default SuggestPage;