import React from "react";
import { Box, darkScrollbar, Grid } from "@mui/material";
import Carousel from "../components/Crousal";
import Courses from "../components/Courses";
import SearchBar from "../components/SearchBar";
import { useGetAllCoursesQuery } from "../store/api/courseApi";

function Home() {
  const { data: courses } = useGetAllCoursesQuery();
  console.log(courses);
  const sampleCourses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      thumbnail: "https://source.unsplash.com/400x250/?web,development",
      price: 4999,
      discountPrice: 2999,
      description:
        "Learn MERN stack from scratch and build real-world projects.",
      courselevel: "advance",
      instructor: {
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: 2,
      title: "Data Science with Python",
      thumbnail: "https://source.unsplash.com/400x250/?data,python",
      price: 3999,
      discountPrice: 1999,
      description: "Master data analysis, visualization, and machine learning.",
      courselevel: "advance",
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
      courselevel: "medium",
      description: "Design stunning interfaces and learn Figma & Adobe XD.",
      instructor: {
        name: "Emma Johnson",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    },
  ];

  return (
    <div style={{ backgroundColor: "white" }}>
      <Carousel />
      <Box minHeight="100vh">
        {/* Search */}
        <SearchBar />

        {/* Courses Grid */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ px: { xs: 2, md: 4 }, py: 4 }}
        >
          {courses?.message?.map((course) => (
            <Courses key={course._id} course={course} />
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
