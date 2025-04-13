import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import logo3 from '../images/logo3.png';

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '800px',
              padding: '0 20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                ease: "easeOut"
              }}
              style={{
                marginBottom: '2rem',
                width: '100%',
                maxWidth: '400px',
              }}
            >
              <img 
                src={logo3} 
                alt="PIECES Logo" 
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  objectFit: 'contain'
                }} 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5,
                ease: "easeOut"
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: '#00b4d8',
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
                  textAlign: 'center',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  fontFamily: "'Roboto Mono', monospace",
                  textShadow: '0 2px 10px rgba(0, 180, 216, 0.3)',
                }}
              >
                Find Your Missing Piece
              </Typography>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SplashScreen; 