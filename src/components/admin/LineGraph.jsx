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

const LineChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
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
