import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Icon,
  Fab,
  Zoom,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Paper,
  Grid,
  Avatar,
  Container,
  Stack,
  Slider,
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import pubsub from "pubsub-js";
import { useRequest, useResponsive } from "ahooks";
import { updateSetting } from "../../redux/actions/player";
import { getSongUrl, getSongLyric } from "../../api";
import AudioPlayer from "../../components/AudioPlayer";
import Lyric from "../../components/Lyric";

const PlayerDialog = ({ songs, current, src, updateSetting, lyric }) => {
  const { md } = useResponsive();

  const [value, setValue] = React.useState("player");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
  }, [current]);

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
            {`正在播放：${songs[current].name.substr(0, 8)}...`}
          </Typography>
        ) : null}
      </Fab>
      <Dialog
        fullScreen
        scroll="paper"
        keepMounted
        open={playerDialog}
        onClose={() => togglePlayerDialog(false)}
        TransitionComponent={Zoom}
        sx={{ overflowY: "hidden" }}
      >
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            background: `url(${songs[current]?.al.picUrl})`,
            filter: "blur(60px) brightness(60%)",
            height: 1000,
          }}
        />
        <AppBar sx={{ backgroundColor: "transparent", boxShadow: 0 }}>
          <DialogContent sx={{ p: 0, m: 0 }}>
            <TabContext value={value}>
              <Toolbar sx={{}}>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    // variant="fullWidth"
                    textColor="inherit"
                    indicatorColor="inherit"
                    centered
                  >
                    <Tab label="播放器" value="player" />
                    <Tab label="歌词" value="lyric" />
                  </TabList>
                </Box>

                <IconButton
                  color="inherit"
                  onClick={() => togglePlayerDialog(false)}
                >
                  <Icon>close</Icon>
                </IconButton>
              </Toolbar>
              <Box>
                {/* <TabList onChange={handleChange} centered>
                  <Tab label="播放器" value="player" />
                  <Tab label="歌词" value="lyric" />
                </TabList> */}
              </Box>
              <TabPanel value="player">
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  // sx={{ position: "absolute" }}
                >
                  <Grid item>
                    <AudioPlayer
                      // src={`https://music.163.com/song/media/outer/url?id=${songs[current].id}.mp3`}
                      src={src}
                      currentSong={songs[current]}
                      changeSong={changeSong}
                      current={current}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="lyric">
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  // sx={{ position: "absolute" }}
                >
                  <Grid item>
                    <Lyric lrc={lyric} currentTime={currentTime} />
                  </Grid>
                </Grid>
              </TabPanel>
            </TabContext>
            {/* <Grid
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
                  // src={`https://music.163.com/song/media/outer/url?id=${songs[current].id}.mp3`}
                  src={src}
                  currentSong={songs[current]}
                  changeSong={changeSong}
                  current={current}
                />
              </Grid>
              <Grid
                xs={8}
                sm={6}
                item
                container
                justifyContent="center"
                // sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Lyric lrc={lyric} currentTime={currentTime} />
              </Grid>
            </Grid> */}
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
      setting: { current, src, lyric },
    },
  }) => ({
    songs,
    current,
    src,
    lyric,
  }),
  {
    updateSetting,
  }
)(PlayerDialog);
