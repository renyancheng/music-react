import React from "react";
import { Grid, Card, CardContent, Skeleton } from "@mui/material";
import PlaylistList from "../../../components/Playlist/List";
import Title from "../../../components/Title";
import { useRequest } from "ahooks";
import { getToplistDetail } from "../../../api";

const Toplist = () => {
  const { loading: loadingToplist, data: toplist } =
    useRequest(getToplistDetail);
  console.log(loadingToplist, toplist);

  return (
    <>
      {loadingToplist ? (
        <>
          <Grid container>
            <Grid xs={12} md={12} item>
              <Title title="全部排行榜" />
              <Skeleton height={300} variant="rectangular" />
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid container>
          <Grid xs={12} item>
            <Title title="全部排行榜" />
            <PlaylistList playlistList={toplist.list} variant="card" />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Toplist;
