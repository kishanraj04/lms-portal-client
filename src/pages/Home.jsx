import React from "react";
import { Box, darkScrollbar, Grid } from "@mui/material";
import Carousel from "../components/Crousal";
import Courses from "../components/Courses";
import SearchBar from "../components/SearchBar";
import { useGetAllCoursesQuery } from "../store/api/courseApi";

function Home() {
  const { data: courses } = useGetAllCoursesQuery();
 

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
