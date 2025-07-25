import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  Switch,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams } from "react-router-dom";
import { useUploadLectureMutation } from "../store/api/courseApi";
import { toast } from "react-toastify";

const UploadLecturePage = () => {
  const { id } = useParams();
  const [uploadLectureAPi,uploadLectureApiResp] = useUploadLectureMutation()
  const [lectureData, setLectureData] = useState({
    lectureTitle: "",
    lectureVedio: "",
    isFree: false,
  });

  useEffect(()=>{
    if(uploadLectureApiResp?.isSuccess){
      toast.success("lecture uploaded")
    }
    else if(uploadLectureApiResp?.isError){
      toast.error(uploadLectureApiResp?.error)
    }
  },[uploadLectureApiResp])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setLectureData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setLectureData((prev) => ({
      ...prev,
      lectureVedio: file,
    }));
  };

  const handleSubmit = async() => {
    const { lectureTitle, lectureVedio, isFree } = lectureData;

    if (!lectureTitle || !lectureVedio) return toast.error("All fields required!");
    console.log(lectureData?.lectureVedio);
    const formData = new FormData();
    formData.append("title", lectureData?.lectureTitle);
    formData.append("lectureVedio", lectureData?.lectureVedio);
    formData.append("isFree", lectureData?.isFree);
  
    const resp = await uploadLectureAPi({id,formData})
    console.log("resp ",resp);
    // console.log("Submitting:", {
    //   title: lectureTitle,
    //   video: lectureVedio,
    //   isFree,
    // });

  };

  console.log(lectureData?.lectureVedio);

  return (
    <Box sx={{ maxWidth: 650, mx: "auto" }}>
      <Paper
        elevation={4}
        sx={{
          //   p: 4,
          borderRadius: 3,
          backgroundColor: "inherit",
          mb: 5,
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={3} color="primary">
          📤 Upload Lecture
        </Typography>

        <Typography variant="body1" mb={2} color="secondary">
          Fill in the lecture title and choose a video file to upload your
          lecture content.
        </Typography>

        <Stack spacing={3}>
          {/* Lecture Title */}
          <TextField
            label="Lecture Title"
            placeholder="Enter lecture name"
            variant="outlined"
            name="lectureTitle"
            fullWidth
            value={lectureData?.lectureTitle}
            onChange={handleChange}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                color: "gray",
                opacity: 1,
              },
              "& .MuiOutlinedInput-root": {
                color: "white", // text color
                "& fieldset": {
                  borderColor: "white", // default border
                },
                "&:hover fieldset": {
                  borderColor: "#ccc", // on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2", // on focus
                },
              },
              input: {
                color: "white", // input text color
              },
              label: {
                color: "white", // label color
              },
            }}
          />

          {/* Upload Video Button */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              component="label"
            >
              {lectureData?.lectureVedio ? "Change Video" : "Select Video"}
              <input
                type="file"
                accept="video/*"
                name="lectureVedio"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            <Switch
              name="isFree"
              checked={lectureData?.isFree}
              onChange={handleChange}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#4caf50",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#4caf50",
                },
              }}
            />
            {lectureData?.lectureVedio && (
              <Typography variant="body2" color="text.secondary">
                {lectureData?.lectureVedio?.name}
              </Typography>
            )}
          </Stack>

          {/* Video Preview */}
          {lectureData?.lectureVedio && (
            <video
              width="100%"
              height="240"
              controls
              style={{ borderRadius: 10, marginTop: 8 }}
              src={URL.createObjectURL(lectureData?.lectureVedio)}
            />
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{
              backgroundColor: "black",
              "& .MuiInputBase-input::placeholder": {
                color: "gray",
                opacity: 1,
              },
              "& .MuiOutlinedInput-root": {
                color: "white", // text color
                borderColor: "white",
                "& fieldset": {
                  borderColor: "white", // default border
                },
                "&:hover fieldset": {
                  borderColor: "#ccc", // on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#a81cf9ff", // on focus
                },
              },
              input: {
                color: "white", // input text color
              },
              label: {
                color: "white", // label color
              },
            }}
            onClick={handleSubmit}
          >
            {uploadLectureApiResp?.isLoading?<CircularProgress size={20}/>:"Upload Lecture"}
          </Button>
        </Stack>
      </Paper>

      {/* Uploaded Lectures */}
      <Box sx={{ marginTop: 7 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          🎬 Uploaded Lectures
        </Typography>

        {/* {uploadedLectures?.length === 0 ? (
          <Typography variant="body2" color="white">
            No lectures uploaded yet. Start by uploading one above!
          </Typography>
        ) : (
          <Stack spacing={3}>
            {uploadedLectures?.map((lecture, index) => (
              <Card key={index} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardMedia
                  component="video"
                  height="200"
                  controls
                  src={lecture.videoUrl}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {lecture?.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )} */}
      </Box>
    </Box>
  );
};

export default UploadLecturePage;
