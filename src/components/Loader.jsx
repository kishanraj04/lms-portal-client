import React from 'react';
import { Skeleton, Grid, Box, Typography } from '@mui/material';

const Loader = () => {
  return (
    <Box p={3}>
      {/* Title */}
      <Skeleton variant="text" width="40%" height={40} />

      {/* Cards Skeleton */}
      <Grid container spacing={3} mt={2}>
        {[...Array(3)].map((_, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Skeleton variant="rectangular" width="100%" height={150} />
          </Grid>
        ))}
      </Grid>

      {/* Table Skeleton */}
      <Box mt={4}>
        <Skeleton variant="text" width="30%" height={30} />
        {[...Array(5)].map((_, i) => (
          <Grid container key={i} spacing={2} mt={1}>
            <Grid item xs={3}>
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default Loader;
