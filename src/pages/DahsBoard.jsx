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
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: drawerOpen ? 240 : 0,
            transition: "width 0.3s ease-in-out",
            bgcolor: "#1a1a1a",
            height: "100%",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          {(drawerOpen || !isMobile) && (
            <LeftDrawer isMobile={isMobile} onClose={handleDrawerToggle} />
          )}
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "#121212",
            position: "relative",
            overflow: "hidden",
            minWidth: 0, // prevents overflow due to children
          }}
        >
          {/* Toggle button for mobile */}
          {isMobile && !drawerOpen && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: "white",
                position: "absolute",
                top: 16,
                left: 16,
                zIndex: 1200,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Scrollable content */}
          <Box
            sx={{
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden", // ✅ prevent horizontal scroll
              padding: theme.spacing(2),
              color: "white",
              minWidth: 0,

              // Hide scrollbars
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE 10+
              "&::-webkit-scrollbar": {
                width: "0px",
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
