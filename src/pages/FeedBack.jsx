import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { Loader } from "../common/Loader";
import { useMyEnrolledCourseQuery } from "../store/api/courseApi";

function FeedBack() {
  const { data: myCourses, isLoading } = useMyEnrolledCourseQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log(myCourses);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({ review: "", rating: "" });

  const handleOpen = (course) => {
    setSelectedCourse(course?.courseId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ review: "", rating: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log("Submitted Review:", {
      courseId: selectedCourse._id,
      ...formData,
    });
    handleClose();
  };

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, py: 4 }}>
      <Typography variant="h6" gutterBottom fontWeight={600} color="red">
        Enrolled Courses
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table sx={{ minWidth: 300 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Thumbnail
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Title
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Price (₹)
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: 600 }}
                align="center"
              >
                Feedback
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {myCourses?.course?.map((course) => (
              <TableRow key={course._id || course.title} hover>
                <TableCell>
                  <Box
                    component="img"
                    src={course.thumbnail}
                    alt={course.title}
                    sx={{
                      width: { xs: 60, sm: 80 },
                      height: { xs: 40, sm: 50 },
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                </TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>₹{course.price}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<FeedbackIcon />}
                    onClick={() => handleOpen(course)}
                    sx={{ textTransform: "none" }}
                  >
                    Give Feedback
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Feedback Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        scroll="body"
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Feedback for{" "}
          <span style={{ color: "red" }}>
            {selectedCourse?.title?.toUpperCase()}
          </span>
        </DialogTitle>

        <DialogContent
          sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            name="review"
            label="Your Review"
            multiline
            rows={4}
            value={formData.review}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            select
            name="rating"
            label="Rating"
            value={formData.rating}
            onChange={handleChange}
            fullWidth
          >
            {[
              { stars: "★", value: 1 },
              { stars: "★★", value: 2 },
              { stars: "★★★", value: 3 },
              { stars: "★★★★", value: 4 },
              { stars: "★★★★★", value: 5 },
            ].map(({ stars, value }) => (
              <MenuItem key={value} value={value}>
                <span style={{color:"green"}}>{stars}</span>
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default FeedBack;
