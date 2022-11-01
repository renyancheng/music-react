import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Grid,
  Skeleton,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LazyLoad from "react-lazyload";

const Artists = ({ artists, variant = "card" }) => {
  const navigate = useNavigate();

  return (
    <>
      {artists ? (
        <>
          {variant === "card" ? (
            <Grid spacing={2} container>
              {artists.map((artist) => (
                <Grid xs={6} sm={3} md={2} lg={1.5} item key={artist.id}>
                  <Card>
                    <CardActionArea
                      onClick={() => navigate(`/artist/${artist.id}`)}
                    >
                      <LazyLoad height={120}>
                        <CardMedia
                          component="img"
                          height={120}
                          image={artist.picUrl}
                          alt={artist.name}
                          loading="lazy"
                        />
                      </LazyLoad>
                      <CardContent>
                        <Typography
                          align="center"
                          variant="subtitle1"
                          component="div"
                        >
                          {artist.name}
                        </Typography>
                        <Typography
                          align="center"
                          variant="body2"
                          color="text.secondary"
                        >
                          专辑：{artist.albumSize}
                        </Typography>
                        <Typography
                          align="center"
                          variant="body2"
                          color="text.secondary"
                        >
                          歌曲：{artist.musicSize}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <List component="div" dense>
              {artists?.map((artist) => {
                return (
                  <ListItemButton
                    key={artist.id}
                    sx={{ borderRadius: 2 }}
                    onClick={() => navigate(`/artist/${artist.id}`)}
                  >
                    <ListItemAvatar>
                      <LazyLoad>
                        <Avatar
                          alt={artist.name}
                          src={artist.img1v1Url}
                          loading="lazy"
                          variant="rounded"
                        />
                      </LazyLoad>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <>
                          <Typography component="span" color="text.primary">
                            {artist.name}
                          </Typography>
                        </>
                      }
                    />
                  </ListItemButton>
                );
              })}
            </List>
          )}
        </>
      ) : (
        <>暂无歌手</>
      )}
    </>
  );
};

export default Artists;
