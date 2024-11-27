import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = ({ booking, setBooking }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    console.log('Booking confirmed:', booking);
    alert('Booking confirmed!');
  };

  const handleUpdate = () => {
    console.log('Navigating back to BookingPage for updating:', booking);
    navigate('/booking');
  };

  const handleDelete = () => {
    console.log('Deleting booking:', booking);
    setBooking(null);
    alert('Booking deleted!');
  };

  return (
    <Container
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a1f44',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        color: '#ffffff',
      }}
    >
      <Typography variant="h4" margin="normal" sx={{ fontWeight: 'bold', fontFamily: 'serif' }}>
        Confirm Your Booking
      </Typography>

      {booking ? (
        <>
          <Typography variant="h5" margin="normal" sx={{ fontFamily: 'serif' }}>
            Vehicle Type: {booking.vehicleType}, Brand: {booking.brand}
          </Typography>
          <Button variant="contained" color="primary" fullWidth onClick={handleConfirm} sx={{ mt: 2 }}>
            Confirm
          </Button>
          <Button variant="contained" color="primary" fullWidth onClick={handleUpdate} sx={{ mt: 2 }}>
            Update Booking
          </Button>
          <Button variant="contained" color="error" fullWidth onClick={handleDelete} sx={{ mt: 2 }}>
            Delete Booking
          </Button>
        </>
      ) : (
        <Typography variant="h6" margin="normal" color="error">
          No booking details available.
        </Typography>
      )}
    </Container>
  );
};

export default ConfirmationPage;
