import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Stack,
  Paper,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useCreateCourseMutation } from "../store/api/courseApi";
import { toast } from "react-toastify";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    subTitle:"",
    price: "",
    discountPrice: "",
    description: "",
    courselevel: "basic",
    thumbnail: null,
  });
  const [createCourse,creatCourseResp] = useCreateCourseMutation()
  const [preview, setPreview] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, thumbnail: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const res = await createCourse(data)
  };

  useEffect(()=>{
    if(creatCourseResp?.isError){
      toast.error(creatCourseResp?.error)
    }
    else if(creatCourseResp?.isSuccess){
      setFormData({
    title: "",
    subTitle:"",
    price: "",
    discountPrice: "",
    description: "",
    courselevel: "basic",
    thumbnail: null,
  })
    }
  },[creatCourseResp])

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          p: 4,
          borderRadius: 4,
          backgroundColor: "inherit",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
          "&::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          align="center"
          color="primary"
        >
          Create New Course
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              placeholder="Enter course title"
              variant="outlined"
              InputProps={{
                sx: {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#90caf9",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "white",
                },
              }}
              sx={{ input: { color: "white" }, borderRadius: 2 }}
            />
            <TextField
              label="Sub Title"
              name="subTitle"
              value={formData?.subTitle}
              onChange={handleChange}
              fullWidth
              required
              placeholder="Enter course title"
              variant="outlined"
              InputProps={{
                sx: {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#90caf9",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "white",
                },
              }}
              sx={{ input: { color: "white" }, borderRadius: 2 }}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              {["price", "discountPrice"].map((field, i) => (
                <TextField
                  key={i}
                  label={field === "price" ? "Price" : "Discount Price"}
                  name={field}
                  type="number"
                  value={formData[field]}
                  onChange={handleChange}
                  fullWidth
                  required
                  placeholder={`Enter ${field}`}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#90caf9",
                      },
                    },
                  }}
                  InputLabelProps={{ sx: { color: "white" } }}
                  sx={{ input: { color: "white" }, borderRadius: 2 }}
                />
              ))}
            </Stack>

            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              placeholder="Enter course description"
              variant="outlined"
              InputProps={{
                sx: {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#90caf9",
                  },
                },
              }}
              InputLabelProps={{ sx: { color: "white" } }}
              sx={{ textarea: { color: "white" }, borderRadius: 2 }}
            />

            <TextField
              select
              label="Course Level"
              name="courselevel"
              value={formData.courselevel}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#90caf9",
                  },
                },
              }}
              InputLabelProps={{ sx: { color: "white" } }}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="basic">Basic</MenuItem>
               <MenuItem value="basic">Medium</MenuItem>
              <MenuItem value="advance">Advance</MenuItem>
            </TextField>

            <Button
              component="label"
              variant="outlined"
              fullWidth
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "#90caf9",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Upload Thumbnail
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>

            {preview && (
              <Box
                mt={1}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  height: 500,
                  objectFit: "fill",
                }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Box>
            )}

            {
              creatCourseResp?.isLoading?<Box  sx={{
                mt: 1,
                border:"1px",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#3c7407ff",
                },
                display:"flex",
                justifyContent:"center"
              }}><CircularProgress size={20}/></Box>:<Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 1,
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Create Course
            </Button>
            }
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateCourse;
