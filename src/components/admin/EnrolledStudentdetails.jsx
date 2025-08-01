import React from 'react';
import { useParams } from 'react-router-dom';
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
} from '@mui/material';
import { useGetEnrolledStudentInSpecificCourseQuery } from '../../store/api/instructoApi';

function EnrolledStudentdetails() {
  const { courseId } = useParams();
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
        Error: {error?.data?.message || 'Something went wrong'}
      </Typography>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Enrolled Students
      </Typography>

      {enrolledDetails.length === 0 ? (
        <Typography>No students enrolled in this course yet.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Avatar</strong></TableCell>
                <TableCell><strong>User Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>User ID</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrolledDetails.map((student) => (
                <TableRow key={student.userId}>
                  <TableCell>
                    <Avatar src={student.avatar} alt={student.userName} />
                  </TableCell>
                  <TableCell>{student.userName}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.userId}</TableCell>
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
