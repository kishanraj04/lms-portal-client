import React from "react";
import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import {Link} from 'react-router-dom'


const InstructorCourseTable = ({courses}) => {
  return (
    <Box m={3}>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1e1e1e", color: "white" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white", backgroundColor: "#333" }}>
                Thumbnail
              </TableCell>
              <TableCell sx={{ color: "white", backgroundColor: "#333" }}>
                Course Name
              </TableCell>
              <TableCell sx={{ color: "white", backgroundColor: "#333" }}>
                Price (₹)
              </TableCell>
              <TableCell sx={{ color: "white", backgroundColor: "#333" }}>
                Published Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course,idx) => (
              <TableRow key={idx} sx={{ backgroundColor: "#2a2a2a" }}>
                <TableCell sx={{ color: "white" }}>
                  <Avatar alt={course.name} src={course.thumbnail} component={Link}  to={`/dashboard/enrolled-students-details/${course.courseId}`}/>
                </TableCell>
                <TableCell sx={{ color: "white" }}>{course.name}</TableCell>
                <TableCell sx={{ color: "white" }}>₹{course.price}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {new Date(course.publishedDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InstructorCourseTable;
