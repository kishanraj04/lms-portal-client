import React, { useContext, useEffect } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetCourseWithPurchaseStatusQuery,
  useGetReviewQuery,
  useMakeCheckoutSessionMutation,
} from "../store/api/courseApi";
import { toast } from "react-toastify";
import { Link as RouterLink } from "react-router-dom";
import ReviewCarousel from "../common/ReviewCarousel";
import { GlobalContext } from "../context/globalcontext";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [createCheckoutSessionApi, createCheckOutResp] =
    useMakeCheckoutSessionMutation();
  const { data, respCoursAfterPurchase } = useGetCourseWithPurchaseStatusQuery(
    courseId,
    { refetchOnMountOrArgChange: true }
  );
  const { theam, setTheam } = useContext(GlobalContext);
  const { data: courseReview, reviewResp } = useGetReviewQuery(courseId, {
    refetchOnMountOrArgChange: true,
  });
  console.log("course ", courseReview?.reviews);
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.purchased) {
      // console.log(courseId);
      navigate(`/course-progress/${courseId}`);
    }
  }, [data]);
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
  const backgroundColor = theam ? "#121212" : "#f5f5f5"; // main background
  const headerBg = theam ? "#222" : "#222"; // you can keep or change
  const headerTextColor = "white"; // usually white on dark bg
  const contentBg = theam ? "#1E1E1E" : "white"; // white for light mode content background
  const paperBg = theam ? "#2A2A2A" : "#fafafa";
  const textColor = theam ? "rgba(255,255,255,0.87)" : "rgba(0,0,0,0.87)";
  const secondaryTextColor = theam
    ? "rgba(255,255,255,0.6)"
    : "rgba(0,0,0,0.6)";

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor,
        minHeight: "100vh",
        color: textColor,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: headerBg,
          color: headerTextColor,
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
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 2,
              bgcolor: contentBg,
              color: textColor,
            }}
          >
            <CardMedia
              component="video"
              controls
              src={data?.course?.lectures[0]?.vedio?.url}
              sx={{ height: 200, bgcolor: "black" }}
            />
            <CardContent>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color={textColor}
              >
                {data?.course?.title}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }} color={textColor}>
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
            backgroundColor: contentBg,
            p: 3,
            borderRadius: 2,
            boxShadow: 2,
            width: { xs: "100%", md: "65%" },
            color: textColor,
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Description
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4 }}
            color={textColor}
            dangerouslySetInnerHTML={{ __html: data?.course?.description }}
          />

          <Paper
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: paperBg,
              color: textColor,
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Course Content
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 2 }}
              color={secondaryTextColor}
            >
              {data?.course?.lectures?.length} lectures
            </Typography>
            <Divider sx={{ mb: 1, borderColor: secondaryTextColor }} />
            {data?.course?.lectures?.map(({ lectureTitle }, idx) => (
              <Typography variant="body2" key={idx} color={textColor}>
                ▶ {lectureTitle}
              </Typography>
            ))}
          </Paper>

          {/* review */}
          <Box sx={{ padding: 2, width: "100%" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "red", mb: 2 }}
            >
              Student Review
            </Typography>
            <ReviewCarousel reviews={courseReview?.reviews} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
