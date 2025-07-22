import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state?.user);

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: "Student",
    avatar: user?.avatar || "https://i.pravatar.cc/150?img=10",
  });

  const handleOpen = () => setOpen(true);
  
  const handleClose = () => {
    const formData = new FormData();
    formData.append("name", profile?.name);
    formData.append("email", profile?.email);
    formData.append("role", profile?.role);
    formData.append("avatar",profile?.avatar)
    setOpen(false);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...formData, avatar: file });
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5 }}>
      {/* Main Horizontal Box */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Stack direction="row" spacing={4} alignItems="center">
          {/* Left: Avatar */}
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              src={user?.avatar}
              sx={{ width: 120, height: 120, mb: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
              Profile Picture
            </Typography>
          </Box>

          {/* Right: Details */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Role: {user?.role}
            </Typography>

            <Box mt={2}>
              <Button variant="outlined" onClick={handleOpen}>
                Edit Profile
              </Button>
            </Box>
          </Box>
        </Stack>
      </Paper>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <Box textAlign="center">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                id="upload-avatar"
                style={{ display: "none" }}
              />
              <label htmlFor="upload-avatar">
                <Avatar
                  src={profile.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    cursor: "pointer",
                    mb: 1,
                  }}
                />
                <Typography variant="caption" color="primary">
                  Click to change avatar
                </Typography>
              </label>
            </Box>

            <TextField
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              select
              label="Role"
              name="role"
              value={profile.role}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Instructor">Instructor</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
