import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ data, dataKey, xKey }) => {
  return (
    <ResponsiveContainer width="80%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
