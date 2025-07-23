import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import TiptapEditor from "../common/TipTapEditor";

const EditCourse = () => {
  const [description, setDescription] = useState("");

  const textFieldStyles = {
    "& .MuiInputBase-input": {
      color: "white", // input text color
    },
    "& .MuiInputLabel-root": {
      color: "white", // label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white", // focused label
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "black", // field background
      "& fieldset": {
        borderColor: "white", // default border
      },
      "&:hover fieldset": {
        borderColor: "white", // hover border
      },
      "&.Mui-focused fieldset": {
        borderColor: "white", // focused border
      },
    },
    "& input::placeholder": {
      color: "white", // placeholder color
      opacity: 0.7,
    },
  };

  return (

    <>
    <Box sx={{width:"100%", display:"flex" , justifyContent:"end"}}>
     <Box sx={{display:"flex" , justifyContent:"space-between" , width:"100%" , alignItems:"center"}}>
       <Box>
        <Typography>Add More Information</Typography>
      </Box>
            <Box >
                <Button variant="outlined" sx={{margin:1}}>Public</Button>
                <Button variant="outlined">Remove Course</Button>
            </Box>
          </Box>
     </Box>
    
    <form>
      <TextField
        label="Title"
        placeholder="Enter course title"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
      />
      <TextField
        label="Subtitle"
        placeholder="Enter course subtitle"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
      />

      <TiptapEditor description={description} setDescription={setDescription} />

      <TextField
        label="Price (INR)"
        placeholder="Enter price"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Publish
      </Button>
    </form>
    </>
  );
};

export default EditCourse;
