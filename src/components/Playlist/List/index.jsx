import React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
  Link,
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
      {playlistList || loading ? (
        <>
          {!loading ? (
            <>
              {variant === "card" ? (
                <Grid spacing={2} container>
                  {playlistList?.map((playlist) => {
                    return (
                      <Grid
                        xs={6}
                        sm={3}
                        md={2.4}
                        lg={2}
                        key={playlist.id}
                        item
                      >
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
                                image={
                                  (playlist?.picUrl || playlist?.coverImgUrl) +
                                  "?param=200y200"
                                }
                                loading="lazy"
                                sx={{
                                  transition: "all 300ms linear",
                                  "&:hover": {
                                    transform: "scale(1.2)",
                                    transition: "all 300ms linear",
                                  },
                                }}
                              />
                            </LazyLoad>
                          </CardActionArea>
                        </Card>
                        <Typography variant="subtitle1">
                          {playlist.name}
                        </Typography>
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
                              src={
                                (playlist.coverImgUrl || playlist.picUrl) +
                                "?param=100y100"
                              }
                              placeholderSrc={
                                playlist.coverImgUrl || playlist.picUrl
                              }
                              style={{ borderRadius: 5 }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <>
                                <Typography
                                  component="span"
                                  color="text.primary"
                                >
                                  {playlist.name}
                                </Typography>
                              </>
                            }
                            secondary={
                              <>
                                {/* <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <Link
                                    component={RouterLink}
                                    to={`/user/home/${playlist.creator.userId}`}
                                    underline="hover"
                                    color="inherit"
                                  >
                                    {playlist.creator.nickname}
                                  </Link>
                                </Typography> */}
                                {playlist.creator.nickname}
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
      ) : (
        <>暂无歌单</>
      )}
    </>
  );
};

export default PlaylistList;
