import React from 'react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const LeftDrawer = ({ isMobile, onClose }) => {
  return (
    <Box
      sx={{
        width: 240,
        height: "100%",
        bgcolor: "#1a1a1a",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
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
    </Box>
  );
};

export default LeftDrawer;
