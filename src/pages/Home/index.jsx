import React from "react";
import { connect } from "react-redux";
import {
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
} from "@mui/material";
import { useRequest } from "ahooks";
import {
  getPersonalizedPlaylist,
  getRecommendSongs,
  getRecommendPlaylist,
} from "../../api";
import PlaylistList from "../../components/Playlist/List";
import SongList from "../../components/SongList";
import Title from "../../components/Title";

export const Home = ({ isLogin }) => {
  const { data: playlistList, loading: loadingPlaylistList } = useRequest(
    () => (isLogin ? getRecommendPlaylist() : getPersonalizedPlaylist(10)),
    { refreshDeps: [isLogin] }
  );

  const { data: recommendSongs, loading: loadingRecommendSongs } =
    useRequest(getRecommendSongs);

  return (
    <>
      {loadingPlaylistList && loadingRecommendSongs ? (
        <>
          <Grid container>
            <Grid xs={6} sm={3} md={3} lg={2.4} item>
              <Card>
                <Skeleton variant="rectangular" height={150} />
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="50%" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          {isLogin && (
            <>
              <Title title="每日推荐" />
              <Card>
                <CardMedia
                  component="img"
                  image="https://picsum.photos/1920/1080?random"
                  alt="picsum"
                  sx={{ height: 200 }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recommendSongs?.data?.recommendReasons[0]?.reason ||
                      "推荐歌曲"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                  <SongList
                    songList={recommendSongs?.data?.dailySongs.splice(0, 3)}
                  />
                </CardContent>
                <CardActions>
                  <Button size="large" fullWidth>
                    <Icon>play_arrow</Icon> 播放
                  </Button>
                </CardActions>
              </Card>
            </>
          )}
          <Title title="推荐歌单" />
          <PlaylistList
            playlistList={
              isLogin ? playlistList?.recommend : playlistList?.result
            }
          />
        </>
      )}
    </>
  );
};

export default connect(
  ({ auth: { isLogin } }) => ({
    isLogin,
  }),
  {}
)(Home);
