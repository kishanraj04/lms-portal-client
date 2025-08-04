import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseWithPurchaseStatusQuery } from "../store/api/courseApi";
import { useGetCompletedLectureQuery, useSaveLectureProgressMutation } from "../store/api/lectureprogressApi";
import { useSelector } from "react-redux";

export default function CourseProgress() {
  const videoRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data } = useGetCourseWithPurchaseStatusQuery(courseId, {
    refetchOnMountOrArgChange: true,
  });
  const [lectureProgressApi,lecturProgressResp] = useSaveLectureProgressMutation()
  const {data:completedLectures} =useGetCompletedLectureQuery(courseId,{refetchOnMountOrArgChange:true})
  const [isResource,setIsResource] = useState(false);
  const course = data?.course;
  const purchased = data?.purchased;
  useEffect(() => {
    if (purchased === false) {
      navigate(`/course/detail/${courseId}`);
    } else if (course?.lectures?.length) {
      setCurrent(course.lectures[0]);
    }
  }, [data]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !current) return;

    // const savedTime = parseFloat(localStorage.getItem(`video-progress-${current._id}`));

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      if (!isNaN(savedTime) && savedTime < video.duration) {
        video.currentTime = savedTime;
      }
    };

    const handleTimeUpdate = () => {
      setPlayed(video.currentTime);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [current]);
  const overallProgress = duration ? ((played / duration) * 100): 0;
  
  useEffect(()=>{
    if(overallProgress==100){
    const progressData = {
      courseId,
      played,
      duration,
      lectureId:current?._id,
      progress:100
    }
    lectureProgressApi(progressData)
  }

  },[overallProgress])
  
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 2,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
      }}
    >
      {/* Video Player */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{ flexBasis: { md: "40%" }, maxWidth: { md: "40%" } }}
      >
        <Card
          sx={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader
            title={
              <Typography variant="h6">
                {current?.lectureTitle || ""}
              </Typography>
            }
            subheader={
              <Typography variant="body2" color="text.secondary">
                {(duration - played).toFixed(2)}s left
              </Typography>
            }
          />
          <Box sx={{ position: "relative", pt: "56.25%", bgcolor: "black" }}>
            <Box
              component="video"
              ref={videoRef}
              src={current?.vedio?.url}
              controls
              autoPlay={false}
              playsInline
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
          <CardContent sx={{display:"flex" , justifyContent:"space-between"}}>
            <Typography variant="body2" color="text.secondary">
              {course?.description?.replace(/<[^>]+>/g, "").slice(0, 150)}...
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{backgroundColor:"green" , borderRadius:"10%"  , color:"white" , cursor:"pointer" , width:"20%" ,textAlign:"center" }}
            onClick={()=>setIsResource(!isResource)}>{!isResource?"Resources":"Lecture"}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Lecture List */}
      <Grid
        item
        xs={12}
        md={7}
        sx={{ flexBasis: { md: "60%" }, maxWidth: { md: "60%" } }}
      >
        {
          !isResource?<Paper
          variant="outlined"
          sx={{ maxHeight: "80vh", overflowY: "auto", flex: 1 }}
        >
          <Box sx={{ p: 2, bgcolor: "#f5f5f5" }}>
            <Typography variant="h6" fontWeight={600}>
              Playlist
            </Typography>
          </Box>
          <List disablePadding>
            {course?.lectures?.map((v) => {
              const selected = current?._id === v._id;
              const isWatched =
                parseFloat(
                  localStorage.getItem(`video-progress-${v._id}`) || 0
                ) >=
                0.95 * (duration || 1);
              return (
                <ListItem
                  disablePadding
                  key={v._id}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <ListItemButton
                    onClick={() => setCurrent(v)}
                    selected={selected}
                    sx={{ py: 1.5, px: 2, flex: 1 }}
                  >
                    <ListItemAvatar>
                      <Box
                        component="img"
                        src={course.thumbnail?.url}
                        alt={v.lectureTitle}
                        sx={{
                          width: 100,
                          height: 56,
                          objectFit: "cover",
                          mr: 2,
                          border: (theme) =>
                            `2px solid ${
                              selected
                                ? theme.palette.primary.main
                                : "transparent"
                            }`,
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          {selected && (
                            <PlayArrowIcon fontSize="small" color="primary" />
                          )}
                          <Typography variant="subtitle2" noWrap>
                            {v.lectureTitle}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {v.isFree ? "Free" : "Paid"}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                  {completedLectures?.completedLectureIds?.includes(v?._id) && (
                    <Box sx={{ px: 2 }}>
                      <CheckCircleIcon color="success" />
                    </Box>
                  )}
                </ListItem>
              );
            })}
          </List>
        </Paper>:"resource section"
        }
      </Grid>
    </Container>
  );
}
