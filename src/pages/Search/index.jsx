import React from "react";
import { Autocomplete, TextField, CircularProgress, Grid } from "@mui/material";
import { useRequest } from "ahooks";
import { getSearchSuggest, getSearchResult } from "../../api";
import SongList from "../../components/SongList";

const Search = () => {
  const [options, setOptions] = React.useState([]);
  const [keywords, setKeywords] = React.useState(null);
  const [inputKeywords, setInputKeywords] = React.useState("");
  const { loading: suggestLoading, data: suggestOptions } = useRequest(
    () => getSearchSuggest(inputKeywords),
    {
      throttleWait: 1000,
      // manual: true,
      refreshDeps: [inputKeywords],
    }
  );

  const {
    loading: resultLoading,
    data: searchResult,
    refresh: searchRefresh,
  } = useRequest(() => getSearchResult(keywords?.keyword || null), {
    refreshDeps: [keywords],
  });

  React.useEffect(() => {
    if (!suggestLoading && suggestOptions?.result?.allMatch) {
      setOptions([...suggestOptions.result.allMatch]);
    }
  }, [suggestLoading]);

  React.useEffect(() => {
    if (!inputKeywords) {
      setOptions([]);
    }
  }, [inputKeywords]);

  React.useEffect(() => {
    if (keywords) {
      searchRefresh();
    }
  }, [keywords]);

  return (
    <>
      <Autocomplete
        clearOnEscape
        //   freeSolo
        isOptionEqualToValue={(option, value) =>
          option.keyword === value.keyword
        }
        getOptionLabel={(option) => option.keyword}
        options={options}
        loading={suggestLoading}
        value={keywords}
        onChange={(event, newValue) => {
          setKeywords(newValue);
        }}
        inputValue={inputKeywords}
        onInputChange={(event, newInputValue) => {
          setInputKeywords(newInputValue);
        }}
        /* renderOption={(props, option) => {
        let key = Math.random();
        return <Box component="li" {...props} key={key}>
          {option.name} - {option.artists[0].name}
        </Box>;
      }} */
        renderInput={(params) => (
          <TextField
            {...params}
            autoFocus
            label="搜索..."
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {suggestLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <Grid container justifyContent="center">
        {resultLoading ? (
          <>
            <CircularProgress color="primary" size={30} sx={{my:3}} />
          </>
        ) : (
          <>
            <Grid xs={12} item>
              <SongList songList={searchResult?.result?.songs} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Search;
