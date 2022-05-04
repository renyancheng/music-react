import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Typography,
  Skeleton,
} from "@mui/material";
import { useRequest, useToggle } from "ahooks";
import {
  getArtistDetail,
  getArtistDesc,
  getSimiArtist,
  getArtistTopSong,
} from "../../api";
import Artists from "../../components/Artists";
import SongList from "../../components/SongList";
import Title from "../../components/Title";

const Artist = () => {
  const params = useParams();

  const { data: artistDetail, loading: loadingArtistDetail } = useRequest(
    () => getArtistDetail(params.id),
    {
      refreshDeps: [params.id],
    }
  );

  const { data: artistDesc, loading: loadingArtistDesc } = useRequest(
    () => getArtistDesc(params.id),
    {
      refreshDeps: [params.id],
    }
  );
  const { data: simiArtist, loading: loadingSimiArtist } = useRequest(
    () => getSimiArtist(params.id),
    {
      refreshDeps: [params.id],
    }
  );
  const { data: artistTopSong, loading: loadingArtistTopSong } = useRequest(
    () => getArtistTopSong(params.id),
    {
      refreshDeps: [params.id],
    }
  );

  return (
    <>
      <Grid spacing={2} container>
        <Grid xs={12} md={8} item>
          <Card>
            {!loadingArtistDetail ? (
              <CardMedia
                component="img"
                height={200}
                image={artistDetail.data.artist.cover}
                alt={artistDetail.data.artist.name}
              />
            ) : (
              <Skeleton variant="rectangular" height={200} />
            )}

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {!loadingArtistDetail ? (
                  artistDetail.data.artist.name
                ) : (
                  <Skeleton />
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {!loadingArtistDetail ? (
                  artistDetail.data.artist.briefDesc
                ) : (
                  <Skeleton />
                )}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ my: 1 }}>
            <CardContent>
              <Title title="Ta的热门歌曲" />
              {!loadingArtistTopSong ? (
                <SongList songList={artistTopSong.songs} />
              ) : (
                <Skeleton variant="rectangular" height={50} />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={4} item>
          <Card>
            <CardContent>
              <Title title="相似歌手" />
              {!loadingSimiArtist ? (
                <Artists artists={simiArtist.artists} variant="list" />
              ) : (
                <Card>
                  <Skeleton variant="rectangular" height={200} />
                </Card>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Artist;
