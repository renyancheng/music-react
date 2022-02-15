import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
  Chip,
  Box,
} from "@mui/material";
import numeral from "numeral";

const Playlists = ({ playlists }) => {
  return (
    <>
      <Grid spacing={2} container>
        {playlists.map((playlist) => {
          return (
            <Grid xs={6} sm={3} md={3} lg={2.4} key={playlist.id} item>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    image={playlist?.picUrl || playlist?.coverImgUrl}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">{playlist.name}</Typography>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                      <Chip
                        color="primary"
                        size="small"
                        variant="outlined"
                        sx={{ mr: 1 }}
                        label={`${numeral(playlist.playCount).format(
                          "0a"
                        )}播放`}
                      />
                      <Chip
                        color="primary"
                        size="small"
                        variant="outlined"
                        label={`${numeral(
                          playlist.subscribedCount || playlist.trackCount
                        ).format("0a")}收藏`}
                      />
                    </Box>

                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ display: { xs: "none", sm: "block" } }}
                    >
                      {playlist.copywriter}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Playlists;
