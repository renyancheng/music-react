import React from "react";
import { connect } from "react-redux";
import {
  Box,
  Grid,
  Skeleton,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  CardActionArea,
  Button,
  Icon,
  IconButton,
  Tooltip,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShareIcon from "@mui/icons-material/Share";
import { blue } from "@mui/material/colors";
import { useRequest } from "ahooks";
import {
  getPersonalizedPlaylist,
  getRecommendSongs,
  getRecommendPlaylist,
} from "../../api";
import { getRandomArrayElements } from "../../utils";
import PlaylistList from "../../components/Playlist/List";
import SongList from "../../components/SongList";
import Title from "../../components/Title";
import { updateSetting, addSongs } from "../../redux/actions/player";

export const Home = ({ isLogin, songs, updateSetting, addSongs }) => {
  const [dailySongs, setDailySongs] = React.useState(null);

  const { data: playlistList, loading: loadingPlaylistList } = useRequest(
    () => (isLogin ? getRecommendPlaylist() : getPersonalizedPlaylist(24)),
    { refreshDeps: [isLogin] }
  );

  const {
    data: recommendSongs,
    loading: loadingRecommendSongs,
    refresh: refreshRecommandSongs,
  } = useRequest(getRecommendSongs, {
    refreshDeps: [isLogin],
    onSuccess: (data) => {
      setDailySongs(
        getRandomArrayElements(recommendSongs?.data?.dailySongs, 4)
      );
    },
  });

  const refreshDailySongs = () => {
    setDailySongs(getRandomArrayElements(recommendSongs?.data?.dailySongs, 4));
  };

  const addOneSong = (song) => {
    addSongs({
      songs: [song],
    });
    updateSetting({
      current: 0,
    });
  };

  return (
    <>
      {isLogin && (
        <>
          <Title title="每日推荐" />
          {!recommendSongs ? (
            <>
              <Card
                sx={{
                  mb: 1,
                }}
              >
                <Skeleton variant="rectangular" height={150} />
              </Card>
            </>
          ) : (
            <>
              <Grid container spacing={2}>
                {dailySongs?.map((song) => (
                  <Grid item xs={12} md={6} key={song.id}>
                    <Card
                      sx={{
                        display: "flex",
                        my: 1,
                        // maxWidth: 500,
                        maxHeight: 200,
                      }}
                    >
                      <Grid container>
                        <Grid
                          item
                          xs={6}
                          md={4}
                          justifyContent="flex-start"
                          alignItems="center"
                          container
                        >
                          <CardMedia
                            component="img"
                            image={song.al.picUrl + "?param=100y100"}
                            sx={{
                              mx: 2,
                              my: 2,
                              width: 120,
                              height: 120,
                              borderRadius: 2,
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          md={8}
                          alignItems="center"
                          container
                          // justifyContent="center"
                          sx={{ mt: 3 }}
                        >
                          <CardContent>
                            <Tooltip title={song.reason}>
                              <Typography component="div" variant="body1">
                                {song.al.name}
                              </Typography>
                            </Tooltip>

                            {song.ar.map((ar) => (
                              <Typography
                                key={ar.id}
                                variant="body2"
                                color="text.secondary"
                                component="span"
                              >
                                {ar.name}
                              </Typography>
                            ))}
                            <CardActions sx={{ p: 0 }}>
                              <IconButton aria-label="previous">
                                <ThumbUpOffAltIcon />
                              </IconButton>
                              <IconButton
                                aria-label="play/pause"
                                onClick={() => addOneSong(song)}
                              >
                                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                              </IconButton>
                              <IconButton aria-label="next">
                                <ShareIcon />
                              </IconButton>
                            </CardActions>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={() => refreshDailySongs()} sx={{ my: 2 }}>
                  <Icon>refresh</Icon>
                  换几首
                </Button>
              </Box>
            </>
          )}
        </>
      )}

      <Title title="推荐歌单" />
      <PlaylistList
        playlistList={isLogin ? playlistList?.recommend : playlistList?.result}
        loading={loadingPlaylistList}
      />
    </>
  );
};

export default connect(
  ({ auth: { isLogin }, player: { songs } }) => ({
    isLogin,
    songs,
  }),
  {
    updateSetting,
    addSongs,
  }
)(Home);
