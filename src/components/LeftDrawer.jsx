import React from 'react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const LeftDrawer = ({ toggleDrawer, isMobile }) => {
  return (
    <>
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}

      <List>
        {['Home', 'Courses', 'Profile'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default LeftDrawer;
