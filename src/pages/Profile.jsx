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
import {
  useGetProfileQuery,
  useUpdateUserProfileMutation,
} from "../store/api/userApi";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state?.user);
  const [updateUserApi] = useUpdateUserProfileMutation();
  const { data, isLoading: isProfileLoading } = useGetProfileQuery();
  console.log(data,isProfileLoading);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    role: user?.role || "Student",
    avatar: user?.avatar || "",
  });

  // Open dialog
  const handleOpen = () => setOpen(true);

  // Close and submit
  const handleClose = async () => {
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("role", profile.role);

    if (profile.avatar && typeof profile.avatar !== "string") {
      formData.append("avatar", profile.avatar);
    } else {
      formData.append("avatar", user?.avatar);
    }

    try {
      await updateUserApi(formData).unwrap();
    } catch (err) {
      console.error("Update failed:", err);
    }

    setOpen(false);
  };

  // Handle text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({ ...prev, avatar: file }));
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Stack direction="row" spacing={4} alignItems="center">
          {/* Left Box: Avatar */}
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              src={user?.avatar}
              sx={{ width: 120, height: 120, mb: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
              Profile Picture
            </Typography>
          </Box>

          {/* Right Box: Info */}
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

      {/* Dialog for editing */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            {/* Avatar Upload */}
            <Box textAlign="center">
              <input
                type="file"
                accept="image/*"
                id="upload-avatar"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
              <label htmlFor="upload-avatar">
                <Avatar
                  src={
                    typeof profile.avatar === "string"
                      ? profile.avatar
                      : URL.createObjectURL(profile.avatar)
                  }
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

            {/* Name */}
            <TextField
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              fullWidth
            />

            {/* Role */}
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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
