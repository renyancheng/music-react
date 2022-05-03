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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LazyLoad from "react-lazyload";

const Artists = ({ artists }) => {
  const navigate = useNavigate();

  return (
    <>
      <Grid spacing={2} container>
        {artists.map((artist) => (
          <Grid xs={6} sm={3} md={2} lg={1.5} item key={artist.id}>
            <Card>
              <CardActionArea onClick={() => navigate(`/artist/${artist.id}`)}>
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
                  {/* <LazyLoadImage
              alt={artist.name}
              height={80}
              effect="opacity"
              src={artist.img1v1Url}
              placeholderSrc={artist.img1v1Url}
              loading="lazy"
              style={{ borderRadius: "50%" }}
            /> */}
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
    </>
  );
};

export default Artists;
