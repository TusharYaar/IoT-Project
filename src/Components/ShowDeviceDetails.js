import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

const ShowDeviceDetails = ({ details }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {Object.keys(details).map((key, index) => {
        console.log(key, index, details[key]);
        return (
          <Typography key={index}>
            {key}: {details[key]}
          </Typography>
        );
      })}
    </Box>
  );
};

export default ShowDeviceDetails;
