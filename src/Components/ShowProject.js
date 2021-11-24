import { useEffect, useState, useCallback } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import ShowGraphs from "../Components/ShowGraphs";
import DeleteModal from "./DeleteModal";

const ShowProject = ({ project, deleteProject }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feeds, setFeeds] = useState([]);
  const [error, setError] = useState("");
  const [deleteModel, setDeleteModel] = useState(false);

  const fetchFeeds = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(
        `https://api.thingspeak.com/channels/${project.channelId}/feeds.json?api_key=${project.readAPIKey}`
      );
      const { feeds } = await response.json();
      setFeeds(feeds);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [project]);

  useEffect(() => {
    if (project) {
      fetchFeeds();
    }
  }, [fetchFeeds, project]);

  const handleDelete = () => {
    setDeleteModel(true);
  };
  const closeDeleteModal = () => {
    setDeleteModel(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <DeleteModal
        open={deleteModel}
        onClose={closeDeleteModal}
        id={project.id}
        name={project.name}
        deleteProject={deleteProject}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
        <Box sx={{ justifyContent: "space-between", flexDirection: "column", display: "inline-flex" }}>
          <Typography variant="h5" component="span">
            {project.name}
          </Typography>
          <Typography variant="caption" component="span">
            {project.channelId}
          </Typography>
        </Box>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </Box>
      <Divider />
      <Box sx={{ width: "100%", p: 3 }}>
        {isLoading && <LinearProgress />}
        {error && <Typography variant="caption">{error}</Typography>}
        {!isLoading && feeds.length === 0 && (
          <Typography variant="h4" align="center">
            No feeds found, please use the sensor for some time
          </Typography>
        )}
        {!isLoading && feeds.length > 0 && <ShowGraphs feeds={feeds} channel={project} fetchFeeds={fetchFeeds} />}
      </Box>
    </Box>
  );
};

export default ShowProject;
