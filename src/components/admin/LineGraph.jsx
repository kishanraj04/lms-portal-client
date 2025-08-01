import { Typography } from '@mui/material';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const LineChartComponent = ({ data,title }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      {/* <Typography>{title}</Typography> */}
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="#ccc" />
        <YAxis stroke="#ccc" domain={[0, 'dataMax + 50']} />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#00FFAA" strokeWidth={2} dot />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
