import React, { useCallback } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Lrc } from "@mebtte/react-lrc";

const Lyric = ({ lrc, currentTime }) => {
  const lineRenderer = useCallback(
    ({ lrcLine: { millisecond, content }, index, active }) => (
      <Typography
        variant={active ? "h5" : "subtitle1"}
        component="div"
        align="center"
        // sx={{ color: active ? "inherit" : "inherit" }}
        sx={{
          opacity: active ? 1 : 0.5,
          mb: 1,
        }}
      >
        {content}
      </Typography>
    )
  );
  const onCurrentLineChange = useCallback(
    ({ lrcLine, index }) => console.log(index, lrcLine),
    []
  );

  return (
    <>
      {lrc ? (
        <>
          <Box
            sx={{
              display: "flex",
              height: "80vh",
              overflowY: "scroll",
              // alignItems: "center",
              justifyContent: "center",
              /* position: "absolute",
              top: 50, */
            }}
          >
            <Lrc
              lrc={lrc}
              currentTime={currentTime * 1000}
              lineRenderer={lineRenderer}
              // onCurrentLineChange={onCurrentLineChange}
            />
            {/* <Stack direction="column" spacing={5}></Stack> */}
          </Box>
        </>
      ) : (
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
            <Typography variant="h6" component="div" align="center">
              暂无歌词
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default Lyric;
