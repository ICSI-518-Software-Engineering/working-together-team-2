import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import backgroundImage from '../../assets/pexels-amar-preciado-13045649.jpg';
import leftImage from '../../assets/pexels-nur-yilmaz-7784602.jpg';
import customizeImage from '../../assets/customize.jpg';
import ig from '../../assets/ig.png';
import wa from '../../assets/wa.png';
import fb from '../../assets/fb.png';
import { Link } from 'react-router-dom';

interface StorePageProps { }

const StorePage: React.FC<StorePageProps> = () => {

    const handleShopNowClick = () => {
        // Redirect logic here
        console.log('Redirecting to shop...');
    };

    const handlePlanEventClick = () => {
        // Redirect logic for planning event
        console.log('Redirecting to plan event...');
    };

    const handleSuggestClick = () => {
        // Redirect logic for suggesting bouquet
        console.log('Redirecting to suggest bouquet...');
    };

    const handleCustomizeClick = () => {
        // Redirect logic for suggesting bouquet
        console.log('Redirecting to suggest bouquet...');
    };

    return (
        <Box>
            <Box textAlign="center" p={2}
                style={{
                    position: 'relative',
                    marginTop: '0px',
                    height: '650px', /* Increased height */
                    backgroundColor: 'rgba(250, 250, 250, 0.5)',
                    // backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <Box color="white" fontSize={24} fontWeight="bold" mb={2}>
                    "Shop the latest trends with Blossom Ecommerce"
                </Box>
                <Box color="white" fontSize={24} fontWeight="bold" mb={2}>
                    Our Favorite Products
                </Box>
                <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>

                </Box>
                <Link to="/customer/catalog">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleShopNowClick}
                        sx={{ mt: 4 }}
                    >
                        Shop Now
                    </Button>
                </Link>
            </Box>
            <div style={{
                position: 'relative',
                marginTop: '0px',
                height: '700px', /* Increased height */
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: '40px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    color: 'white', /* Text color black */
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', /* Box shadow for depth */
                }}>
                    <h2 style={{ marginBottom: '20px', fontSize: '36px', fontWeight: 'bold' }}>Planning an Event?</h2>
                    <p style={{ fontSize: '18px', lineHeight: '1.5' }}>From birthdays to weddings, we've got you covered. Let's make your event unforgettable. Get in touch today!</p>
                    <Link to="/catalog">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePlanEventClick}
                            sx={{ mt: 4, fontSize: '16px', padding: '8px 20px' }} // Adjusted button size

                        >
                            Plan an Event
                        </Button>
                    </Link>
                </div>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Align content to center horizontally
                marginTop: '0px',
                padding: '0px',
                height: '650px',
                backgroundColor: '#e7feff',
                borderRadius: '0px',
                width: '100%', // Set width to 100% to fit the screen
            }}>
                <div style={{
                    flex: 1,
                    marginRight: '20px', // Margin on the right side for spacing
                    textAlign: 'center', // Align text to center horizontally
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with less opacity
                    padding: '20px',
                    borderRadius: '10px',
                }}>
                    <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Customization of Products</h2>
                    <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', lineHeight: '1.5', color: 'white' }}>
                        Personalize your products to make them uniquely yours. Whether it's engraving a message on jewelry or adding a custom design to clothing, we'll help you create something special. Let us turn your ideas into reality.
                    </p>
                    <Link to="/customer/customize">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCustomizeClick}
                            sx={{ mt: 2 }}
                        >
                            Customize
                        </Button>
                    </Link>
                </div>
                <img src={customizeImage} alt="Left Image" style={{ width: '40%', height: '650px', borderRadius: '0px' }} />
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Align content to center horizontally
                marginTop: '0px',
                padding: '0px',
                height: '650px',
                backgroundColor: '#faf0e6 ',
                borderRadius: '0px',
                width: '100%', // Set width to 100% to fit the screen
            }}>
                <img src={leftImage} alt="Left Image" style={{ width: '40%', height: '650px', borderRadius: '0px' }} />
                <div style={{
                    flex: 1,
                    marginLeft: '20px',
                    textAlign: 'center', // Align text to center horizontally
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with less opacity
                    padding: '20px',
                    borderRadius: '10px',
                }}>
                    <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Suggesting a Bouquet for Your Loved Ones?</h2>
                    <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', lineHeight: '1.5', color: 'white' }}>
                        Let us help you find the perfect bouquet for any occasion. Our expert florists will craft stunning arrangements to express your love and affection. Make your moments more memorable with our exquisite floral creations.
                    </p>
                    <Link to="/catalog">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSuggestClick}
                            sx={{ mt: 2 }}
                        >
                            Suggest Now
                        </Button>
                    </Link>
                </div>
            </div>
            <div style={{
                backgroundColor: '#333',
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

        </Box>
    );
};

export default StorePage;
