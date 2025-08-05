import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  IconButton,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useGetInstructorCourseQuery } from "../../store/api/instructoApi";
import { useNavigate } from "react-router-dom";

const ReviewManage = () => {
  const navigate = useNavigate();
  const { data: instructorCourse, isLoading } = useGetInstructorCourseQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  const handleReviewClick = (courseId) => {
    navigate(`/dashboard/mange-review/${courseId}`);

  };

  return (
    <Box p={2} sx={{ overflowX: "hidden", backgroundColor: "#121212", minHeight: "100vh" }}>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          boxShadow: 3,
          backgroundColor: "#1e1e1e", // Soft black for table
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2a2a2a" }}>
              <TableCell sx={{ color: "#fff" }}><strong>Thumbnail</strong></TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}><strong>Review</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructorCourse?.instructorCourse?.map((course) => (
              <TableRow
                key={course.courseId}
                sx={{
                  "&:hover": { backgroundColor: "#2c2c2c" },
                }}
              >
                <TableCell>
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    style={{ width: 100, borderRadius: 8 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#333", // subtle dark background
                      borderRadius: 2,
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "#444",
                      },
                    }}
                  >
                    <IconButton
                      sx={{ color: "#90caf9" }} // light blue
                      onClick={() => handleReviewClick(course.courseId)}
                    >
                      <RateReviewIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReviewManage;
