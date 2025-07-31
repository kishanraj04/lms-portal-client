import React from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; 
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VisibilityIcon from '@mui/icons-material/Visibility';

const LeftDrawer = ({ isMobile, onClose, setDrawerOpen }) => {
  const menuItems = [
    { text: "Create Course", icon: <AddCircleOutlineIcon />, color: "red" },
    { text: "Manage Courses", icon: <MenuBookIcon />, color: "blue" },
    {text:"Enrolled Student" , icon:<VisibilityIcon/>, color:"gray"}
  ];
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
      onClick={() => {
        if (isMobile) {
          setDrawerOpen(!onClose);
        }
      }}
    >
      {isMobile && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={onClose} sx={{ color: "white" }}></IconButton>
        </Box>
      )}
      <List>
        {menuItems.map(({ text, icon, color }) => (
          <ListItem key={text} disablePadding>
            <Link
              to={`/dashboard/${text.replace(/\s+/g, "-").toLowerCase()}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: `${color}` }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LeftDrawer;
