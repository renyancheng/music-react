import React, { useState } from "react";
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
} from "@mui/material";

const PlayerDialog = () => {
  const [playerDialog, setPlayerDialog] = useState(false);

  const [progress, setProgress] = useState(0);

  const togglePlayerDialog = (open) => {
    setPlayerDialog(open);
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
      >
        <Icon>headphones</Icon>
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
            background:
              "url(https://p1.music.126.net/1H9HvH70JhtOguk3EmPLhw==/109951165825967731.jpg)",
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
              sx={{ position: "absolute"}}
            >
              <Grid xs={12} sm={6} item container justifyContent="center">
                <Stack direction="column" spacing={1.2}>
                  <Avatar
                    src="https://p1.music.126.net/1H9HvH70JhtOguk3EmPLhw==/109951165825967731.jpg"
                    sx={{
                      height: 250,
                      width: 250,
                      borderRadius: 3,
                      boxShadow: 1,
                    }}
                  />
                  <Typography variant="body1" component="div" align="center">
                    歌曲名
                  </Typography>
                  <Typography variant="body2" component="div" align="center">
                    歌手
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton color="inherit">
                      <Icon>skip_previous</Icon>
                    </IconButton>
                    <IconButton color="inherit" size="large">
                      <Icon fontSize="large">play_arrow</Icon>
                    </IconButton>
                    <IconButton color="inherit">
                      <Icon>skip_next</Icon>
                    </IconButton>
                  </Stack>
                  <Stack spacing={2} direction="row" alignItems="center">
                    <Typography variant="body1" component="div" align="center">
                      0:00
                    </Typography>
                    <Slider
                      value={progress}
                      onChange={(_, newProgress) => setProgress(newProgress)}
                      size="small"
                    />
                    <Typography variant="body1" component="div" align="center">
                      3:34
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid
                xs={12}
                sm={6}
                item
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Box sx={{ height: "80vh", overflowY: "scroll" }}>
                  <Stack direction="column" spacing={1}>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词1
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                    <Typography variant="h6" component="div" align="center">
                      歌词
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        </AppBar>
      </Dialog>
    </>
  );
};

export default PlayerDialog;
