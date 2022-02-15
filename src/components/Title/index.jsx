import React from "react";
import { Typography } from "@mui/material";

const Title = ({ title }) => {
  return (
    <>
      <Typography variant="subtitle1" color="text.secondary" sx={{ my: 1, mx:1 }}>
        { title }
      </Typography>
    </>
  );
};

export default Title;
