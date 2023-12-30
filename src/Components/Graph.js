import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "../Context/ThemeContext";
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Graph = ({graphData}) => {

  const {theme} = useTheme();


  return (
    <>
      <Line 
        data = {
          {
            labels: graphData.map(i=>i[0]), // for x axis
            datasets: [
              {
                data: graphData.map(i=>i[1]), //length should be same as x axis
                label: 'wpm',
                borderColor: theme.textColor,
              },
            ]
          }
        }
      />
    </>
  );
};

export default Graph;
