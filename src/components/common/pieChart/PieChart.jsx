import React from "react";
import { Chart } from "react-google-charts";

const PieChart = ({ pieOptions, pieData, pieStyle }) => {
  return (
    <Chart
      chartType="PieChart"
      data={pieData}
      options={pieOptions}
      width={pieStyle.width}
      height={pieStyle.height}
    />
  );
};

export default React.memo(PieChart);
