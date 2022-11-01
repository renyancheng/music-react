import React from "react";
import { Grid, Card, CardContent, Skeleton } from "@mui/material";
import PlaylistList from "../../../components/Playlist/List";
import Title from "../../../components/Title";
import { useRequest } from "ahooks";
import { getToplistDetail } from "../../../api";

const Toplist = () => {
  const { loading: loadingToplist, data: toplist } =
    useRequest(getToplistDetail);

  return (
    <>
      <Grid container>
        <Grid xs={12} item>
          <Title title="全部排行榜" />
          <PlaylistList playlistList={toplist?.list} loading={loadingToplist} />
        </Grid>
      </Grid>
    </>
  );
};

export default Toplist;
