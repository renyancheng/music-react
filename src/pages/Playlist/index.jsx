import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  Skeleton,
  Box,
  CardContent,
  Card,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import { useRequest } from "ahooks";
import { useSnackbar } from "notistack";
import { getPlaylistDetail, getSongDetail, subscribePlaylist } from "../../api";
import { addSongs } from "../../redux/actions/player";
import PlaylistDetail from "../../components/Playlist/Detail";
import SongList from "../../components/SongList";
import Error from "../../components/Error";

function getStringTrackIds(trackIds) {
  return trackIds.map((track) => track.id).join(",");
}

const Playlist = ({ addSongs }) => {
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const {
    data: playlist,
    loading: loadingPlaylist,
    refresh: refreshPlaylist,
  } = useRequest(getPlaylistDetail, {
    defaultParams: [params.id],
  });
  const { runAsync: runGetSongList, loading: loadingSongList } = useRequest(
    getSongDetail,
    {
      manual: true,
      cacheKey: "staleTime-0",
      staleTime: 0,
    }
  );

  const { run: runSubscribePlaylist, loading: loadingSubscribePlaylist } =
    useRequest(subscribePlaylist, {
      manual: true,
    });

  const [songList, setSongList] = useState(undefined);

  useEffect(async () => {
    if (playlist) {
      const result = await runGetSongList(
        getStringTrackIds(playlist?.playlist.trackIds)
      );
      setSongList(result.songs);
    }
    // console.log(playlist.playlist.subscribed);
  }, [playlist]);

  const handlePlayAll = () => {
    addSongs({
      songs: songList,
      replace: true,
    });
    enqueueSnackbar("已添加到播放列表");
  };

  const handleSubscribe = (type) => {
    runSubscribePlaylist(params.id, type);
    refreshPlaylist();
    let msg = type ? "收藏成功" : "取消收藏成功";
    enqueueSnackbar(msg, {
      type: "success",
    });
  };

  return (
    <>
      {loadingPlaylist ? (
        <>
          <Box sx={{ mb: 2 }}>
            <Card>
              <CardContent>
                <Skeleton variant="rectangular" height={200} />
              </CardContent>
            </Card>
          </Box>
          <Box>
            <Card>
              <CardContent>
                <Skeleton variant="rectangular" height={300} />
              </CardContent>
            </Card>
          </Box>
        </>
      ) : (
        <>
          {playlist?.code !== 200 && !songList ? (
            <Error errorCode={404} />
          ) : (
            <>
              <Box sx={{ mb: 2 }}>
                <PlaylistDetail
                  detail={playlist.playlist}
                  playAll={handlePlayAll}
                  disablePlay={loadingSongList}
                  handleSubscribe={handleSubscribe}
                />
              </Box>
              <Box>
                <Card>
                  <CardContent>
                    {loadingSongList ? (
                      <Skeleton variant="rectangular" height={350} />
                    ) : (
                      <SongList songList={songList} />
                    )}
                  </CardContent>
                </Card>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

export default connect(() => ({}), {
  addSongs,
})(Playlist);
