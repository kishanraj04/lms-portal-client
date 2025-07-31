import React from 'react';
import { Box } from '@mui/material';
import { CircularProgressWithLabel } from '../components/CircularProgressWithLabel';
import { useUserLearningProgressQuery } from '../store/api/courseApi';

function Learning() {
  const { data: courseProg } = useUserLearningProgressQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        width: '100%',
        minHeight: '80vh',
        py: 5,
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap={4}
        sx={{marginTop:"5%"}}
      >
        {courseProg?.progress?.map(
          ({ courseId, progressValue, title, colour1, colour2 }) => (
            <CircularProgressWithLabel
              key={courseId}
              courseId={courseId}
              value={progressValue}
              label={title}
              color1={colour1}
              color2={colour2}
            />
          )
        )}
      </Box>
    </Box>
  );
}

export default Learning;
