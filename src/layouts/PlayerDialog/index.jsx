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
  getBottomNavigationUtilityClass,
} from "@mui/material";
import { useRequest, useResponsive } from "ahooks";
import { updateSetting } from "../../redux/actions/player";
import { getSongUrl } from "../../api";
import AudioPlayer from "../../components/AudioPlayer";
import Lyric from "../../components/Lyric";

const PlayerDialog = ({ songs, current, src, updateSetting }) => {
  const { md } = useResponsive();

  const [playerDialog, setPlayerDialog] = useState(false);
  const [songUrl, setSongUrl] = useState(null);

  const togglePlayerDialog = (open) => {
    setPlayerDialog(open);
  };

  const { loading, runAsync, refreshAsync } = useRequest(
    () => getSongUrl(songs[current].id),
    { manual: true }
  );

  useEffect(async () => {
    const { data } = await runAsync();
    setSongUrl(data[0]?.url);
  }, []);

  useEffect(async () => {
    const { data } = await refreshAsync();
    if (data[0].url) {
      setSongUrl(data[0]?.url);
      updateSetting({ src: data[0]?.url });
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
    // console.log(songs[current]);
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
          <Typography variant="body2" sx={{ml:1}}>
            {`正在播放：${songs[current].name.substr(0, 8)}...`}
          </Typography>
        ) : null}
      </Fab>
      <Dialog
        fullScreen
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
            filter: "blur(25px)",
          }}
        />
        <AppBar sx={{ backgroundColor: "transparent", boxShadow: 0 }}>
          <DialogContent sx={{ p: 0, m: 0 }}>
            <Toolbar sx={{ position: "relative" }}>
              <Typography
                sx={{ ml: 2, flex: 1 }}
                variant="h6"
                component="div"
              ></Typography>
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
              sx={{ position: "absolute" }}
            >
              <Grid xs={12} sm={6} item container justifyContent="center">
                <AudioPlayer
                  src={src}
                  currentSong={songs[current]}
                  changeSong={changeSong}
                  current={current}
                />
              </Grid>
              <Grid
                xs={12}
                sm={6}
                item
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Lyric />
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
      setting: { current, src },
    },
  }) => ({
    songs,
    current,
    src,
  }),
  {
    updateSetting,
  }
)(PlayerDialog);
