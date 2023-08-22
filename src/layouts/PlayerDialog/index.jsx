import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Icon,
  Fab,
  Fade,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import pubsub from "pubsub-js";
import { useRequest, useResponsive, useKeyPress } from "ahooks";
import { updateSetting } from "../../redux/actions/player";
import { getSongUrl, getSongLyric } from "../../api";
import AudioPlayer from "../../components/AudioPlayer";
import Lyric from "../../components/Lyric";
import Lyric2 from "../../components/Lyric2";

const PlayerDialog = ({ songs, current, src, updateSetting, lyric, mode }) => {
  const { md } = useResponsive();

  const [playerDialog, setPlayerDialog] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayerDialog = (open) => {
    setPlayerDialog(open);
  };

  const { runAsync: runGetSongUrl, refreshAsync: refreshGetSongUrl } =
    useRequest(() => getSongUrl(songs[current].id), { manual: true });

  const { runAsync: runGetSongLyric, refreshAsync: refreshGetSongLyric } =
    useRequest(() => getSongLyric(songs[current].id), { manual: true });

  useEffect(async () => {
    pubsub.subscribe("CURRENT_TIME", (msg, data) => {
      // console.log(msg, data);
      setCurrentTime(data);
      updateSetting({ currentTime: data });
    });
    const { data: songUrl } = await runGetSongUrl();
    const { lrc } = await runGetSongLyric();
    console.log(lyric);
    if (songUrl[0].url && lrc) {
      updateSetting({ src: songUrl[0]?.url, lyric: lrc.lyric });
    } else {
      changeSong(current + 1);
    }
  }, []);

  useEffect(async () => {
    const { data: songUrl } = await refreshGetSongUrl();
    const { lrc } = await refreshGetSongLyric();
    if (songUrl[0].url && lrc) {
      updateSetting({ src: songUrl[0]?.url, lyric: lrc.lyric });
    } else {
      changeSong(current + 1);
    }
  }, [songs, current]);

  useKeyPress("shift.a", () => {
    playerDialog ? setPlayerDialog(false) : setPlayerDialog(true);
  });

  const changeSong = (index) => {
    const songsCount = songs.length - 1;
    if (index === -1) {
      updateSetting({ current: songsCount });
    } else if (index > songsCount) {
      updateSetting({ current: 0 });
    } else {
      updateSetting({ current: index });
    }
  };

  const toggleMode = () => {
    let newMode;
    switch (mode) {
      case "order":
        newMode = "random";
        break;
      case "random":
        newMode = "repeat";
        break;
      case "repeat":
        newMode = "order";
        break;
    }
    updateSetting({ mode: newMode });
  };

  const fabStyle = {
    position: "fixed",
    bottom: 16,
    right: 16,
  };

  return (
    <>
      <Fab
        color="primary"
        onClick={() => togglePlayerDialog(true)}
        sx={fabStyle}
        variant={md ? "extended" : "circular"}
      >
        <Icon>headphones</Icon>
        {md ? (
          <Typography variant="body2" sx={{ ml: 1 }}>
            {`正在播放：${songs[current]?.name.substr(0, 8)}...`}
          </Typography>
        ) : null}
      </Fab>
      <Dialog
        fullScreen
        scroll="paper"
        keepMounted
        open={playerDialog}
        onClose={() => togglePlayerDialog(false)}
        TransitionComponent={Fade}
        sx={{ overflowY: "hidden" }}
      >
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            background: `url(${songs[current]?.al.picUrl})`,
            backgroundSize: "cover",
            filter: "blur(10px)",
            transition: "background 0.5s ease 0.5s",
          }}
        ></Paper>
        <AppBar
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            backdropFilter: "blur(10px) brightness(80%)",
          }}
        >
          <DialogContent sx={{ p: 0, m: 0 }}>
            <Toolbar sx={{}}>
              <Box
                sx={{
                  width: "100%",
                }}
              ></Box>

              <IconButton
                color="inherit"
                onClick={() => togglePlayerDialog(false)}
              >
                <Icon>close</Icon>
              </IconButton>
            </Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              // sx={{ position: "absolute" }}
            >
              <Grid
                xs={12}
                sm={6}
                // sx={{display:{ xs: "none", sm: "flex" } }}
                item
                container
                justifyContent="center"
                alignItems="center"
              >
                <AudioPlayer
                  // src={`http://music.163.com/song/media/outer/url?id=${songs[current]?.id}.mp3`}
                  src={src}
                  currentSong={songs[current]}
                  changeSong={changeSong}
                  current={current}
                  songs={songs}
                  mode={mode}
                  toggleMode={toggleMode}
                  setPlayerDialog={setPlayerDialog}
                />
              </Grid>
              <Grid
                xs={12}
                sm={6}
                item
                container
                justifyContent="center"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Lyric lrc={lyric} currentTime={currentTime} />
                {/* <Lyric2 lrc={lyric} currentTime={currentTime} /> */}
              </Grid>
            </Grid>
          </DialogContent>
        </AppBar>
      </Dialog>
    </>
  );
};

export default connect(
  ({
    player: {
      songs,
      setting: { current, src, lyric, mode },
    },
  }) => ({
    songs,
    current,
    src,
    lyric,
    mode,
  }),
  {
    updateSetting,
  }
)(PlayerDialog);
