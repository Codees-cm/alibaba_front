import React from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";

const Barchart = ({ data, dataKey, xKey }) => {
  return (
    <ResponsiveContainer width={"80%"} height={350}>
      <BarGraph data={data}>
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} stroke="#888888" fontSize={12} />
        <YAxis tickLine={false} axisLine={false} stroke="#888888" fontSize={9} />
        <Tooltip />
        <Bar dataKey={dataKey} radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
};

export default Barchart;
