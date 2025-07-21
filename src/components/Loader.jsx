import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Chip,
  Stack,
  Skeleton,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const sampleCourses = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    thumbnail: 'https://source.unsplash.com/400x250/?web,development',
    price: 4999,
    discountPrice: 2999,
    description: 'Learn MERN stack from scratch and build real-world projects.',
    instructor: {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  },
  {
    id: 2,
    title: 'Data Science with Python',
    thumbnail: 'https://source.unsplash.com/400x250/?data,python',
    price: 3999,
    discountPrice: 1999,
    description: 'Master data analysis, visualization, and machine learning.',
    instructor: {
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
  },
];

const Loader = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setCourses(sampleCourses);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(query.toLowerCase())
  );

  const renderSkeleton = () => (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ p: 2 }}>
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="text" height={30} sx={{ mt: 2 }} />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="circular" width={40} height={40} sx={{ mt: 1 }} />
        <Skeleton variant="rectangular" height={40} sx={{ mt: 2 }} />
      </Card>
    </Grid>
  );

  return (
    <Box p={2} sx={{ background: '#f7f7f7', minHeight: '100vh' }}>
      <Box
        mb={4}
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
      >
        <TextField
          variant="outlined"
          placeholder="Search courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: '100%',
            maxWidth: 500,
            backgroundColor: '#fff',
            borderRadius: '25px',
            boxShadow: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
            },
          }}
        />
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {loading
          ? Array.from(new Array(6)).map((_, i) => <React.Fragment key={i}>{renderSkeleton()}</React.Fragment>)
          : filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <Card sx={{ width: '100%', maxWidth: 360, mx: 'auto', boxShadow: 4 }}>
                    <CardMedia component="img" height="180" image={course.thumbnail} alt={course.title} />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {course.description}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                        <Typography variant="h6" color="primary">₹{course.discountPrice}</Typography>
                        <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
                          ₹{course.price}
                        </Typography>
                        <Chip label={`Save ₹${course.price - course.discountPrice}`} size="small" color="success" />
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                        <img src={course.instructor.avatar} alt={course.instructor.name} width={30} height={30} style={{ borderRadius: '50%' }} />
                        <Typography variant="body2">{course.instructor.name}</Typography>
                      </Stack>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth variant="contained">Buy Now</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" sx={{ mx: 'auto', mt: 10 }}>
                No courses found for "{query}"
              </Typography>
            )}
      </Grid>
    </Box>
  );
};

export default Loader;
