import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Grid,
  Skeleton,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useRequest } from "ahooks";
import { getToplistArtist } from "../../../api";
import Artists from "../../../components/Artists";
import Title from "../../../components/Title";

const Artist = () => {
  const [type, setType] = React.useState(1);

  const types = [
    {
      type: 1,
      name: "华语",
    },
    {
      type: 2,
      name: "欧美",
    },
    {
      type: 3,
      name: "韩国",
    },
    {
      type: 4,
      name: "日本",
    },
  ];

  const { loading: loadingToplistArtist, data: toplistArtist } = useRequest(
    () => getToplistArtist(type),
    {
      refreshDeps: [type],
    }
  );

  return (
    <>
      <Title title="热门歌手" />
      <ToggleButtonGroup
        color="primary"
        value={type}
        exclusive
        onChange={(_, newType) => setType(newType)}
        sx={{ my: 1 }}
      >
        {types.map((t) => (
          <ToggleButton value={t.type} key={t.type}>
            {t.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
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
