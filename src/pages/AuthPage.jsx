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
  Fade,
} from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import {toast} from 'react-toastify'
import { useLoginUserMutation, useRegisterUserMutation } from "../store/api/userApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const AuthPage = () => {
  console.log("rungin auth");
  const {isAuthenticated} = useSelector((state)=>state?.user)
  const navigate = useNavigate()
  // useEffect(()=>{
  //   if(true) navigate("/")
  // },[])
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
  // const {isAuthenticated} = useSelector((state)=>state.user) 
  const navigate = useNavigate()
  // if(isAuthenticated) navigate("/")
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginApi,loginResp] = useLoginUserMutation()
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async() => {
    if(!formData?.password || !formData?.email){
     return toast.warn("all fields are required")
    }
    const resp = await loginApi(formData)
    if(resp?.data?.success){
      navigate("/")
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
        required={true}
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
  const [registerApi,registerResp] = useRegisterUserMutation()
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
  
  const handleSignup = async() => {
    if(!formData?.name || !formData?.email || !formData?.password){
      return toast.warn("all fields are required")
    }

    const resp = await registerApi(formData)
    if(resp?.data?.success){
      toast.success("register success")
      setFormData({
    name: "",
    email: "",
    password: "",
    avatar: null,
  })
    }else{
      toast.error("register failed")
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
        required="true"
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
        required="true"
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
        required="true"
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
        required="true"
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
