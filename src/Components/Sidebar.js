import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../Context/MyContext";

const Sidebar = ({ handleOpenModel }) => {
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
      <Box sx={{ bgcolor: "background.default", pt: 3 }}>
        <Typography variant="h5" align="center">
          IoT-Project
        </Typography>
      </Box>
      <CssBaseline />
      <Toolbar />
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
            flexGrow: 1,
            flexDirection: "column",
            alignItems: "center",
          }}></Box>

        <Button color="primary" aria-label="Logout user" fullWidth onClick={logOut} endIcon={<LogoutIcon />}>
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
