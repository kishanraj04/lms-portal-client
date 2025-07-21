import React from 'react';
import {
  Box,
  Grid,
  Skeleton,
  Stack,
  Divider,
  Paper
} from '@mui/material';

const Loader = () => {
  return (
    <Box display="flex" height="100vh" bgcolor="#f9fafb">
      {/* Sidebar */}
      <Box
        width={240}
        p={3}
        bgcolor="white"
        borderRight="1px solid #e0e0e0"
      >
        <Stack spacing={2}>
          <Skeleton variant="circular" width={60} height={60} />
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} variant="rounded" width="80%" height={20} />
          ))}
        </Stack>
      </Box>

      {/* Main Content */}
      <Box flexGrow={1} p={4} overflow="auto">
        {/* Top header */}
        <Skeleton variant="rounded" width="30%" height={40} sx={{ mb: 4 }} />

        {/* Course Cards */}
        <Grid container spacing={3}>
          {[...Array(3)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Skeleton variant="rounded" width="100%" height={120} />
                <Skeleton variant="text" width="60%" height={25} sx={{ mt: 2 }} />
                <Skeleton variant="text" width="40%" height={20} />
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Section Divider */}
        <Box my={5}>
          <Divider />
          <Skeleton variant="text" width="25%" height={30} sx={{ mt: 2 }} />
        </Box>

        {/* Recent Activity List */}
        <Grid container spacing={2}>
          {[...Array(5)].map((_, i) => (
            <Grid item xs={12} key={i}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "#fff" }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Skeleton variant="text" width="90%" height={20} />
                  </Grid>
                  <Grid item xs={3}>
                    <Skeleton variant="text" width="70%" height={20} />
                  </Grid>
                  <Grid item xs={3}>
                    <Skeleton variant="text" width="60%" height={20} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Loader;
