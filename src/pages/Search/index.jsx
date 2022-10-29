import React, { useState } from "react";
import { Box, TextField, CircularProgress, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRequest } from "ahooks";
import { getSearchSuggest, getSearchResult } from "../../api";
import SongList from "../../components/SongList";

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

  const { loading: resultLoading, runAsync: runAsyncSearch } = useRequest(
    getSearchResult,
    {
      manual: true,
    }
  );

  const onSubmit = async ({ keywords }) => {
    const data = await runAsyncSearch(keywords);
    setSearchResult(data.result.songs);
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
        />
      </Box>
      <Grid container justifyContent="center">
        {resultLoading ? (
          <>
            <CircularProgress color="primary" size={30} sx={{ my: 3 }} />
          </>
        ) : (
          <>
            <Grid xs={12} item>
              <SongList songList={searchResult} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Search;
