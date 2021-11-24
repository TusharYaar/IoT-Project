import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firebaseDB } from "../firebase";
import AddDeviceForm from "./AddDeviceForm";
import ShowDeviceDetails from "./ShowDeviceDetails";

import { useAuth } from "../Context/MyContext";

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

const AddDevice = ({ open, handleCloseModel }) => {
  const { currentUser } = useAuth();
  const [details, setDetails] = useState({
    readAPIKey: "1LFJHJ3CX6JSKDFE",
    writeAPIKey: "1LFJHJ3CX6JSKDFE",
    channelId: "1575704",
  });
  const [status, setStatus] = useState("check");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleCheckDevice = async () => {
    try {
      setStatus("checking");
      setIsLoading(true);
      const response = await fetch(
        `https://api.thingspeak.com/channels/${details.channelId}/feeds.json?api_key=${details.readAPIKey}`
      );
      const { channel } = await response.json();
      if (channel.id) {
        delete channel.id;
        delete channel.updated_at;
        delete channel.last_entry_id;
        setDetails({ ...channel, ...details });
        setStatus("add device");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDevice = async () => {
    try {
      setIsLoading(true);
      await addDoc(collection(firebaseDB, "projects"), {
        ...details,
        uid: currentUser.uid,
        email: currentUser.email,
        projectCreatedAt: Timestamp.now(),
      });

      setIsLoading(false);
      setDetails({
        readAPIKey: "1LFJHJ3CX6JSKDFE",
        writeAPIKey: "1LFJHJ3CX6JSKDFE",
        channelId: "1575704",
      });
      handleCloseModel();
    } catch (error) {
      console.log(error);
      setStatus("error");
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add A device
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          You can add a device by adding its name, channelId and keys.
        </Typography>
        {status !== "add device" ? (
          <AddDeviceForm details={details} handleChange={handleChange} isLoading={isLoading} />
        ) : (
          <ShowDeviceDetails details={details} />
        )}
        <Button
          sx={{ mt: 2 }}
          color="secondary"
          variant="contained"
          aria-label="Add Device"
          fullWidth
          disabled={isLoading}
          onClick={status !== "add device" ? handleCheckDevice : handleAddDevice}>
          {status}
        </Button>
      </Box>
    </Modal>
  );
};

export default AddDevice;
