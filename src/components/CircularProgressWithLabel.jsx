import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

// Custom Circular Progress component
export const CircularProgressWithLabel = ({ courseId, value, label, color1, color2 }) => {
  return (
    <Box
      component={Link}
      to={`/course-progress/${courseId}`}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flexDirection:"column",
        textDecoration: 'none',
        color: 'white',
        mx: 4,
        mb: 4,
      }}
    >
      {/* Progress Circle with two layers */}
      <Box sx={{ position: 'relative', width: 120, height: 120 }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={120}
          thickness={4}
          sx={{
            color: color2,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <CircularProgress
          variant="determinate"
          value={value}
          size={120}
          thickness={4}
          sx={{
            color: color1,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />

        {/* Percentage Label Centered Inside */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color:"white"
          }}
        >
          <Typography variant="h6" fontWeight={700} color="white">
            {`${value}%`}
          </Typography>
        </Box>
      </Box>

      {/* Label Under the Circle */}
      <Typography variant="subtitle1" fontWeight={600} mt={1}>
        {label}
      </Typography>
    </Box>
  );
};

// export default function SkillsProgress() {
//   return (
//     <Box textAlign="center" mt={5}>
//       <Typography variant="h4" fontWeight={700} gutterBottom>
//         GeeksforGeeks Circular Progress Bar
//       </Typography>

//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         flexWrap="wrap"
//         mt={4}
//         gap={4}
//       >
//         <CircularProgressWithLabel
//           courseId="java"
//           value={85}
//           label="Java"
//           color1="#006400" // dark green
//           color2="#90EE90" // light green
//         />
//         <CircularProgressWithLabel
//           courseId="html"
//           value={50}
//           label="HTML"
//           color1="#7CFC00" // bright green
//           color2="#90EE90" // light green
//         />
//       </Box>
//     </Box>
//   );
// }
