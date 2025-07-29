import React, { useEffect, useState } from "react";
import { Box, darkScrollbar, Grid, Typography } from "@mui/material";
import Carousel from "../components/Crousal";
import Courses from "../components/Courses";
import SearchBar from "../components/SearchBar";
import { useGetAllCoursesQuery } from "../store/api/courseApi";

function Home() {
  const [courses,setCourses] = useState();
  const { data: course } = useGetAllCoursesQuery();
  useEffect(()=>{
    setCourses(course)
  },[course])

  return (
    <div style={{ backgroundColor: "white" }}>
      <Carousel />
      <Box minHeight="100vh">
        {/* Search */}
        <SearchBar setCourses={setCourses}/>

        {/* Courses Grid */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ px: { xs: 2, md: 4 }, py: 4 }}
        >
          {
          courses?.message?.length==0 ? <Typography variant="h4" marginTop={15} fontWeight={"bold"}>No Course Publis Yet</Typography> :
          courses?.message?.map((course) => (
            <Courses key={course._id} course={course} />
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
