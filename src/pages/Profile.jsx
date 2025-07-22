import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  useGetProfileQuery,
  useUpdateUserProfileMutation,
} from "../store/api/userApi";
import Courses from "../components/Courses";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { data: userData, isLoading } = useGetProfileQuery();
  const [updateUserProfile, updateUserProfileResp] =
    useUpdateUserProfileMutation();

  const [profile, setProfile] = useState({
    name: "",
    role: "Student",
    avatar: "",
  });

  useEffect(() => {
    if (userData?.user) {
      setProfile({
        name: userData.user.name || "",
        role: userData.user.role || "Student",
        avatar: userData.user.avatar || "",
      });
    }
  }, [userData]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("role", profile.role);

    if (profile.avatar && typeof profile.avatar !== "string") {
      formData.append("avatar", profile.avatar);
    }

    try {
      await updateUserProfile(formData).unwrap();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }

    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({ ...prev, avatar: file }));
    }
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 4, px: { xs: 2, md: 4 } }}>
      {/* Profile Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          maxWidth: "800px",
          mx: "auto",
          mb: 5

        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={4} alignItems="center">
          {/* Avatar */}
          <Box textAlign="center">
            <Avatar
              src={userData?.user?.avatar || ""}
              sx={{ width: 120, height: 120, mb: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
              Profile Picture
            </Typography>
          </Box>

          {/* User Info */}
          <Box flex={1}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {userData?.user?.name || "Unnamed"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {userData?.user?.email}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Role: <strong>{userData?.user?.role}</strong>
            </Typography>
            <Box mt={2}>
              <Button variant="contained" onClick={handleOpen}>
                Edit Profile
              </Button>
            </Box>
          </Box>
        </Stack>
      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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

            {/* Name Field */}
            <TextField
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              fullWidth
            />

            {/* Role Field */}
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
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={updateUserProfileResp.isLoading}
          >
            {updateUserProfileResp.isLoading ? "Updating..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Enrolled Courses */}
      <Box
        sx={{
          width: "100%",
          minHeight: "60vh",
          py: 5,
          px: { xs: 2, sm: 4, md: 6 },
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Enrolled Courses
        </Typography>

        <Grid
          container
          spacing={3}
          justifyContent={
            userData?.user?.enrolled?.length === 0 ? "center" : "flex-start"
          }
        >
          {userData?.user?.enrolled?.length === 0 ? (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
              >
                You Are Not Enrolled In Any Courses
              </Typography>
            </Grid>
          ) : (
            userData?.user?.enrolled?.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Courses course={course} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
