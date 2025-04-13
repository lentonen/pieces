import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Container, Typography, Box } from '@mui/material';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Store the token in localStorage
      localStorage.setItem('token', token);
      // Redirect to home page
      navigate('/');
    } else {
      // If no token, redirect to login
      navigate('/login');
    }
  }, [navigate, location]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
        <Typography component="h1" variant="h6" sx={{ mt: 2 }}>
          Kirjaudutaan sisään...
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthCallback; 