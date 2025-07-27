import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Switch,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleLectureQuery,
  useUpdateLectureMutation,
} from "../store/api/courseApi";
import { toast } from "react-toastify";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const EditLecturePage = () => {
  const {lectureId} = useLocation().state
  const [formState, setFormState] = useState({
    lectureTitle: "",
    isFree: false,
    lectureVedio: null,
  });

  const { data: lectureData, isLoading } = useGetSingleLectureQuery(lectureId,{refetchOnMountOrArgChange:true});
  const [updateLecture, updateResp] = useUpdateLectureMutation();
  const navigate = useNavigate()
  useEffect(() => {
    if (lectureData) {
      setFormState({
        lectureTitle: lectureData?.lecture?.lectureTitle|| "",
        isFree:lectureData?.lecture?.isFree || false,
        lectureVedio: null, 
      });
    }
  }, [lectureData]);

  useEffect(()=>{
    if(updateResp?.isSuccess){
      toast.success("lecture updated")
    }
    else if(updateResp?.isError){
      toast.error(updateResp?.error)
    }
  },[updateResp])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  console.log(lectureId);
  const handleFileChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      lectureVedio: e.target.files[0],
    }));
  };

  const henadleEditLecture = async () => {
    const { lectureTitle, isFree, lectureVedio } = formState;

    if (!lectureTitle) return toast.error("Lecture title is required");

    const formData = new FormData();
    formData.append("lectureId",lectureData?._id)
    formData.append("title", lectureTitle);
    formData.append("isFree", isFree);
    if (lectureVedio) {
      formData.append("lectureVedio", lectureVedio);
    }

    try {
      const res = await updateLecture({ lectureId, formData });
    } catch (err) {
      toast.error("Failed to update lecture");
    }
  };
  if (isLoading) return <CircularProgress />;

  return (
    <Box maxWidth="600px" mx="auto" mt={4} boxShadow={20}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: "inherit",
          color: "white",
        }}
      >
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
          <Typography variant="h6" mb={2}>
          ✏️ Edit Lecture
        </Typography>

        <Typography variant="h6" mb={2}>
          <ArrowBackIcon onClick={()=>navigate(-1)}/>
        </Typography>
        </Box>

        <Stack spacing={3}>
          <TextField
            placeholder="Enter lecture title"
            variant="outlined"
            name="lectureTitle"
            onChange={handleChange}
            value={formState?.lectureTitle}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white", // text color
                "& fieldset": {
                  borderColor: "white", // default border
                },
                "&:hover fieldset": {
                  borderColor: "lightgray", // on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // on focus
                },
              },
              "& .MuiInputLabel-root": {
                color: "white", // label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // focused label color
              },
              input: {
                color: "white", // input text
                "::placeholder": {
                  color: "gray", // placeholder color
                  opacity: 1,
                },
              },
            }}
            InputProps={{
              style: { color: "white" }, // just to be extra sure
            }}
            InputLabelProps={{
              style: { color: "white" }, // for label color
            }}
          />

          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography> Is Free:</Typography>
            <Switch
              name="isFree"
              checked={formState?.isFree}
              onChange={handleChange}
              color="success"
            />
          </Stack>

          <Button variant="text" component="label">
            {formState?.lectureVedio ? "Change Video" : "Select New Video"}
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          {/* Uncomment to preview existing video */}
          {lectureData?.lecture?.vedio?.url && (
            <video
              src={lectureData?.lecture?.vedio.url}
              controls
              style={{ width: "100%", borderRadius: 8 }}
            />
          )}

          <Button
            variant="outlined"
            onClick={henadleEditLecture}
            disabled={updateResp?.isLoading}
            sx={{backgroundColor:"gray" , color:"black" , font:"bold"}}
          >
            {updateResp?.isLoading ? (
              <CircularProgress size={24} />
            ) : (
              "Update Lecture"
            )}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditLecturePage;
