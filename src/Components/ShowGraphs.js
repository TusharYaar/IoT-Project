import { useState, useEffect, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const FIELDS = ["field1", "field2", "field3", "field4", "field5", "field6", "field7", "field8"];

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ShowGraphs = ({ feeds, channel }) => {
  const [data, setData] = useState([]);

  const makeData = useCallback(() => {
    let allGraphsArray = [];
    FIELDS.forEach((field) => {
      if (channel[field]) {
        let graphData = {
          data: {
            labels: [],
            datasets: [
              {
                label: channel[field],
                data: [],
              },
            ],
          },
          options: {
            responsive: true,
            text: channel[field],
          },
        };
        feeds.forEach((feed) => {
          graphData.data.labels.push(feed.created_at);
          graphData.data.datasets[0].data.push(feed[field]);
        });
        allGraphsArray.push(graphData);
      }
    });
    setData(allGraphsArray);
    console.log(allGraphsArray);
  }, [feeds, channel]);

  useEffect(() => {
    makeData();
  }, [makeData]);

  return (
    <Box>
      {data.map((graph, index) => {
        return (
          <Paper>
            <Line key={index} data={graph.data} options={graph.options} />;
          </Paper>
        );
      })}
    </Box>
  );
};

export default ShowGraphs;
