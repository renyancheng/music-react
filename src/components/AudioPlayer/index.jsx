import React, { useState, useEffect } from "react";
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player";
import {
  Stack,
  Avatar,
  Typography,
  Icon,
  IconButton,
  Slider,
} from "@mui/material";

const formatTime = (second) =>
  new Date(second * 1000).toISOString().substr(15, 4);

const AudioPlayer = ({ src, currentSong, changeSong, current }) => {
  const [progress, setProgress] = useState(0);
  const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
    src,
    format: "mp3",
    autoplay: true,
    pool: 1,
    // onload: () => console.log("加载中。。。"),
    // onloaderror: () => console.log("加载失败"),
    // onplay: () => console.log("播放开始"),
    onend: () => changeSong(current + 1),
  });

  const { percentComplete, duration, seek, position } = useAudioPosition({
    highRefreshRate: true,
  });
  const goToPosition = (_, percentage) => {
    seek(parseInt((duration * percentage) / 100));
  };

  useEffect(() => {
    setProgress(parseInt((position / duration) * 100));
  }, [position]);

  useEffect(() => {
    if (ready || loading) setProgress(0);
  }, [ready]);

  if (!ready && !loading) return <div>没有音频可播放</div>;

  return (
    <>
      <Stack direction="column" spacing={1.2} sx={{ width: 250 }}>
        <Avatar
          src={currentSong.al.picUrl}
          sx={{
            height: 250,
            width: 250,
            borderRadius: 3,
            boxShadow: 1,
          }}
        />
        <Typography variant="body1" component="div" align="center">
          {currentSong.name}
        </Typography>
        <Typography variant="body2" component="div" align="center">
          {currentSong.ar
            .map((ar) => {
              return ar.name;
            })
            .join("/")}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <IconButton color="inherit" onClick={() => changeSong(current - 1)}>
            <Icon>skip_previous</Icon>
          </IconButton>
          <IconButton
            color="inherit"
            size="large"
            onClick={togglePlayPause}
            disabled={loading}
          >
            <Icon fontSize="large">{playing ? "pause" : "play_arrow"}</Icon>
          </IconButton>
          <IconButton color="inherit" onClick={() => changeSong(current + 1)}>
            <Icon>skip_next</Icon>
          </IconButton>
        </Stack>
        <Stack spacing={2} direction="row" alignItems="center">
          <Typography variant="body1" component="div" align="center">
            {formatTime(position)}
          </Typography>
          <Slider
            value={progress}
            onChange={(_, newProgress) => setProgress(newProgress)}
            onChangeCommitted={goToPosition}
            color="secondary"
            size="small"
          />
          <Typography variant="body1" component="div" align="center">
            {formatTime(duration)}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default AudioPlayer;
