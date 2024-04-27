import { useState, ChangeEvent, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import header from '../../assets/header.png';
import ig from '../../assets/ig.png';
import wa from '../../assets/wa.png';
import fb from '../../assets/fb.png';
import im1 from '../../assets/70f9762672f76c8ab8ce4206e054e311.jpg';
import im2 from '../../assets/event-decor-5.jpg';
import im3 from '../../assets/f2v-table-people-placing-nametags-1200x797.jpg';
import im4 from '../../assets/EVENT-FLOWERS-7.png';
import im5 from '../../assets/837cadc88c3ac7e0f34712c99e015869.jpg';

const PlanPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const formatDate = (date: Date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    };

    // Setting today's date as default
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [formData, setFormData] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        eventName: '',
        eventDate: new Date().toISOString().slice(0, 10), // ISO string format and slice for YYYY-MM-DD
        eventDescription: '',
        email: '',
        imageUrl: im1
    });
    const [showForm, setShowForm] = useState(false);
    // Ensure the image URL in formData is updated when the image changes
    useEffect(() => {
        // Update the imageUrl in formData whenever currentImageIndex changes
        setFormData(prev => ({ ...prev, imageUrl: images[currentImageIndex].url }));
    }, [currentImageIndex]);

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
            const response = await fetch('http://localhost:8086/api/email/', {
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
              
            // Show a success message
            alert('Form submitted successfully!');
            
            // Reload the site
            window.location.reload();
            
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
        backgroundColor: '#008080', // White background
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        border: '1px solid #ccc' // Subtle border
    };

    const textFieldStyle = {
        marginBottom: 2,  // margin-bottom using spacing unit
        '& .MuiOutlinedInput-root': { // targeting the text field's outline
            '& fieldset': {
                borderColor: 'grey',  // more visible border color
            },
            '&.Mui-focused fieldset': {
                borderColor: 'blue',  // focused state
            }
        },
        '& .MuiInputBase-input': {
            color: 'white' // making text more visible against light backgrounds
        }
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

                {/* Image Viewer */}
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
                    <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
                        <Grid container spacing={2} padding={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                    sx={textFieldStyle}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Street"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                    sx={textFieldStyle}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                    sx={textFieldStyle}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                    sx={textFieldStyle}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Zip Code"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                    sx={textFieldStyle}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                    sx={textFieldStyle}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                    sx={textFieldStyle}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Event Name"
                                    name="eventName"
                                    value={formData.eventName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                    sx={textFieldStyle}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Event Date"
                                    name="eventDate"
                                    value={formData.eventDate}
                                    onChange={handleInputChange}
                                    fullWidth
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: formatDate(tomorrow) // Set the minimum date to tomorrow
                                    }}
                                    variant="outlined"
                                    sx={textFieldStyle}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Event Description"
                                    name="eventDescription"
                                    value={formData.eventDescription}
                                    onChange={handleInputChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    sx={textFieldStyle}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
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
