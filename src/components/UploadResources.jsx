import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Input,
  Paper,
  LinearProgress,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLocation } from "react-router-dom";

const UploadResources = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const {state}  = useLocation()
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadSuccess(false);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "10vh",
        // background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "100%",
          maxWidth: 500,
          backgroundColor: "#1e1e1e",
          color: "#fff",
          boxShadow: "0px 4px 30px rgba(0,0,0,0.4)",
        }}
      >
        <Stack spacing={3}>
          <Box textAlign="center">
            <CloudUploadIcon
              sx={{
                fontSize: 50,
                color: "#46adbaff",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
            <Typography variant="h5" mt={1}>
              Upload Course Resource
            </Typography>
            <Typography variant="body2" color="grey.500">
              Supported formats: PDF, PPT, ZIP, DOCX
            </Typography>
          </Box>

          <Input
            type="file"
            fullWidth
            onChange={handleFileChange}
            inputProps={{
              accept: `.pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar`,
            }}
            sx={{
              input: {
                color: "#fff",
              },
              border: "1px solid #444",
              borderRadius: 1,
              px: 1,
              py: 1,
              backgroundColor: "#2a2a2a",
            }}
          />

          {selectedFile && (
            <Typography variant="body2" color="grey.400">
              Selected File: {selectedFile.name}
            </Typography>
          )}

          {uploading && <LinearProgress color="info" />}

          <Button
            variant="contained"
            color="info"
            size="large"
            startIcon={<CloudUploadIcon color="blue" />}
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
            sx={{
              fontWeight: "bold",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#00acc1",
              },
            }}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>

          {uploadSuccess && (
            <Typography textAlign="center" sx={{ color: "#4caf50" }}>
              ✅ File uploaded successfully!
            </Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default UploadResources;
