import React, { useState } from "react";
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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadLecturePage = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploadedLectures, setUploadedLectures] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
  };

  const handleSubmit = () => {
    if (!lectureTitle || !videoFile) return;

    const newLecture = {
      title: lectureTitle,
      videoUrl: URL.createObjectURL(videoFile),
    };

    setUploadedLectures((prev) => [newLecture, ...prev]);
    setLectureTitle("");
    setVideoFile(null);
  };

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
            placeholder="Enter lecture name (e.g. Introduction to Graphs)"
            variant="outlined"
            fullWidth
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            sx={{
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
              {videoFile ? "Change Video" : "Select Video"}
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>

            {videoFile && (
              <Typography variant="body2" color="text.secondary">
                {videoFile?.name}
              </Typography>
            )}
          </Stack>

          {/* Video Preview */}
          {videoFile && (
            <video
              width="100%"
              height="240"
              controls
              style={{ borderRadius: 10, marginTop: 8 }}
              src={URL.createObjectURL(videoFile)}
            />
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{
                backgroundColor:"black",
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
            Upload Lecture
          </Button>
        </Stack>
      </Paper>

      {/* Uploaded Lectures */}
      <Box sx={{marginTop:7}}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          🎬 Uploaded Lectures
        </Typography>

        {uploadedLectures.length === 0 ? (
          <Typography variant="body2" color="white">
            No lectures uploaded yet. Start by uploading one above!
          </Typography>
        ) : (
          <Stack spacing={3}>
            {uploadedLectures.map((lecture, index) => (
              <Card key={index} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardMedia
                  component="video"
                  height="200"
                  controls
                  src={lecture.videoUrl}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {lecture.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default UploadLecturePage;
