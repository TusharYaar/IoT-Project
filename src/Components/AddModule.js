import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

const MODULES = [
  {
    id: 1,
    name: "Distance Weight",
    value: "distance_weight",
  },
];

const AddModule = ({ open, onClose, project, addNewModule }) => {
  if (!project.modules)
    project = {
      ...project,
      modules: [],
    };
  const availableModules = MODULES.filter((m) => !project.modules.find((p) => p === m.value));
  const [module, setModule] = useState(availableModules.length > 0 ? availableModules[0].value : "distance_weight");

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" align="center">
          Add Module
        </Typography>
        <Box sx={{ width: "100%", p: 3 }}>
          {availableModules.length === 0 && (
            <Typography variant="body2" align="center">
              No more modules available
            </Typography>
          )}
          {availableModules.length > 0 && (
            <Select value={module} label="Select Module" onChange={(e) => setModule(e.target.value)}>
              {availableModules.map((m) => (
                <MenuItem key={m.id} value={m.value}>
                  {m.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>
        <Button onClick={() => {}} variant="contained" disabled={availableModules.length === 0}>
          Add Module
        </Button>
      </Box>
    </Modal>
  );
};

export default AddModule;
