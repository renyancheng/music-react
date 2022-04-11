import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton, Grid, Card, CardContent, Divider } from "@mui/material";
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
      <>
        <UserDetail detail={user} />
        <Title title={`Ta创建的歌单`} />
        <PlaylistList playlistList={userPlaylist} />
        <Divider sx={{ my: 5 }} />
        <Title title={`Ta收藏的歌单`} />
        <PlaylistList playlistList={otherPlaylist} />
      </>
    </>
  );
};

export default User;
