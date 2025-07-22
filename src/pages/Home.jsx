import React from "react";
import { Box, Grid } from "@mui/material";
import Carousel from "../components/Crousal";
import Courses from "../components/Courses";
import SearchBar from "../components/SearchBar";

function Home() {
  const sampleCourses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      thumbnail: "https://source.unsplash.com/400x250/?web,development",
      price: 4999,
      discountPrice: 2999,
      description: "Learn MERN stack from scratch and build real-world projects.",
      courselevel: "advance",
      instructor: { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
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

      <Box   minHeight="100vh">
        <SearchBar />

        <Box sx={{width:"100%" , display:"flex" , justifyContent:"center", alignItems:"center"}}>

           <Grid container spacing={2}>
          {sampleCourses.map((course) => (
            <Courses key={course.id} course={course} />
          ))}
        </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
