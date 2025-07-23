import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  Link
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "React Mastery",
    price: 999,
    thumbnail: "https://via.placeholder.com/400x200",
  },
  {
    id: 2,
    title: "Full Stack Development",
    price: 1499,
    thumbnail: "https://via.placeholder.com/400x200",
  },
  {
    id: 3,
    title: "JavaScript Essentials",
    price: 799,
    thumbnail: "https://via.placeholder.com/400x200",
  },
];

const ManageCourse = () => {
  return (
    <Box
      sx={{
        px: 2,
        py: 4,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        rowGap: 4,
      }}
    >
      {/* Heading */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Link
          href="#"
          underline="none" // disables underline
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#1976d2",
            "&:hover": {
              color: "#1565c0",
              textDecoration: "none", // ensures no underline on hover
            },
          }}
        >
          Go Lectures
        </Link>
      </Box>

      {/* Course List */}
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                bgcolor: "#1e1e1e",
                color: "white",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={course.thumbnail}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body1" color="gray">
                  ₹{course.price}
                </Typography>
              </CardContent>
              <Stack direction="row" spacing={1} sx={{ p: 2 }}>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={`${course.id}`} // make sure this route exists in your router
                  sx={{
                    color: "white",
                    borderColor: "white",
                    flex: 1,
                    "&:hover": { borderColor: "#ccc" },
                  }}
                >
                  Edit
                </Button>

                <Button variant="contained" color="success" sx={{ flex: 1 }}>
                  Published
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ManageCourse;
