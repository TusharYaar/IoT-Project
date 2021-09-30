import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../Context/MyContext";

const Sidebar = () => {
  const { logOut } = useAuth();
  return (
    <Drawer
      sx={{
        width: 70,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 70,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Box>
        <IconButton color="primary" aria-label="Logout user" onClick={logOut}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
