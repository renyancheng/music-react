import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
  Skeleton,
  Chip,
  Box,
} from "@mui/material";
import numeral from "numeral";

const PlaylistList = ({ playlistList }) => {
  const navigate = useNavigate();
  return (
    <>
      {playlistList ? (
        <Grid spacing={2} container>
          {playlistList?.map((playlist) => {
            return (
              <Grid xs={6} sm={3} md={2.4} lg={2} key={playlist.id} item>
                <Card>
                  <CardActionArea
                    onClick={() => {
                      navigate(`/playlist/${playlist.id}`);
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      image={playlist?.picUrl || playlist?.coverImgUrl}
                    />
                    <CardContent>
                      <Typography variant="body1">{playlist.name}</Typography>
                      {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
                    </Box> */}

                      <Typography
                        variant="body2"
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
      ) : (
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
      )}
    </>
  );
};

export default PlaylistList;
