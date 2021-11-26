import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../Context/MyContext";

const Sidebar = ({ handleOpenModel, projects, changeActiveProject }) => {
  const { logOut } = useAuth();

  return (
    <Drawer
      sx={{
        width: 170,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: 170,
          p: 1,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left">
      <CssBaseline />
      <Toolbar />
      <Box sx={{ bgcolor: "background.default", mb: 3 }}>
        <Typography variant="h5" align="center">
          IoT-Project
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Button color="secondary" variant="contained" aria-label="Add Device" fullWidth onClick={handleOpenModel}>
          Add Device
        </Button>
        <Box
          sx={{
            display: "flex",
            mt: 4,
            flexGrow: 1,
            flexDirection: "column",
            alignItems: "center",
            overflow: "auto",
          }}>
          <Typography variant="h6" align="center" sx={{ mb: 1 }}>
            Your Projects
          </Typography>
          {projects.map((project) => (
            <Button key={project.id} size="small" onClick={() => changeActiveProject(project.id)}>
              {project.name}
            </Button>
          ))}
        </Box>

        <Button color="primary" aria-label="Logout user" fullWidth onClick={logOut} endIcon={<LogoutIcon />}>
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
