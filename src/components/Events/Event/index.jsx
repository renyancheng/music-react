import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  CardActionArea,
  Avatar,
  IconButton,
  Icon,
} from "@mui/material";

const Event = ({ event }) => {
  return (
    <>
      <Card sx={{ my: 1 }} variant="outlined">
        <CardHeader
          avatar={<Avatar src={event.user.avatarUrl}></Avatar>}
          action={
            <IconButton aria-label="settings">
              <Icon>more_vert</Icon>
            </IconButton>
          }
          title={event.user.nickname}
          subheader={event.user.signature}
        />
        {/* <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        /> */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {event.info.commentThread.resourceInfo?.name ||
              JSON.parse(event.json).msg}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Icon>favorite</Icon>
          </IconButton>
          <IconButton aria-label="comment">
            <Icon>comment</Icon>
          </IconButton>
          <IconButton aria-label="share">
            <Icon>share</Icon>
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Event;
