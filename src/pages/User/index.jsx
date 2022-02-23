import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton, Grid, Card, CardContent } from "@mui/material";
import { useRequest } from "ahooks";
import { getUserDetail, getUserPlaylist } from "../../api";
import UserDetail from "../../components/User/Detail";
import PlaylistList from "../../components/Playlist/List";
import Error from "../../components/Error";
import Title from "../../components/Title";

const User = () => {
  const { uid } = useParams();
  const [userPlaylist, setUserPlaylist] = useState(null);
  const [otherPlaylist, setOtherPlaylist] = useState(null);
  const {
    data: user,
    loading: loadingUser,
    refreshAsync: refreshUser,
  } = useRequest(() => getUserDetail(uid));
  const {
    data: playlists,
    loading: loadingPlaylists,
    refreshAsync: refreshPlaylists,
  } = useRequest(() => getUserPlaylist(uid));
  useEffect(async () => {
    await refreshUser();
    await refreshPlaylists();
  }, [uid]);
  useEffect(() => {
    if (playlists && user) {
      setUserPlaylist(
        playlists.playlist.filter(
          (playlist) => playlist.creator.userId === user.profile.userId
        )
      );
      setOtherPlaylist(
        playlists.playlist.filter(
          (playlist) => playlist.creator.userId !== user.profile.userId
        )
      );
    }
  }, [playlists]);
  return (
    <>
      {loadingUser && loadingPlaylists && !userPlaylist && !otherPlaylist ? (
        <>
          <Grid container spacing={6}>
            <Grid xs={12} item>
              <Skeleton variant="rectangular" height={250} />
            </Grid>
            <Grid xs={6} sm={3} md={3} lg={2.4} item>
              <Card>
                <Skeleton variant="rectangular" height={150} />
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="50%" />
                </CardContent>
              </Card>
            </Grid>
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
          {user?.code !== 200 ? (
            <Error errorCode={404} />
          ) : (
            <>
              <UserDetail detail={user} />
              <Title title={`${user.profile.nickname}创建的歌单`} />
              <PlaylistList playlistList={userPlaylist} />
              <Title title={`${user.profile.nickname}收藏的歌单`} />
              <PlaylistList playlistList={otherPlaylist} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default User;
