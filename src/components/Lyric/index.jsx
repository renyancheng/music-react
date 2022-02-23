/* import React from "react";
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
 */
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
          opacity: active ? 1 : 0.5
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
            }}
          >
            <Stack direction="column" spacing={5}>
              <Lrc
                lrc={lrc}
                currentTime={currentTime * 1000}
                lineRenderer={lineRenderer}
                // onCurrentLineChange={onCurrentLineChange}
              />
            </Stack>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              height: "80vh",
              overflowY: "scroll",
              // alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              align="center"
            >
              暂无歌词
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default Lyric;
