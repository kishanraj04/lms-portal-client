import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  TextField,
  Button,
  Stack,
  InputAdornment,
  Avatar,
  IconButton,
  useMediaQuery,
  Fade,
} from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        height: "97vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f3f4f6",
        overflow: "auto",
        // Hide scrollbar for all browsers
        "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari/Edge
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
      }}
    >
     
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 440,
            borderRadius: 3,
            p: isMobile ? 3 : 4,
            backgroundColor: "#fff",
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, val) => setTab(val)}
            variant="fullWidth"
            sx={{ mb: 2 }}
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

          {tab === 0 ? <LoginForm /> : <SignupForm />}
        </Paper>
      
    </Box>
  );
};

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = () => {
    console.log("Login data:", formData);
  };

  return (
    <Stack spacing={2}>
      <TextField
        name="email"
        label="Email"
        type="email"
        fullWidth
        value={formData.email}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        fullWidth
        value={formData.password}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 1 }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Stack>
  );
};

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
    }
  };

  const handleSignup = () => {
    console.log("Signup data:", formData);
  };

  return (
    <Stack spacing={2}>
      <Box display="flex" justifyContent="center">
        <label htmlFor="avatar-upload">
          <input
            accept="image/*"
            id="avatar-upload"
            type="file"
            hidden
            onChange={handleAvatarChange}
          />
          <IconButton component="span">
            <Avatar
              src={
                formData.avatar
                  ? URL.createObjectURL(formData.avatar)
                  : undefined
              }
              sx={{ width: 64, height: 64 }}
            />
          </IconButton>
        </label>
      </Box>
      <TextField
        name="name"
        label="Full Name"
        fullWidth
        value={formData.name}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        fullWidth
        value={formData.email}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        fullWidth
        value={formData.password}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 1 }}
        onClick={handleSignup}
      >
        Sign Up
      </Button>
    </Stack>
  );
};
