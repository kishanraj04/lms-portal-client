import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
  Slide,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LeftDrawer from '../components/LeftDrawer';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (value) => () => {
    setOpen(value);
  };

  return (
    <Box sx={{ display: 'flex', height: '60vh', color: '#fff' }}>
      
      {/* Drawer with animation */}
      {isMobile ? (
        <Slide direction="right" in={open} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: 'absolute',
              width: 240,
              height: '100%',
              bgcolor: '#1a1a1a',
              zIndex: 1300,
              boxShadow: 4,
            }}
          >
            <LeftDrawer toggleDrawer={toggleDrawer} isMobile={isMobile} />
          </Box>
        </Slide>
      ) : (
        <Box
          sx={{
            width: 240,
            height: '100%',
            bgcolor: '#1a1a1a',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <LeftDrawer isMobile={false} />
        </Box>
      )}

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />

        {/* Menu icon only on mobile and when drawer is closed */}
        {isMobile && !open && (
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{ color: 'white' }}
          >
            <MenuIcon sx={{color:"blue"}}/>
          </IconButton>
        )}
        
      </Box>
    </Box>
  );
};

export default Dashboard;
