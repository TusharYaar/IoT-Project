import Box from "@mui/material/Box";
import { CssBaseline, Typography } from "@mui/material";

import Sidebar from "../Components/Sidebar";
const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      ></Box>
    </Box>
  );
};

export default Dashboard;
