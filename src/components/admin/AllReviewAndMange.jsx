import React, { useState, useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { useDeleteReviewMutation, useGetCourseReviewByIdQuery, useUpdateReviewMutation } from "../../store/api/courseApi";
import { toast } from "react-toastify";
import { useEffect } from "react";

function AllReviewAndMange() {
  const { courseId } = useParams();
  const { data: allReviewOfCourse = {} } = useGetCourseReviewByIdQuery(courseId, {
    refetchOnMountOrArgChange: true,
  });

  const [open, setOpen] = useState(false);
  const [editReview, setEditReview] = useState("");
  const [editRating, setEditRating] = useState(1);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [filterRating, setFilterRating] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [updateReviewApi,updateResp] = useUpdateReviewMutation()
  const reviews = allReviewOfCourse?.totalReview || [];
  const [deleteReviewApi,deleteResp] = useDeleteReviewMutation()
  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleEditClick = (reviewId, reviewText, rating) => {
    setSelectedReviewId(reviewId);
    setEditReview(reviewText);
    setEditRating(rating);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditReview("");
    setEditRating(1);
    setSelectedReviewId(null);
  };

  const handleUpdate = async() => {
    const data = {
      review:editReview,
      rating:editRating
    }
    updateReviewApi({selectedReviewId,data})
    handleClose();
  };

  useEffect(()=>{
    if(updateResp?.isSuccess){
      toast.success("review updated")
    }else if(updateResp?.isError){
      toast.error("review not deleted")
    }
  },[updateResp])

  useEffect(()=>{
    console.log(deleteResp);
    if(deleteResp?.isSuccess){
      toast.success("review deleted")
    }else if(deleteResp?.isError){
      toast.error("review not deleted")
    }
  },[deleteResp])

  const handleDelete = async(reviewId) => {
    try {
      await deleteReviewApi(reviewId)
    } catch (error) {
      toast.error(error?.message)
    }
  };

  const filteredReviews = filterRating
    ? reviews.filter((rev) => rev.rating === filterRating)
    : reviews;

  const darkBg = darkMode ? "#121212" : "#fff";
  const lightText = darkMode ? "#fff" : "#000";

  return (
    <Box p={2} sx={{ backgroundColor: darkBg, minHeight: "100vh" }}>
      
      <Box sx={{display:"flex" , justifyContent:"space-between" ,flexDirection:"row-reverse"}}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
          label="Dark Mode"
          sx={{ color: lightText }}
        />
      </Box>

      <Box mb={2}>
        <Select
          value={filterRating}
          onChange={(e) => setFilterRating(Number(e.target.value))}
          displayEmpty
          sx={{ backgroundColor: darkMode ? "#1e1e1e" : "#f0f0f0", color: lightText }}
        >
          <MenuItem value={0}>All Ratings</MenuItem>
          {[1, 2, 3, 4, 5].map((val) => (
            <MenuItem key={val} value={val}>{"★".repeat(val)}</MenuItem>
          ))}
        </Select>
      </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: darkMode ? "#1e1e1e" : "#fafafa", color: lightText }}
      >
        {
          filteredReviews?.length<=0?<Box sx={{height:"50vh" , width:"full" , display:"flex" , justifyContent:"center" , alignItems:"center" ,backgroundColor:"transparent"}}>No Any Review</Box>:<Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: darkMode ? "#2a2a2a" : "#ddd" }}>
              <TableCell sx={{ color: lightText }}><strong>Reviewer</strong></TableCell>
              <TableCell sx={{ color: lightText }}><strong>Review</strong></TableCell>
              <TableCell sx={{ color: lightText }}><strong>Rating</strong></TableCell>
              <TableCell align="right" sx={{ color: lightText }}><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReviews.map((rev) => (
              <TableRow key={rev.reviewId}>
                <TableCell sx={{ color: lightText }}>{rev.reviewer}</TableCell>
                <TableCell sx={{ color: lightText }}>{rev.review}</TableCell>
                <TableCell sx={{ color: "#ffcc00" }}>{rev.rating} ★</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(rev.reviewId, rev.review, rev.rating)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(rev.reviewId)}>
                    {
                      deleteResp?.isLoading?<CircularProgress size={20}/>:<DeleteIcon />
                    }
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        }
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { backgroundColor: darkMode ? "#1e1e1e" : "#fff", color: lightText } }}
      >
        <DialogTitle sx={{ color: lightText }}>Edit Review</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Review"
            variant="outlined"
            value={editReview}
            onChange={(e) => setEditReview(e.target.value)}
            sx={{ mt: 1 }}
            InputLabelProps={{ style: { color: darkMode ? "#ccc" : undefined } }}
            InputProps={{ style: { color: lightText } }}
          />
          <TextField
            select
            fullWidth
            label="Rating"
            value={editRating}
            onChange={(e) => setEditRating(Number(e.target.value))}
            sx={{ mt: 2 }}
            InputLabelProps={{ style: { color: darkMode ? "#ccc" : undefined } }}
            InputProps={{ style: { color: lightText } }}
          >
            {[1, 2, 3, 4, 5].map((val) => (
              <MenuItem key={val} value={val}>{"★".repeat(val)}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: darkMode ? "#ccc" : undefined }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            {
              updateResp?.isLoading?<CircularProgress size={20}/>:"Update"
            }
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AllReviewAndMange;
