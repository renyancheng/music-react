import React, { useState } from "react";
import {
  Box,
  TextField,
  CircularProgress,
  Grid,
  LinearProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRequest } from "ahooks";
import { getSearchSuggest, getSearchResult } from "../../api";
import SongList from "../../components/SongList";
import PlaylistList from "../../components/Playlist/List";
import MvList from "../../components/Mv/List";
import UserList from "../../components/User/List";
import Artists from "../../components/Artists";
import Title from "../../components/Title";

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [searchResult, setSearchResult] = useState(null);
  // const { loading: suggestLoading, data: suggestOptions } = useRequest(
  //   () => getSearchSuggest(inputKeywords),
  //   {
  //     throttleWait: 1000,
  //     // manual: true,
  //     refreshDeps: [inputKeywords],
  //   }
  // );

  const { loading: loadingSongs, runAsync: runSearchSongs } = useRequest(
    getSearchResult,
    {
      manual: true,
    }
  );

  const { loading: loadingUsers, runAsync: runSearchUsers } = useRequest(
    getSearchResult,
    {
      manual: true,
    }
  );
  const { loading: loadingArtists, runAsync: runSearchArtists } = useRequest(
    getSearchResult,
    {
      manual: true,
    }
  );
  const { loading: loadingMvs, runAsync: runSearchMvs } = useRequest(
    getSearchResult,
    {
      manual: true,
    }
  );
  const { loading: loadingPlaylists, runAsync: runSearchPlaylists } =
    useRequest(getSearchResult, {
      manual: true,
    });

  const onSubmit = async ({ keywords }) => {
    setSearchResult(null);
    const songs = await runSearchSongs(keywords, 1);
    const users = await runSearchUsers(keywords, 1002);
    const artists = await runSearchArtists(keywords, 100);
    const mvs = await runSearchMvs(keywords, 1004);
    const playlists = await runSearchPlaylists(keywords, 1000);
    setSearchResult({
      songs: songs.result.songs,
      users: users.result.userprofiles,
      artists: artists.result.artists,
      mvs: mvs.result.mvs,
      playlists: playlists.result.playlists,
    });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ my: 1 }}
      >
        <TextField
          label="搜索"
          placeholder="请输入关键词"
          variant="outlined"
          margin="normal"
          autoFocus
          fullWidth
          {...register("keywords", {
            required: "关键词是必须的",
          })}
          error={errors.keywords ? true : false}
          helperText={errors.keywords ? errors.keywords.message : null}
          sx={{ mb: 0 }}
        />
        {loadingSongs ||
        loadingPlaylists ||
        loadingMvs ||
        loadingArtists ||
        loadingUsers ? (
          <LinearProgress />
        ) : null}
      </Box>
      <Grid container spacing={2}>
        {loadingSongs ||
        loadingPlaylists ||
        loadingMvs ||
        loadingArtists ||
        loadingUsers ? null : (
          <>
            <Grid xs={12} item container>
              {searchResult ? (
                <>
                  <Grid xs={12} md={7} item>
                    <Title title="歌曲" />
                    <SongList songList={searchResult?.songs} />
                  </Grid>
                  <Grid xs={12} md={5} item>
                    <Title title="歌手" />
                    <Artists artists={searchResult?.artists} variant="list" />
                  </Grid>
                  <Grid xs={12} item>
                    <Title title="歌单" />
                    <PlaylistList playlistList={searchResult?.playlists} />
                  </Grid>
                  <Grid xs={12} item>
                    <Title title="MV" />
                    <MvList mvList={searchResult?.mvs} />
                  </Grid>
                </>
              ) : (
                <>
                  {(searchResult !== null && searchResult?.songs == null) ??
                    "什么也没有搜到..."}
                </>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Search;
