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
  Grid,
  IconButton,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyLoad from "react-lazyload";
import { updateSetting, addSongs } from "../../redux/actions/player";
import { nanoid } from "nanoid";

const SongList = ({ songList, songs, current, updateSetting, addSongs }) => {
  const addOneSong = (song) => {
    // console.log(songs[songs.length - 1]);
    addSongs({
      songs: [song],
    });
    
    updateSetting({
      // current: songs.length - 1 === -1 ? 0 : songs.length - 1,
      current: 0,
    });


    /* new Promise((resolve, reject) => {
      console.log(songs[songs.length - 1], songs.length);

      setTimeout(() => {
        addSongs({
          songs: [song],
        });
        resolve(songs);
      }, 0);
    }).then((songs) => {
      updateSetting({
        current: songs.length - 1 === -1 ? 0 : songs.length - 1,
      });
      console.log(songs[songs.length - 1], songs.length);
    }); */
  };

  return (
    <>
      {songList ? (
        <List component="div" dense>
          {songList?.map((song) => {
            return (
              <ListItemButton
                key={song.id}
                sx={{ borderRadius: 2 }}
                disabled={Boolean(song.noCopyrightRcmd)}
                onClick={() => addOneSong(song)}
              >
                <ListItemAvatar>
                  <LazyLoad>
                    {song.id !== songs[current]?.id ? (
                      <Avatar
                        alt={song.name}
                        src={song.al.picUrl + "?param=50y50"}
                        loading="lazy"
                        variant="rounded"
                      />
                    ) : (
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <Icon>play_arrow</Icon>
                      </Avatar>
                    )}

                    {/* <LazyLoadImage
                    alt={song.name}
                    width={43}
                    height={43}
                    effect="opacity"
                    src={song.al.picUrl}
                    placeholderSrc={song.al.picUrl}
                    style={{ borderRadius: 5}}
                  /> */}
                  </LazyLoad>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <>
                      <Typography
                        component="span"
                        color={
                          song.id !== songs[current]?.id
                            ? "text.primary"
                            : "primary"
                        }
                      >
                        {song.id === songs[current]?.id ? "播放中：" : null}
                        {song.name}
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
      ) : (
        <>暂无歌曲</>
      )}
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
