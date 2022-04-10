import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Card,
  CardContent,
  Link,
  Typography,
  Icon,
  IconButton,
} from "@mui/material";
import { updateSetting, addSongs } from "../../redux/actions/player";
import { nanoid } from "nanoid";

const SongList = ({ songList, songs, current, updateSetting, addSongs }) => {
  const addOneSong = (song) => {
    addSongs({
      songs: [song],
    });
    updateSetting({ current: songs.length - 1 === -1 ? 0 : songs.length - 1 });
  };

  return (
    <>
      <List dense>
        {songList?.map((song) => {
          return (
            <ListItemButton
              alignItems="flex-start"
              key={song.id}
              sx={{ borderRadius: 2 }}
              disabled={Boolean(song.noCopyrightRcmd)}
              onClick={() => addOneSong(song)}
            >
              {/* <ListItemAvatar>
                <Avatar alt={song.name} src={song.al.picUrl} />
              </ListItemAvatar> */}
              <ListItemText
                primary={song.name}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {song.ar.map((ar) => {
                        return (
                          <Link
                            key={nanoid()}
                            component={RouterLink}
                            to={`/artist/${ar.id}`}
                            sx={{ mr: 1 }}
                            underline="hover"
                            color="inherit"
                          >
                            {ar.name}
                          </Link>
                        );
                      })}
                    </Typography>
                  </>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </>
  );
};

export default connect(
  ({
    player: {
      songs,
      setting: { current },
    },
  }) => ({
    songs,
    current,
  }),
  {
    updateSetting,
    addSongs,
  }
)(SongList);
