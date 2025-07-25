import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Stack,
  Button,
  Link,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useGetMyCoursesQuery } from "../store/api/courseApi";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const ManageCourseTable = () => {
  const { data: myCourses } = useGetMyCoursesQuery();
  const courses = myCourses?.myCourses || [];

  return (
    <Box
      sx={{
        px: 2,
        py: 4,
        minHeight: "100vh",
        bgcolor: "#121212",
      }}
    >
      {/* Top Heading with Link */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          width: "90%",
        }}
      >
        <Typography
          variant="p"
          fontWeight="bold"
          color="white"
          mb={2}
          sx={{ fontSize: "15px" }}
        >
          Manage Courses
        </Typography>
        <Link
          component={RouterLink}
          to="/lectures"
          underline="none"
          sx={{
            fontSize: "15px",
            fontWeight: "bold",
            color: "#1976d2",
            "&:hover": {
              color: "#1565c0",
              textDecoration: "none",
            },
          }}
        >
          Go Lectures
        </Link>
      </Box>

      {/* Table View */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#1e1e1e",
          width: "auto", // ✅ Make table container full width
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        <Table sx={{ minWidth: "100%", width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Thumbnail
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Price
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>
                  <Box
                    sx={{
                      width: 100,
                      height: 60,
                      overflow: "hidden",
                      borderRadius: 1,
                    }}
                  >
                    <img
                      src={course?.thumbnail?.url}
                      alt={course?.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "4px",
                        display: "block",
                      }}
                    />
                  </Box>
                </TableCell>

                <TableCell sx={{ color: "white" }}>{course.title}</TableCell>
                <TableCell sx={{ color: "white" }}>₹{course.price}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {/* Edit Icon */}
                    <IconButton
                      component={RouterLink}
                      to={`${course?._id}`}
                      sx={{
                        color: "white",
                        backgroundColor: "#e53935", // red
                        "&:hover": {
                          backgroundColor: "#c62828", // dark red
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    {/* Published Icon */}
                    <Tooltip title="Published">
                      <IconButton
                        sx={{
                          color: "white",
                          backgroundColor: "#43a047", // green
                          "&:hover": {
                            backgroundColor: "#2e7d32", // dark green
                          },
                        }}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>

                    {/* Upload Icon */}
                    <Tooltip title="Upload File">
                      <IconButton
                        component={RouterLink}
                        to={`/dashboard/manage-courses/vedio/upload/${course?._id}`}
                        sx={{
                          color: "white",
                          backgroundColor: "#1e88e5",
                          "&:hover": {
                            backgroundColor: "#1565c0",
                          },
                        }}
                      >
                        <UploadFileIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageCourseTable;
