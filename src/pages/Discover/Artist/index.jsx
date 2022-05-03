import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Grid,
  Skeleton,
  Paper,
  Typography,
} from "@mui/material";
import { useRequest } from "ahooks";
import { getToplistArtist } from "../../../api";
import Artists from "../../../components/Artists";

const Artist = () => {
  const { loading: loadingToplistArtist, data: toplistArtist } =
    useRequest(getToplistArtist);

  return (
    <>
      {loadingToplistArtist ? (
        <>
          <Grid spacing={2} container>
            <Grid xs={6} sm={3} md={2} lg={1.5} item>
              <Card>
                <Skeleton variant="rectangular" height={120} />
                <CardContent>
                  <Skeleton variant="text" width="50%" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Artists artists={toplistArtist.list.artists} />
        </>
      )}
    </>
  );
};

export default Artist;
