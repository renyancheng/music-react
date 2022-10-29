import React from "react";
import { Typography } from "@mui/material";

const Title = ({ title }) => {
  return (
    <>
      <Typography variant="h5" sx={{ my: 2 }}>
        {title}
      </Typography>
    </>
  );
};

export default Title;
