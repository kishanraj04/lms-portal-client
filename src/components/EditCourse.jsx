import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import TiptapEditor from "../common/TipTapEditor";
import { useParams } from "react-router-dom";
import {
  useEditCourdeMutation,
  useGetCourseByIdQuery,
} from "../store/api/courseApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const EditCourse = () => {
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const [editCourseApi, editCourseResp] = useEditCourdeMutation();
  const [editData, setEditdata] = useState({
    title: "",
    subTitle: "",
    description: "",
    price: 0,
    discountPrice: 0,
    courseLevel: "Basic",
  });
  const {
    data: course,
    isError: isCourseError,
    isLoading: isCourseLoading,
  } = useGetCourseByIdQuery(id,{refetchOnMountOrArgChange:true});
  console.log(course);
  useEffect(() => {
    if (course) {
      Object.entries(course?.course).forEach(([key, value]) => {
        setEditdata((prev) => ({ ...prev, [key]: value }));
      });
      setDescription(editData?.description);
     
    }
  }, [course, isCourseError]);

  useEffect(() => {
    setEditdata((prev) => ({ ...prev, description: description }));
  }, [description]);

  useEffect(() => {
    if (editCourseResp?.isSuccess) {
      toast.success("course updated");
    } else if (editCourseResp?.isError) {
      toast.error("faild to update");
    }
  }, [editCourseResp]);

  const textFieldStyles = {
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#121212",
      borderRadius: 2,
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#90caf9",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#90caf9",
      },
    },
    "& input::placeholder": {
      color: "white",
      opacity: 0.7,
    },
  };
  const saveEdit = async (e) => {
    e.preventDefault();
    console.log(editData);
    try {
      const resp = await editCourseApi({
        id: course?.course?._id,
        data: editData,
      });
      console.log(resp);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <Paper
      sx={{
        p: 3,
        backgroundColor: "#1e1e1e",
        borderRadius: 3,
        color: "white",
        maxWidth: 1000,
        mx: "auto",
        mt: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Update Course
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="primary">
            Public
          </Button>
          <Button variant="outlined" color="error">
            Remove Course
          </Button>
        </Stack>
      </Box>

      <form>
        <Stack spacing={2}>
          <TextField
            label="Title"
            placeholder="Enter course title"
            fullWidth
            sx={textFieldStyles}
            value={editData?.title}
            onChange={(e) =>
              setEditdata((prev) => ({ ...prev, title: e.target?.value }))
            }
          />

          <TextField
            label="SubTitle"
            placeholder="Enter course Subtitle"
            fullWidth
            sx={textFieldStyles}
            value={editData?.subTitle}
            onChange={(e) =>
              setEditdata((prev) => ({ ...prev, subTitle: e.target?.value }))
            }
          />

          <TiptapEditor
            description={description}
            setDescription={setDescription}
            data={editData?.description}
          />

          <TextField
            label="Price (INR)"
            placeholder="Enter price"
            fullWidth
            type="number"
            sx={textFieldStyles}
            value={editData?.price}
            onChange={(e) =>
              setEditdata((prev) => ({ ...prev, price: e.target?.value }))
            }
          />

          <TextField
            label="Discount Price (INR)"
            placeholder="Enter discounted price"
            fullWidth
            type="number"
            sx={textFieldStyles}
            value={editData?.discountPrice}
            onChange={(e) =>
              setEditdata((prev) => ({
                ...prev,
                discountPrice: e.target?.value,
              }))
            }
          />

          <TextField
            select
            label="Course Level"
            name="courseLevel"
            value={editData?.courseLevel?.toLowerCase() || ""}
            onChange={(e) =>
              setEditdata((prev) => ({ ...prev, courseLevel: e.target?.value }))
            }
            fullWidth
            sx={textFieldStyles}
          >
            <MenuItem value="basic">Basic</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="advance">Advance</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              backgroundColor: `${editCourseResp?.isLoading ? "green" : "red"}`,
            }}
            onClick={saveEdit}
          >
            {editCourseResp?.isLoading ? "Editing" : "Save Edit"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default EditCourse;
