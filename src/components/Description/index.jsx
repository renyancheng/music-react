import React from "react";
import { Typography } from "@mui/material";

const Description = ({ name, value }) => {
  return (
    <>
      <Typography variant="body2" color="text.secondary" component="div">
        {name}：{value}
      </Typography>
    </>
  );
};

export default Description;
