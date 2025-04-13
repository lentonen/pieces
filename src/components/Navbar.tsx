import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import BusinessIcon from '@mui/icons-material/Business';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FolderIcon from '@mui/icons-material/Folder';
import EventIcon from '@mui/icons-material/Event';
import ForumIcon from '@mui/icons-material/Forum';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { Lightbulb as LightbulbIcon } from '@mui/icons-material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import logo3 from '../images/logo3.png';

const pages = [
  { name: 'Projects', path: '/projects', icon: <CodeIcon /> },
  { name: 'Events', path: '/events', icon: <EventIcon /> },
  { name: 'Business Portal', path: '/business', icon: <BusinessIcon /> },
  { name: 'Hackathons', path: '/hackathons', icon: <RocketLaunchIcon /> },
  { name: 'Forum', path: '/forum', icon: <ForumIcon /> },
  { name: 'Philosophy', path: '/philosophy', icon: <LightbulbIcon /> },
  { name: 'Profile', path: '/profile', icon: <PersonIcon /> },
];

const Navbar = () => {
  return (
    <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(90deg, #0a1929 0%, #132f4c 100%)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Box 
            component={RouterLink} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none',
              flexGrow: 1,
              mr: 4,
            }}
          >
            <img 
              src={logo3} 
              alt="Pieces Logo" 
              style={{ 
                height: 40,
                marginRight: 8
              }} 
            />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: '#00b4d8',
                letterSpacing: '0.5px',
                textShadow: '0 0 10px rgba(0, 180, 216, 0.5)',
                position: 'relative',
                zIndex: 1,
                display: 'block'
              }}
            >
              PIECES
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                startIcon={page.icon}
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  height: '40px',
                  minHeight: '40px',
                  padding: '0 16px'
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 