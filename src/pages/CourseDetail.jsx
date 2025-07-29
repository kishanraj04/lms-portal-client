import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import {
  useGetCourseWithPurchaseStatusQuery,
  useMakeCheckoutSessionMutation,
} from "../store/api/courseApi";
import { toast } from "react-toastify";
import { Link as RouterLink } from 'react-router-dom';

export default function CourseDetail() {
  const { courseId } = useParams();
  const [createCheckoutSessionApi, createCheckOutResp] =
    useMakeCheckoutSessionMutation();
  const { data, respCoursAfterPurchase } = useGetCourseWithPurchaseStatusQuery(
    courseId,
    { refetchOnMountOrArgChange: true }
  );

  console.log(data, data?.course?.lectures?.length);
  const courseCheckoutHandler = async () => {
    const resp = await createCheckoutSessionApi(courseId);
  };

  useEffect(() => {
    if (createCheckOutResp?.data?.url) {
      window.location.href = createCheckOutResp?.data?.url;
    } else {
      toast.error(createCheckOutResp?.error);
    }
    if (createCheckOutResp?.isError) {
      toast.error(createCheckOutResp?.error);
    }
  }, [createCheckOutResp]);
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: "#222",
          color: "white",
          borderRadius: 2,
          p: { xs: 2, md: 3 },
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          {data?.course?.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {data?.course?.subTitle}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Created By <b>{data?.course?.creator?.name}</b>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Last updated: 2024-10-20
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Students enrolled: {data?.course?.enrolledStudent}
        </Typography>
      </Box>

      {/* Main Content Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          gap: 4,
        }}
      >
        {/* Right Box: Video + Price */}
        <Box sx={{ width: { xs: "100%", md: "35%" } }}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardMedia
              component="video"
              controls
              src={data?.course?.lectures[0]?.vedio?.url}
              sx={{ height: 200 }}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {data?.course?.title}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                {data?.course?.price}₹
              </Typography>
              {!data?.purchased ? (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => courseCheckoutHandler()}
                >
                  Buy Course Now
                </Button>
              ) : (
                <Button
                  component={RouterLink}
                  to={`/course-progress/${data?.course?._id}`}
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 2 }}
                  
                >
                  Continue
                </Button>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Left Box: Description + Course Content */}
        <Box
          sx={{
            backgroundColor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 2,
            width: { xs: "100%", md: "65%" },
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Description
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4 }}
            dangerouslySetInnerHTML={{ __html: data?.course?.description }}
          />

          <Paper
            elevation={1}
            sx={{ p: 2, borderRadius: 2, backgroundColor: "#fafafa" }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Course Content
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {data?.course?.lectures?.length} lectures
            </Typography>
            <Divider sx={{ mb: 1 }} />
            {
              data?.course?.lectures?.map(({lectureTitle})=><Typography variant="body2">▶ {lectureTitle}</Typography>)
            }
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
