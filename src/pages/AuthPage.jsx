import React, { useEffect, useState } from "react";
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
  Typography,
  CircularProgress,
} from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import {
  useDirectLoginQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../store/api/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import Loader from "../components/Loader";
import axios from 'axios'
// Loader Component
// const Loader = () => (
//   <Box
//     sx={{
//       height: "100vh",
//       width: "100vw",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#f3f4f6",
//     }}
//   >
//     <CircularProgress color="primary" />
//   </Box>
// );

// AuthPage
export const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDirectLogin,setIsDirectLogin] = useState(false)
  // Auto-login if session is valid
  useEffect(() => {

    (async()=>{
     try {
      setIsDirectLogin(true)
       const resp = await axios.get("http://localhost:3000/api/v1/user/directlogin",{
        withCredentials:"include"
      })
       if (resp?.data?.success) {
      dispatch(setUser(resp?.data.user));
      navigate("/");
      setIsDirectLogin(false)
    }
     } catch (error) {
       toast.error("somethig went wrong")
     }
    })()
   
  }, []);
  // if (isLoading) return <Loader/>;

  return (
    <Box
      sx={{
        height: "97vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f3f4f6",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 440,
          borderRadius: 3,
          p: isMobile ? 3 : 4,
          backgroundColor: "white",
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

// LoginForm
const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginApi,loginResp] = useLoginUserMutation();
  const navigate = useNavigate();



  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      return toast.warn("All fields are required");
    }

    const res = await loginApi(formData);
    if (res?.data?.success) {
      toast.success("Login successful");
      navigate("/");
    } else {
      toast.error(res?.error?.data?.message || "Login failed");
    }
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
      <Button variant="contained" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Stack>
  );
};

// SignupForm
const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [registerApi] = useRegisterUserMutation();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
    }
  };

  const handleSignup = async () => {
    const { name, email, password,avatar} = formData;
    if (!name || !email || !password || !avatar) {
      return toast.warn("All fields are required");
    }
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }

    const res = await registerApi(formDataToSend);
    if (res?.data?.success) {
      toast.success("Registration successful");
      // setFormData({ name: "", email: "", password: "", avatar: null });
    } else {
      toast.error(res?.error?.data?.message || "Registration failed");
    }
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
      <Button variant="contained" fullWidth onClick={handleSignup}>
        Sign Up
      </Button>
    </Stack>
  );
};
