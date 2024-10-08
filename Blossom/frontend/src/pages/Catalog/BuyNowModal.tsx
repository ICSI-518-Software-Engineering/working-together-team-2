import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { buyNow } from '../../api/cartServices';
import { CssBaseline, useMediaQuery } from '@mui/material';



interface CustomerDetails {
    address: string;
    city: string;
    state: string;
    zip: string;
    deliveryDate: string; // Using Dayjs type for the deliveryDate
}



// Define the custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        background: {
            default: '#f4f5fd'
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        button: {
            textTransform: 'none'  // Disable uppercase text for buttons
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: '8px',
                    fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: '#334ac0',
                        color: '#fff',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': {
                        color: '#556cd6',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#556cd6',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#dedede',
                        },
                        '&:hover fieldset': {
                            borderColor: '#556cd6',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#556cd6',
                        },
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: '15px',
                    padding: '20px',
                    backgroundColor: '#ffffff',  // Sets the background color of the dialog
                }
            }
        },
    },
});
interface BuyNowModalProps {
    open: boolean;
    onClose: () => void;
    productId: string;
    vendorId: string;
    userId: string;
}


const BuyNowModal: React.FC<BuyNowModalProps> = ({ open, onClose, productId, vendorId, userId }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const appliedTheme = React.useMemo(() => createTheme(prefersDarkMode ? theme : theme), [prefersDarkMode]);
    const [details, setDetails] = useState<CustomerDetails>({
        address: '',
        city: '',
        state: '',
        zip: '',
        deliveryDate: new Date().toISOString().slice(0, 10), // Initialize with today's date using Dayjs
    });
    // Setting today's date as default
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDetails({ ...details, [event.target.name]: event.target.value });
    };


    const handleConfirm = async () => {
        if (userId && details.deliveryDate) {
            const deliveryDateAsDate = details.deliveryDate; // Convert Dayjs to Date
            const dateMillis: number = Date.parse(deliveryDateAsDate);
            const dateObject: Date = new Date(dateMillis);
            const detailsWithDate = { ...details, deliveryDate: dateObject };
            try {
                await buyNow(userId, productId, vendorId, detailsWithDate);
                alert('Order placed successfully!');
                onClose();
            } catch (error) {
                console.error('Failed to place order:', error);
                alert('Failed to place order.');
            }
        } else {
            alert('User ID is not available or delivery date is not set. Please log in and pick a delivery date.');
        }
    };

    return (
        <ThemeProvider theme={appliedTheme}>
            <CssBaseline />  {/* Apply baseline CSS to normalize styles */}
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>Enter Shipping Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="address"
                        label="Address"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={details.address}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        label="City"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={details.city}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="state"
                        label="State"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={details.state}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="zip"
                        label="ZIP Code"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={details.zip}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="deliveryDate"
                        label="Delivery Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: formatDate(tomorrow) // Set the minimum date to tomorrow
                        }}
                        value={details.deliveryDate}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Cancel</Button>
                    <Button onClick={handleConfirm} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

export default BuyNowModal;
