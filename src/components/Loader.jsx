import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Typography,
  CardMedia,
  Stack,
  Button,
} from '@mui/material';
import SearchBar from './SearchBar';

const LoaderSkeletonCard = () => (
  <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2 ,width:"400px"}}>
      <Skeleton variant="rectangular" height={180} animation="wave" />
      <CardContent>
        <Skeleton variant="text" height={30} width="80%" />
        <Skeleton variant="text" width="60%" />
        <Stack direction="row" alignItems="center" spacing={1} mt={2}>
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" width="40%" />
        </Stack>
        <Skeleton variant="rectangular" height={40} sx={{ mt: 2 }} />
      </CardContent>
    </Card>
  </Grid>
);

const CourseCard = ({ course }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ borderRadius: 2, boxShadow: 3}}>
      <CardMedia component="img" height="180" image={course.thumbnail} alt={course.title} />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">{course.title}</Typography>
        <Typography variant="body2" color="text.secondary">{course.description}</Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={2}>
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            width={30}
            height={30}
            style={{ borderRadius: '50%' }}
          />
          <Typography variant="body2">{course.instructor.name}</Typography>
        </Stack>
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>View Course</Button>
      </CardContent>
    </Card>
  </Grid>
);

const sampleCourses = [
  {
    id: 1,
    title: 'React for Beginners',
    description: 'Start learning React from scratch!',
    thumbnail: 'https://source.unsplash.com/400x250/?react',
    instructor: {
      name: 'John React',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
  },
  {
    id: 2,
    title: 'Node.js API Masterclass',
    description: 'Build scalable backend APIs with Node.js.',
    thumbnail: 'https://source.unsplash.com/400x250/?nodejs',
    instructor: {
      name: 'Jane Backend',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  },
];

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(sampleCourses);
      setLoading(false);
    }, 2000); // simulate API call

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box p={3} sx={{ background: '#f4f6f8', minHeight: '100vh' }}>
      <Typography variant="h4" mb={4} textAlign="center" fontWeight="bold">
       <SearchBar/>
      </Typography>
      <Grid container spacing={3}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <LoaderSkeletonCard key={i} />)
          : courses.map((course) => <CourseCard key={course.id} course={course} />)
        }
      </Grid>
    </Box>
  );
};

export default Loader;
