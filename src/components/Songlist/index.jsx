import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { nanoid } from "nanoid";

const SongList = ({ songList }) => {
  return (
    <>
      <Card>
        <CardContent>
          <List dense>
            {songList?.map((song) => {
              return (
                <ListItemButton
                  alignItems="flex-start"
                  key={song.id}
                  sx={{ borderRadius: 2 }}
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
        </CardContent>
      </Card>
    </>
  );
};

export default SongList;
