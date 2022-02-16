import React from "react";
import { Grid, Skeleton, Card, CardContent, Typography } from "@mui/material";
import { useRequest } from "ahooks";
import { getPersonalizedPlaylist } from "../../api";
import PlaylistList from "../../components/Playlist/List";
import Title from "../../components/Title"

export default function Home() {
  const { data: playlistList, loading: loadingPlaylistList } = useRequest(
    getPersonalizedPlaylist,
    {
      defaultParams: [10],
    }
  );

  return (
    <>
      {loadingPlaylistList ? (
        <>
          <Grid container>
            <Grid xs={6} sm={3} md={3} lg={2.4} item>
              <Card>
                <Skeleton variant="rectangular" height={150} />
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="50%" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Title title="推荐歌单" />
          <PlaylistList playlistList={playlistList.result} />
        </>
      )}
    </>
  );
}
