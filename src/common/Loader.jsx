import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const Loader = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
      }}
    >
      <CircularProgress
        thickness={5}
        size={80}
        sx={{
          color: 'primary.main',
          animation: 'glow 1.5s infinite ease-in-out',
        }}
      />
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          color: 'text.primary',
          fontWeight: 500,
          animation: 'fadeIn 2s infinite alternate',
        }}
      >
        Loading, please wait...
      </Typography>

      {/* Keyframes */}
      <style>
        {`
          @keyframes glow {
            0% { box-shadow: 0 0 0px #1976d2; }
            50% { box-shadow: 0 0 20px #1976d2; }
            100% { box-shadow: 0 0 0px #1976d2; }
          }

          @keyframes fadeIn {
            from { opacity: 0.3; }
            to { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

