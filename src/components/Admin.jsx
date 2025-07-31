import React from "react";
import { Box } from "@mui/material";
import MyPieChart from "./admin/PiChart";
import LineChartComponent from "./admin/LineGraph";
import { useCourseWithEnrolledStudentQuery, useGetMonthRevenueQuery, useInstructorCourseWithPriceQuery } from "../store/api/lectureprogressApi";

function Admin() {
  const {data:courseWithPrice} = useInstructorCourseWithPriceQuery()
  const {data:courseWithEnrolledStudent} = useCourseWithEnrolledStudentQuery()
  const {data:monthRevenue} = useGetMonthRevenueQuery()
  // const courses = [
  //   { name: "JavaScript", value: "400" },
  //   { name: "React", value: "300" },
  //   { name: "Node.js", value: "300" },
  //   { name: "MongoDB", value: "200" },
  // ];
 

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, width: "100%", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          flexWrap: "wrap",
          width: "100%",
          boxShadow: 10,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "80%", md: "40%", overflow: "hidden" },
            minHeight: 300,
            minWidth: 250,
          }}
        >
          <MyPieChart data={courseWithPrice?.courseWithPrice} />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", sm: "80%", md: "40%", overflow: "hidden" },
            minHeight: 300,
            minWidth: 250,
          }}
        >
          <MyPieChart data={courseWithEnrolledStudent?.courseWithEnrolledStudents} />
        </Box>
      </Box>

      <Box sx={{p: 2, borderRadius: 2,boxShadow:10 }}>
        <LineChartComponent data={monthRevenue?.data} />
      </Box>
    </Box>
  );
}

export default Admin;
