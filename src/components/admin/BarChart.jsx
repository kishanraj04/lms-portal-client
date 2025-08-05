import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";



const BarCharts = ({data}) => {
  console.log("data ",data);
  return (
    <div style={{ width: "100%", height: 450 }}>
      {/* <h2 style={{ textAlign: "center" }}>Course Enrollments</h2> */}
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-20} textAnchor="end" interval={0} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" name="Enrolled Students" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;
