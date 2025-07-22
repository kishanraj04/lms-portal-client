import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LeftDrawer from "../components/LeftDrawer";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  // Auto set drawer open/close based on device size
  useEffect(() => {
    setDrawerOpen(!isMobile); // open by default on large, closed on mobile
  }, [isMobile]);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Layout Row */}
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left Drawer */}
        <Box
          sx={{
            width: drawerOpen ? 240 : 0,
            transition: "width 0.3s ease-in-out",
            overflow: "hidden",
            bgcolor: "#1a1a1a",
            height: "100%",
          }}
        >
          {(drawerOpen || !isMobile) && (
            <LeftDrawer isMobile={isMobile} onClose={handleDrawerToggle} />
          )}
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, bgcolor: "#121212", p: 2, overflowY: "auto" }}>
          <Toolbar />
         {isMobile && !drawerOpen && (
  <IconButton
    onClick={handleDrawerToggle}
    sx={{
      color: "white",
      position: "absolute",
      top:70 ,
      left: 16,
      zIndex: 1200,
    }}
  >
    <MenuIcon />
  </IconButton>
)}

          <Box sx={{ color: "white" }}>Dashboard content goes here.</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
