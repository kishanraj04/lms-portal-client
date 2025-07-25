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
            <LeftDrawer
              isMobile={isMobile}
              onClose={handleDrawerToggle}
              setDrawerOpen={setDrawerOpen}
            />
          )}
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "#121212",
            position: "relative",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          {/* Toggle button for mobile */}
          {isMobile && !drawerOpen && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: "white",
                position: "absolute",
                top: 10,
                left: 16,
                zIndex: 1200,
                width: "auto", // ✅ prevent full width
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
              overflowX: "hidden",
              padding: theme.spacing(2),
              color: "white",
              minWidth: 0,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                width: 0,
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
