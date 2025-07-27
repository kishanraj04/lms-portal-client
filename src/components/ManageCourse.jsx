import React, { useEffect } from "react";
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
import { useGetMyCoursesQuery, useMakeCoursePublicMutation } from "../store/api/courseApi";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";

const ManageCourseTable = () => {
  const { data: myCourses } = useGetMyCoursesQuery();
  const [makeCoursePublicApi,makeCoursePublicResp] = useMakeCoursePublicMutation()
  const courses = myCourses?.myCourses || [];

  useEffect(()=>{
    if(makeCoursePublicResp?.isError){
      toast.error(makeCoursePublicResp?.error)
    }
  },[makeCoursePublicResp])

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
            {courses?.length==0 ? "nothing" :courses.map((course) => (
              <TableRow key={course?._id}>
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

                <TableCell sx={{ color: "white" }}>{course?.title}</TableCell>
                <TableCell sx={{ color: "white" }}>₹{course?.price}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {/* Edit Icon */}
                    <IconButton
                      component={RouterLink}
                      to={`${course?._id}`}
                      sx={{
                        color: "white",
                        backgroundColor: "#aa8f05ff", // red
                        "&:hover": {
                          backgroundColor: "#8b8108ff", // dark red
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    {/* Published Icon */}
                    <Tooltip title={`${course?.isPublish?"Published":"un Publish"}`}>
                      {
                        course?.isPublish?<IconButton
                        sx={{
                          color: "white",
                          backgroundColor: "#43a047", // green
                          "&:hover": {
                            backgroundColor: "#2e7d32", // dark green
                          },
                        }}
                      >
                        <CheckCircleIcon onClick={async()=>{
                          const resp = await makeCoursePublicApi({courseId:course?._id,isPublish:false})
                          if(resp?.data?.success) toast.success("course unpublish")
                          
                        }}/>
                      </IconButton>:<IconButton
                        sx={{
                          color: "white",
                          backgroundColor: "#d20a17ff", // green
                          "&:hover": {
                            backgroundColor: "#820606ff", // dark green
                          },
                        }}
                      >
                        <CheckCircleIcon onClick={async()=>{
                          const resp = await makeCoursePublicApi({courseId:course?._id,isPublish:true})
                           if(resp?.data?.success) toast.success("course publish")
                        }}/>
                      </IconButton>
                      }
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
