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
  Tab,
  Pagination,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useRequest } from "ahooks";
import { useSnackbar } from "notistack";
import {
  getPlaylistDetail,
  getSongDetail,
  subscribePlaylist,
  getPlaylistComment,
} from "../../api";
import { addSongs } from "../../redux/actions/player";
import PlaylistDetail from "../../components/Playlist/Detail";
import SongList from "../../components/SongList";
import Error from "../../components/Error";
import Comment from "../../components/Comment";

function getStringTrackIds(trackIds) {
  return trackIds.map((track) => track.id).join(",");
}

const Playlist = ({ addSongs }) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const {
    data: playlist,
    loading: loadingPlaylist,
    refresh: refreshPlaylist,
  } = useRequest(() => getPlaylistDetail(params.id));
  const { runAsync: runGetSongList, loading: loadingSongList } = useRequest(
    getSongDetail,
    {
      manual: true,
    }
  );

  // 歌单评论
  const [playlistCommentPage, setPlaylistCommentPage] = useState(1);
  const { data: playlistComment, loading: loadingPlaylistComment } = useRequest(
    () => getPlaylistComment(params.id, playlistCommentPage),
    {
      refreshDeps: [playlistCommentPage],
    }
  );

  const { run: runSubscribePlaylist, loading: loadingSubscribePlaylist } =
    useRequest(subscribePlaylist, {
      manual: true,
    });

  //等待获取歌单所有id，再使用获取歌曲列表接口获取所有歌曲
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
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList onChange={handleChange} variant="fullWidth">
                        <Tab label="歌曲" value="1" />
                        <Tab label="评论" value="2" />
                        <Tab label="推荐" value="3" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <CardContent>
                        {loadingSongList ? (
                          <Skeleton variant="rectangular" height={350} />
                        ) : (
                          <SongList songList={songList} />
                        )}
                      </CardContent>
                    </TabPanel>
                    <TabPanel value="2">
                      {!loadingPlaylistComment ? (
                        <>
                          <Comment comments={playlistComment.comments} />
                          <Pagination
                            count={playlistComment.total}
                            page={playlistCommentPage}
                            onChange={(_, newPage) =>
                              setPlaylistCommentPage(newPage)
                            }
                            variant="outlined"
                            color="primary"
                          />
                        </>
                      ) : (
                        <>
                          <Skeleton variant="rectangular" height={400} />
                        </>
                      )}
                    </TabPanel>
                    <TabPanel value="3">推荐歌单</TabPanel>
                  </TabContext>
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
