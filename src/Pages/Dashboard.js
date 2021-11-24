import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Typography from "@mui/material/Typography";
import Sidebar from "../Components/Sidebar";

import { collection, query, where, getDocs } from "firebase/firestore";
import { firebaseDB } from "../firebase";

import { useAuth } from "../Context/MyContext";

import AddDevice from "../Components/AddDevice";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModel = () => {
    setOpenModal(true);
  };
  const handleCloseModel = () => {
    setOpenModal(false);
  };

  const getProjects = useCallback(async () => {
    if (currentUser.uid) {
      const q = query(collection(firebaseDB, "projects"), where("createdBy", "==", currentUser.uid));
      const projects = await getDocs(q);
      console.log(projects);
    }
  }, [currentUser.uid]);

  useEffect(() => {
    if (currentUser.uid) {
      getProjects();
    }
  }, [currentUser, getProjects]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AddDevice open={openModal} handleCloseModel={handleCloseModel} />
      <Sidebar handleOpenModel={handleOpenModel} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        <Typography variant="caption" component="span">
          Logged in as:
        </Typography>

        <Typography variant="subtitle2">{currentUser.uid}</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
