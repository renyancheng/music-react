import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Skeleton, Box, CardContent, Card } from "@mui/material";
import { useRequest } from "ahooks";
import { useSnackbar } from "notistack";
import { getPlaylistDetail, getSongDetail } from "../../api";
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
  const { data: playlist, loading: loadingPlaylist } = useRequest(
    getPlaylistDetail,
    {
      defaultParams: [params.id],
    }
  );
  const { runAsync: runGetSongList, loading: loadingSongList } = useRequest(
    getSongDetail,
    {
      manual: true,
    }
  );

  const [songList, setSongList] = useState(undefined);

  useEffect(async () => {
    if (playlist) {
      const result = await runGetSongList(
        getStringTrackIds(playlist?.playlist.trackIds)
      );
      setSongList(result.songs);
    }
  }, [playlist]);

  const handlePlayAll = () => {
    addSongs({
      songs: songList,
      replace: true,
    });
    enqueueSnackbar("已添加到播放列表");
  };

  return (
    <>
      {loadingPlaylist ? (
        <>
          <Skeleton variant="rectangular" height={250} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={350} />
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
