import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const Lyric = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "80vh",
          overflowY: "scroll",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack direction="column" spacing={1}>
          <Typography variant="h6" component="div">
            歌词
          </Typography>
          <Typography variant="h6" component="div">
            歌词
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default Lyric;
