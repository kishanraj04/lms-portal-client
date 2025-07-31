import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export const CircularProgressWithLabel = ({
  courseId,
  value,
  label,
  color1,
  color2,
}) => {
  return (
    <Box
      component={Link}
      to={`/course-progress/${courseId}`}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        mx: 2,
        mb: 4,
        width: 160,
      }}
    >
      {/* Progress Circle with background and foreground */}
      <Box sx={{ position: "relative", width: 160, height: 160 }}>
        {/* Background Circle */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={160}
          thickness={5}
          sx={{
            color: color2,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        {/* Foreground Circle (Actual Progress) */}
        <CircularProgress
          variant="determinate"
          value={value}
          size={160}
          thickness={5}
          sx={{
            color: color1,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        {/* Center Label */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            {`${value}%`}
          </Typography>
          <Typography variant="caption">Complete</Typography>
        </Box>
      </Box>

      {/* Label below the circle */}
      <Typography
        variant="subtitle1"
        fontWeight={600}
        mt={1.5}
        textAlign="center"
        color="white"
      >
        {label}
      </Typography>
    </Box>
  );
};
