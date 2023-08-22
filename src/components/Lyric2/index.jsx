import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { LyricPlayer } from "@applemusic-like-lyrics/react";
import Lyric from "lyric-parser";

const Lyric2 = ({ lrc, currentTime }) => {
  const lyrics = new Lyric(lrc);
  console.log(lyrics.lines);

  return (
    <>
      {lrc ? (
        <LyricPlayer lyricLines={lyrics.lines} currentTime={currentTime} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Lyric2;
