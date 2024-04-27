import { useState,ChangeEvent } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import header from '../../assets/header.png';
import ig from '../../assets/ig.png';
import wa from '../../assets/wa.png';
import fb from '../../assets/fb.png';
import im1 from '../../assets/70f9762672f76c8ab8ce4206e054e311.jpg';
import im2 from '../../assets/event-decor-5.jpg';
import im3 from '../../assets/f2v-table-people-placing-nametags-1200x797.jpg';
import im4 from '../../assets/EVENT-FLOWERS-7.png';
import im5 from '../../assets/837cadc88c3ac7e0f34712c99e015869.jpg'

const PlanPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [formData, setFormData] = useState({ name: '', address: '', eventName: '', email:'' });
    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        try {
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            // Handle success - maybe clear form or show a success message
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const images = [
        { id: 1, url: im1 },
        { id: 2, url: im2 },
        { id: 3, url: im3 },
        { id: 4, url: im4 },
        { id: 5, url: im5 }
    ];

    const nextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    // Form CSS Styles
    const formStyle = {
        width: '60%',
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white', // White background
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        border: '1px solid #ccc' // Subtle border
    };
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', minHeight: '100vh' }}>
                {/* Header with Image and Select Vendor Option */}
                <Box style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#00b7eb', padding: '20px', borderRadius: '8px', height: '120px', width: '100%' }}>
                    <Box style={{ zIndex: 2, textAlign: 'center' }}>
                        <Typography variant="h4" style={{ color: '#333', fontWeight: 'bold', marginBottom: '0.5em' }}>
                            Plan Your Event With Blossom
                        </Typography>
                    </Box>
                    <Box style={{ position: 'absolute', top: '20px', left: '20px' }}>
                        <img
                            src={header}
                            alt="Header Background Left"
                            style={{ height: '80px', borderRadius: '8px' }}
                        />
                    </Box>
                    <Box style={{ position: 'absolute', top: '20px', right: '20px' }}>
                        <img
                            src={header}
                            alt="Header Background Right"
                            style={{ height: '80px', borderRadius: '8px' }}
                        />
                    </Box>
                </Box>

                // Image Viewer
                <div style={{ marginTop: '20px', position: 'relative' }}>
                    <Box style={{ width: '800px', height: '450px', background: 'white', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                        <img
                            src={images[currentImageIndex].url}
                            alt={`Image ${currentImageIndex + 1}`}
                            style={{ width: '100%', height: 'auto' }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '0',
                            right: '0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Button variant="contained" color="primary" onClick={prevImage}>
                                Previous
                            </Button>
                            <Button variant="contained" color="primary" onClick={toggleFormVisibility} style={{ margin: '0 20px' }}>
                                Plan
                            </Button>
                            <Button variant="contained" color="primary" onClick={nextImage}>
                                Next
                            </Button>
                        </div>
                    </Box>
                </div>

                {/* Event Form */}
                {showForm && (
                    <form onSubmit={handleSubmit} style={formStyle}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            style={{ backgroundColor: '#00b7eb' }}
                        />
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            style={{ backgroundColor: '#00b7eb' }}
                        />
                        <TextField
                            label="Email "
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={{ backgroundColor: '#00b7eb' }}
                        />
                         <TextField
                            label="Event Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="eventName"
                            value={formData.eventName}
                            onChange={handleInputChange}
                            style={{ backgroundColor: '#00b7eb' }}
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', width: '50%' }}>
                            Submit
                        </Button>
                    </form>
                )}
            </div>

            {/* Footer */}
            <div style={{
                backgroundColor: '#002e63',
                color: 'white',
                padding: '20px',
                textAlign: 'center',
                width: '100%'
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

export default PlanPage;
