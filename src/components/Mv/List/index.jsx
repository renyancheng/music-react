import React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Link,
  Button,
  Icon,
} from "@mui/material";
import LazyLoad from "react-lazyload";

const MvList = ({ mvList }) => {
  const navigate = useNavigate();

  return (
    <>
      {mvList ? (
        <Grid spacing={2} container>
          {mvList.map((mv) => (
            <Grid xs={6} sm={4} md={3} lg={2} key={mv.id} item>
              <Card>
                <LazyLoad>
                  <CardMedia
                    component="img"
                    image={mv.cover || mv.picUrl}
                    alt={mv.name}
                  />
                </LazyLoad>
                <CardContent>
                  <Typography variant="h6">{mv.name}</Typography>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {mv.artists.map((artist) => {
                      return (
                        <Link
                          key={artist.id}
                          component={RouterLink}
                          to={`/artist/${artist.id}`}
                          sx={{ mr: 1 }}
                          underline="hover"
                          color="inherit"
                        >
                          {artist.name}
                        </Link>
                      );
                    })}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => navigate(`/mv/${mv.id}`)}>
                    <Icon>play_arrow</Icon>播放
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>暂无MV</>
      )}
    </>
  );
};

export default MvList;
