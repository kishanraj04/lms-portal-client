import React, { useRef, useState } from "react";
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
import { toast } from "react-toastify";
import { useGetAllResourcesQuery, useUploadResoursesMutation } from "../store/api/instructoApi";
import PdfResourceList from "./PdfResoList";

const UploadResources = () => {
  const [resources, setResources] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const inputRef = useRef();
  const { state } = useLocation();
  const [uploadResourceApi,uploadResp] = useUploadResoursesMutation();
  const {data} = useGetAllResourcesQuery(state?.courseId,{skip:!state?.courseId,refetchOnMountOrArgChange:true})
  console.log(data);
  const handleFileChange = (e) => {
    setResources(e.target.files[0]);
    setUploadSuccess(false);
  };
  console.log(data?.resources);
  const handleUpload = async () => {
    if (!resources) {
      toast.error("Please select a file.");
      return;
    }

    if (!state?.lectureId || !state?.courseId) {
      toast.error("Missing lecture or course information.");
      return;
    }

    setUploading(true);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("resources", resources);
      formData.append("lectureId", state.lectureId);
      formData.append("courseId", state.courseId);
      const res = await uploadResourceApi(formData).unwrap();
      console.log(res);
      if (res?.success || res?.data?.message) {
        setUploadSuccess(true);
        toast.success("Resource uploaded successfully!");
        setResources(null);
        if (inputRef.current) inputRef.current.value = "";
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "only pdf allowed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={12}
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
                fontSize: 60,
                color: "#00bcd4",
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
              Allowed: PDF, DOCX, PPT, TXT, ZIP (no videos/images)
            </Typography>
          </Box>

          <Input
            inputRef={inputRef}
            type="file"
            name="resources"
            fullWidth
            onChange={handleFileChange}
            inputProps={{
              accept: ".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar",
            }}
            sx={{
              input: { color: "#fff" },
              border: "1px solid #444",
              borderRadius: 1,
              px: 1,
              py: 1,
              backgroundColor: "#2a2a2a",
            }}
          />

          {resources && (
            <Typography variant="body2" color="grey.400">
              Selected File: {resources.name}
            </Typography>
          )}

          {uploading && <LinearProgress color="info" />}

          <Button
            variant="contained"
            color="info"
            size="large"
            startIcon={<CloudUploadIcon />}
            onClick={handleUpload}
            disabled={uploading || !resources}
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

    {/* res. list */}
    <Box>
      <PdfResourceList resources={data?.resources}/>
    </Box>
    </>
  );
};

export default UploadResources;
