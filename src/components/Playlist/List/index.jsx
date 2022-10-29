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
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyLoad from "react-lazyload";
import numeral from "numeral";

const PlaylistList = ({ playlistList, loading, variant = "card" }) => {
  const navigate = useNavigate();
  return (
    <>
      {playlistList && !loading ? (
        <>
          {variant === "card" ? (
            <Grid spacing={2} container>
              {playlistList?.map((playlist) => {
                return (
                  <Grid xs={6} sm={3} md={2.4} lg={2} key={playlist.id} item>
                    <Card variant="outlined">
                      <CardActionArea
                        onClick={() => {
                          navigate(`/playlist/${playlist.id}`);
                        }}
                      >
                        <LazyLoad>
                          <CardMedia
                            component="img"
                            alt="green iguana"
                            image={playlist?.picUrl || playlist?.coverImgUrl}
                            loading="lazy"
                          />
                        </LazyLoad>
                        <CardContent>
                          <Typography variant="body1">
                            {playlist.name}
                          </Typography>
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
              <List component="div" dense>
                {playlistList?.map((playlist) => {
                  return (
                    <ListItemButton
                      key={playlist.id}
                      sx={{
                        borderRadius: 2,
                      }}
                      onClick={() => navigate(`/playlist/${playlist.id}`)}
                    >
                      <ListItemAvatar
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <LazyLoadImage
                          alt={playlist.name}
                          width={45}
                          height={45}
                          effect="opacity"
                          src={playlist.coverImgUrl || playlist.picUrl}
                          placeholderSrc={
                            playlist.coverImgUrl || playlist.picUrl
                          }
                          style={{ borderRadius: 5 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            <Typography component="span" color="text.primary">
                              {playlist.name}
                            </Typography>
                          </>
                        }
                        secondary={
                          <>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              {playlist.copywriter}
                            </Typography>
                          </>
                        }
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </>
          )}
        </>
      ) : (
        <>
          {variant === "card" ? (
            <Grid container>
              <Grid xs={6} sm={3} md={2.4} lg={2} item>
                <Card>
                  <Skeleton variant="rectangular" height={150} />
                  <CardContent>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="50%" />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Skeleton variant="rectangular" height={50} />
          )}
        </>
      )}
    </>
  );
};

export default PlaylistList;
