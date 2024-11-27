import React from 'react';
import { Container, Typography } from '@mui/material';

const BookedStatusPage = ({ booking }) => {
  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a1f44', // Dark blue background
        color: '#ffffff', // White text color
        padding: '20px',
      }}
    >
      <Typography variant="h5" align="center" margin="normal" sx={{ fontWeight: 'bold', fontFamily: 'serif' }}>
        Booking Successful!
      </Typography>
      <Typography variant="body1" align="center" margin="normal" sx={{ fontFamily: 'serif' }}>
        {`Vehicle Type: ${booking.vehicleType}, Brand: ${booking.brand}`}
      </Typography>
    </Container>
  );
};

export default BookedStatusPage;
