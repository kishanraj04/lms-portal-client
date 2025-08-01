import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { logoutUserHelper } from "../helper/auth";
import {
  useGetProfileQuery,
  useLazyLogoutUserQuery,
} from "../store/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
const settingsWithIcons = [
  { name: "Home", icon: <Home fontSize="small" /> },
  { name: "Profile", icon: <AccountCircleIcon fontSize="small" /> },
  { name: "Learning", icon: <SchoolIcon fontSize="small" /> },
  { name: "DashBoard", icon: <DashboardIcon fontSize="small" /> },
  { name: "Logout", icon: <LogoutIcon fontSize="small" /> },
];

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const [logoutUser] = useLazyLogoutUserQuery();
  const dispatch = useDispatch();
  const { data: user } = useGetProfileQuery(undefined,{refetchOnMountOrArgChange:true});
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (name) => {
    setAnchorElUser(null);
    if (name === "Profile") navigate("/profile");
    else if (name === "DashBoard") navigate("/dashboard");
    else if (name === "Learning") navigate("/learning");
    else if (name === "Logout") logoutUserHelper(logoutUser);
    else if (name === "Home") navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a237e" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          {/* Center space filler */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Avatar & menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src={user?.user?.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {settingsWithIcons.map(({ name, icon }) => {
                if (name === "DashBoard" && user?.user?.role !== "Instructor")
                  return null;
                return (
                  <MenuItem
                    key={name}
                    onClick={() => handleCloseUserMenu(name)}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <Typography>{name}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
