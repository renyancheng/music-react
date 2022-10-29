import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Skeleton,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Tab,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useRequest } from "ahooks";
import { getUserDetail, getUserPlaylist, getUserEvents } from "../../api";
import UserDetail from "../../components/User/Detail";
import PlaylistList from "../../components/Playlist/List";
import Error from "../../components/Error";
import Title from "../../components/Title";
import Events from "../../components/Events";

const User = () => {
  const { uid } = useParams();
  const [userPlaylist, setUserPlaylist] = useState(null);
  const [otherPlaylist, setOtherPlaylist] = useState(null);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
  const {
    data: userEvents,
    loading: loadingUserEvents,
    refreshAsync: refreshUserEvents,
  } = useRequest(() => getUserEvents(uid));
  useEffect(async () => {
    await refreshUser();
    await refreshPlaylists();
    await refreshUserEvents();
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
        <Card sx={{ mt: 2 }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} variant="fullWidth">
                <Tab label="歌单" value="1" />
                <Tab label="动态" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Title title={`Ta创建的歌单`} />
              <PlaylistList playlistList={userPlaylist} />
              {/* <Divider sx={{ my: 5 }} /> */}
              <Title title={`Ta收藏的歌单`} />
              <PlaylistList playlistList={otherPlaylist} />
            </TabPanel>
            <TabPanel value="2">
              <Events events={userEvents?.events} loading={loadingUserEvents} />
            </TabPanel>
          </TabContext>
        </Card>
      </>
    </>
  );
};

export default User;
