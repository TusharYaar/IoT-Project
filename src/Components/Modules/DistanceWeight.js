import { useState, useEffect } from "react";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

import { parseJSON, format } from "date-fns";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const FIELDS = ["field1", "field2", "field3", "field4", "field5", "field6", "field7", "field8"];
const labels = ["NoOne", "Bought", "Seen", "Rejected"];
const BAR_COLORS = [
  "#0288D1",
  "#880E4F",
  "#1A237E",
  "#00796B",
  "#546E7A",
  "#689F38",
  "#0D47A1",
  "#303F9F",
  "#ff6f00",
  "#616161",
];
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "User Bought Rate",
    },
  },
};

const pieOptions = {
  backgroundColor: [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
  ],
  borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
  borderWidth: 1,
};

const DistanceWeight = ({ channel, feeds }) => {
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let dates = [];
    let charDataTemp = [];
    let pieDataTemp = [];
    FIELDS.forEach((field) => {
      if (!channel[field]) return;
      feeds.forEach((feed) => {
        let date = format(parseJSON(feed.created_at), "dd/MM/yyyy");
        let index = dates.indexOf(date);
        if (index === -1) {
          index = dates.length + 1;
          dates.push(date);
          charDataTemp.push({
            label: date,
            backgroundColor: BAR_COLORS[index % BAR_COLORS.length],
            data: [0, 0, 0, 0],
            distance: [],
            weight: [],
          });
          pieDataTemp.push({
            label: date,
            ...pieOptions,
          });
        }
      });
      if (channel[field].toLowerCase() === "distance") {
        feeds.forEach((feed) => {
          let date = format(parseJSON(feed.created_at), "dd/MM/yyyy");
          let index = dates.indexOf(date);
          charDataTemp[index].distance.push(feed[field]);
        });
      }
      if (channel[field].toLowerCase() === "weight") {
        feeds.forEach((feed) => {
          let date = format(parseJSON(feed.created_at), "dd/MM/yyyy");
          let index = dates.indexOf(date);
          charDataTemp[index].weight.push(feed[field]);
        });
      }
    });
    charDataTemp.forEach((data, index) => {
      for (var i = 1; i < data.distance.length; i++) {
        if (data.distance[i] === data.distance[i - 1] && data.weight[i] === data.weight[i - 1]) data.data[0]++;
        else if (data.distance[i] === data.distance[i - 1] && data.weight[i] < data.weight[i - 1]) data.data[1]++;
        else if (data.distance[i] === data.distance[i - 1] && data.weight[i] > data.weight[i - 1]) data.data[3]++;
        else if (data.weight[i] < data.weight[i - 1]) data.data[1]++;
        else if (data.weight[i] === data.weight[i - 1]) data.data[2]++;
        else if (data.weight[i] > data.weight[i - 1]) data.data[3]++;
      }
      pieDataTemp[index].data = data.data;
    });
    setChartData(charDataTemp);
    setPieData(pieDataTemp);
    setIsLoading(false);
  }, [channel, feeds]);

  if (isLoading) return <h3>Loading</h3>;
  return (
    <Box>
      <Paper>
        <Bar
          options={options}
          data={{
            labels: labels,
            datasets: chartData,
          }}
        />
      </Paper>
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}>
        {pieData.map((data, index) => (
          <Paper key={index} elevation={2} sx={{ my: 2, p: 2, width: "30%" }}>
            <Pie
              data={{
                labels: labels,
                datasets: [data],
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default DistanceWeight;
