// AboutUsPage.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
  return (
    <Container
      sx={{
        mt: 5,
        p: 4,
        backgroundColor: 'rgba(34, 34, 34, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Typography variant="h4" align="center" sx={{ color: 'white', mb: 3 }}>
        About Us
      </Typography>
      <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
        Welcome to our Vehicle Rental Service! We are dedicated to providing you with the best vehicle rental experience possible.
      </Typography>
      <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
        Our mission is to offer high-quality vehicles at competitive prices, ensuring that you have a reliable ride for your journey.
      </Typography>
      <Typography variant="body1" sx={{ color: 'white', mb: 4 }}>
        Thank you for choosing us for your vehicle rental needs!
      </Typography>
      <Box textAlign="center">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">Go Back</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
