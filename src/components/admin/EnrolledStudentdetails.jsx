import React from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useGetEnrolledStudentInSpecificCourseQuery } from "../../store/api/instructoApi";
import { Link } from "react-router-dom";

function EnrolledStudentdetails() {
  const { courseId } = useParams();
  const location = useLocation();
  const {
    data: enrolledStudent,
    isLoading,
    isError,
    error,
  } = useGetEnrolledStudentInSpecificCourseQuery(courseId, {
    refetchOnMountOrArgChange: true,
  });

  const enrolledDetails = enrolledStudent?.enrolledDetails || [];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" mt={4} textAlign="center">
        Error: {error?.data?.message || "Something went wrong"}
      </Typography>
    );
  }

  return (
    <Box p={3} sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          marginBottom:2
        }}
      >
        <Typography>Total Student Enrolled In </Typography>{" "}
        <Typography variant="h6" sx={{ color: "red", fontWeight: "bold" }}>
          {location?.state}
        </Typography>
      </Box>
      {enrolledDetails.length === 0 ? (
        <Typography>No students enrolled in this course yet.</Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            overflowX: "auto",
            maxWidth: "100%",
            whiteSpace: "nowrap",
            scrollbarWidth: "none",
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#211f1fff" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>
                  <strong>Avatar</strong>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  <strong>User Name</strong>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  <strong>Email</strong>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  <strong>User ID</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrolledDetails.map((student, index) => (
                <TableRow
                  key={student?.userId}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#484646ff" : "#ffffff",
                    "&:hover": {
                      backgroundColor: "#5a6567ff",
                    },
                  }}
                >
                  <TableCell>
                    <Avatar src={student?.avatar} alt={student?.userName} component={Link} to={student?.avatar} target="_blank"/>
                  </TableCell>
                  <TableCell>{student?.userName}</TableCell>
                  <TableCell>{student?.email}</TableCell>
                  <TableCell>{student?.userId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default EnrolledStudentdetails;
