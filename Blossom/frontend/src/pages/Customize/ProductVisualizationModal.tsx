import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

interface ProductVisualizationModalProps {
    open: boolean;
    onClose: () => void;
    selectedProductsText: string;
}

// Add theme to the styled component
const ModalContent = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    boxShadow: '0px 4px 6px rgba(50, 50, 93, 0.11), 0px 1px 3px rgba(0, 0, 0, 0.08)',
    padding: '32px',
    maxWidth: '80%',
    maxHeight: '80%',
    overflow: 'auto',
    textAlign: 'center',
    outline: 'none',
    borderRadius: '8px',
});

const LoadingContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const Image = styled('img')({
    maxWidth: '100%',
    maxHeight: '70vh',
    borderRadius: '8px',
});

const ProductVisualizationModal: React.FC<ProductVisualizationModalProps> = ({ open, onClose, selectedProductsText }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const generateImage = async () => {
            setLoading(true);
            try {
                // Perform API call to generate the image based on selected products
                // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
                const response = await fetch('https://api.openai.com/v1/images/generations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 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',
                    },
                    body: JSON.stringify({
                        model: "dall-e-2",
                        prompt: selectedProductsText,
                        n: 1,
                        size: "1024x1024"
                    }),
                });
                const data = await response.json();
                setImageUrl(data.data[0].url); // Access the url from the response correctly
            } catch (error) {
                console.error('Error generating image:', error);
                setImageUrl(null);
            } finally {
                setLoading(false);
            }
        };

        if (open && selectedProductsText) {
            generateImage();
        }
    }, [open, selectedProductsText]);

    return (
        <Modal open={open} onClose={onClose}>
            <ModalContent>
                {loading ? (
                    <LoadingContainer>
                        <CircularProgress />
                    </LoadingContainer>
                ) : imageUrl ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Your product will look like this:
                        </Typography>
                        <Image src={imageUrl} alt="Product Visualization" />
                    </>
                ) : (
                    <Typography variant="body1">Failed to generate product visualization.</Typography>
                )}
            </ModalContent>
        </Modal>
    );
};
export default ProductVisualizationModal;
