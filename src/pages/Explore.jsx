import React, { useEffect } from 'react';
import { useExploreCoursesQuery } from '../store/api/courseApi';
import { Loader } from '../common/Loader';
import Courses from '../components/Courses';
import { Grid, Container } from '@mui/material';

function Explore() {
  const { data: allCourses, isLoading, refetch } = useExploreCoursesQuery(undefined, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        px: { xs: 2, sm: 3, md: 4 }, // responsive horizontal padding for small screens
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
       <Grid container spacing={2} justifyContent="center">
  {allCourses?.course?.map((cour) => (
    <Grid
      item
      key={cour._id}
      xs={12}
      sm={6}
      md={4}
      lg={3}
    >
      <Courses course={cour} />
    </Grid>
  ))}
</Grid>

      )}
    </Container>
  );
}

export default Explore;
