import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  CardActionArea,
  Button,
} from "@mui/material";
import { useRequest } from "ahooks";
import { getRecommendPlaylist } from "../../../api";

const Playlists = () => {
  const { data: recommendPlaylist, loading: loadingRecommendPlaylist } =
    useRequest(getRecommendPlaylist);
  console.log(recommendPlaylist);
  return <div>{loadingRecommendPlaylist}</div>;
};

export default Playlists;
