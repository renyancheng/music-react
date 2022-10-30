import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Icon,
  Fab,
  Card,
  CardContent,
  IconButton,
  Typography,
  Button,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import { useRequest, useResponsive, useKeyPress } from "ahooks";
import { updateSetting } from "../../redux/actions/player";
import Title from "../../components/Title";
import SongList from "../../components/SongList";

const Next = ({ songs }) => {
  return (
    <>
      <Card>
        <CardContent>
          <Title title="播放列表" />
          <SongList songList={songs} />
        </CardContent>
      </Card>
    </>
  );
};

export default connect(
  ({ player: { songs } }) => ({
    songs,
  }),
  {
    updateSetting,
  }
)(Next);
