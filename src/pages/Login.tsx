import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Link,
  Alert,
  Divider,
  Stack
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/github';
  };

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
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%',
            borderRadius: 2,
            background: 'rgba(19, 47, 76, 0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Typography component="h1" variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
            Welcome to Pieces
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.9)' }}>
            Sign in to join our community of developers
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={2} sx={{ mb: 3 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{ 
                py: 1.5,
                backgroundColor: '#4285F4',
                '&:hover': {
                  backgroundColor: '#3367D6',
                }
              }}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="contained"
              startIcon={<GitHubIcon />}
              onClick={handleGithubLogin}
              sx={{ 
                py: 1.5,
                backgroundColor: '#2f363d',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#444c56',
                }
              }}
            >
              Sign in with GitHub
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              OR
            </Typography>
          </Divider>

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                py: 1.5,
                background: 'linear-gradient(45deg, #00b4d8 30%, #90e0ef 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #0096c7 30%, #48cae4 90%)',
                }
              }}
            >
              Sign In
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Don't have an account?{' '}
              <Link component={RouterLink} to="/register" variant="body2" sx={{ color: 'primary.main' }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 