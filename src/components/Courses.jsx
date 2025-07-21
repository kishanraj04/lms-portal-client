import React, { useState } from "react";
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
  Avatar,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const sampleCourses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    thumbnail: "https://source.unsplash.com/400x250/?web,development",
    price: 4999,
    discountPrice: 2999,
    description: "Learn MERN stack from scratch and build real-world projects.",
    instructor: { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
  },
  {
    id: 2,
    title: "Data Science with Python",
    thumbnail: "https://source.unsplash.com/400x250/?data,python",
    price: 3999,
    discountPrice: 1999,
    description: "Master data analysis, visualization, and machine learning.",
    instructor: {
      name: "Alice Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  },
  {
    id: 3,
    title: "UI/UX Design Bootcamp",
    thumbnail: "https://source.unsplash.com/400x250/?design,uiux",
    price: 2999,
    discountPrice: 1499,
    description: "Design stunning interfaces and learn Figma & Adobe XD.",
    instructor: {
      name: "Emma Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  },
];

const Courses = () => {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => setSearchTerm(query);

  const filteredCourses = sampleCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={3} bgcolor="#f5f5f5" minHeight="100vh">
      {/* Search Section */}
      <Box
        mb={4}
        display="flex"
        gap={2}
        flexDirection={{  sm: "row"}}
        alignItems="center"
        sx={{display:"flex" , justifyContent:"center" , alignItems:"center"}}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              paddingRight: "0px",
            },
            width:"70%",
            overflow:"auto",
            outline:"none"
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          sx={{
            borderRadius: "25px",
            padding: "10px 25px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Search
        </Button>
      </Box>

      {/* Courses Grid */}
      <Grid container spacing={2}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="180"
                image={course.thumbnail}
                alt={course.title}
              />
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {course.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {course.description}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                  <Typography variant="subtitle1" color="primary">
                    ₹{course.discountPrice}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ₹{course.price}
                  </Typography>
                  <Chip
                    label={`Save ₹${course.price - course.discountPrice}`}
                    size="small"
                    color="success"
                  />
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                  <Avatar
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    sx={{ width: 28, height: 28 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {course.instructor.name}
                  </Typography>
                </Stack>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  Buy Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {filteredCourses.length === 0 && (
          <Typography variant="body1" sx={{ mx: "auto", mt: 10 }}>
            No courses found for "{searchTerm}"
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Courses;
