import React, { useState, useEffect } from "react";
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player";
import {
  Stack,
  Avatar,
  Typography,
  Icon,
  IconButton,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import SongList from "../../components/SongList";
import { useKeyPress } from "ahooks";
import pubsub from "pubsub-js";

const formatTime = (second) =>
  new Date(second * 1000).toISOString().substr(15, 4);

const AudioPlayer = ({
  src,
  songs,
  currentSong,
  changeSong,
  current,
  mode,
  toggleMode,
}) => {
  const [progress, setProgress] = useState(0);
  const [playlistDialog, setPlaylistDialog] = useState(false);
  const { togglePlayPause, play, ready, loading, playing, volume } =
    useAudioPlayer({
      src,
      format: "mp3",
      autoplay: true,
      preload: true,
      // html5: true,
      // pool: 1,
      // onload: () => console.log("加载了"),
      onplayerror: (_, err) => {
        console.log("播放失败:", err);
      },
      onloaderror: (_, err) => {
        console.log("加载失败:", err);
        changeSong(current + 1);
      },
      /* xhr: {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }, */
      // onplay: () => console.log("播放开始"),
      onend: () => {
        switch (mode) {
          case "repeat":
            play();
            break;
          case "random":
            changeSong(parseInt(Math.random() * songs.length - 1));
            break;
          default:
            changeSong(current + 1);
            break;
        }
      },
    });

  useKeyPress(["space"], () => {
    togglePlayPause();
  });
  useKeyPress(["leftarrow"], () => {
    changeSong(current - 1);
  });
  useKeyPress(["rightarrow"], () => {
    changeSong(current - 1);
  });

  const { percentComplete, duration, seek, position } = useAudioPosition({
    highRefreshRate: true,
  });
  const goToPosition = (_, percentage) => {
    seek(parseInt((duration * percentage) / 100) || 0);
  };

  useEffect(() => {
    pubsub.publish("CURRENT_TIME", position);
    setProgress(parseInt((position / duration) * 100) || 0);
  }, [position]);

  useEffect(() => {
    if (ready || loading) setProgress(0);
  }, [ready]);

  if (!ready && !loading) return <div>没有音频可播放</div>;

  return (
    <>
      <Stack
        direction="column"
        spacing={1.2}
        sx={{ width: 250 /* position: "absolute", top: 50 */ }}
      >
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
          <IconButton color="inherit" onClick={() => setPlaylistDialog(true)}>
            <Icon>queue_music</Icon>
          </IconButton>
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
          <IconButton color="inherit" onClick={() => toggleMode()}>
            {mode === "random" && <Icon>shuffle</Icon>}
            {mode === "repeat" && <Icon>repeat_one_outlined</Icon>}
            {mode === "order" && <Icon>sync_alt</Icon>}
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
      <Dialog
        onClose={() => setPlaylistDialog(false)}
        open={playlistDialog}
        scroll="paper"
      >
        <DialogTitle>播放列表</DialogTitle>
        <DialogContent dividers>
          <SongList songList={songs} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AudioPlayer;
