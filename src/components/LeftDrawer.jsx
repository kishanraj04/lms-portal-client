import React from "react";
import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";

const LeftDrawer = ({ isMobile, onClose,setDrawerOpen }) => {
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
     onClick={()=>{if(isMobile){
        setDrawerOpen(!onClose)
     }}}>
      {isMobile && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            
          </IconButton>
        </Box>
      )}
      <List>
        {["Create Course", "Manage Courses"].map((text) => (
          <ListItem key={text} disablePadding>
            <Link
              to={`/dashboard/${text.replace(/\s+/g, "-").toLowerCase()}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                display: "block",
                padding: "12px 16px", // match MUI ListItem padding
              }}
            >
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LeftDrawer;
