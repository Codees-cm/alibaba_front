'use client'
import React from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
} from "recharts";


export default function Barchart(data) {
  // console.log(data?.data)
  return (
    <ResponsiveContainer width={"80%"} height={350}>
      <BarGraph data={data?.data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={9}
          tickFormatter={(value) => `XAF${value}`}
        />
        <Bar dataKey={"total"} radius={[4,4,0,0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
}
