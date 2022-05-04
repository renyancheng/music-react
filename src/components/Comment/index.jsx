import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import LazyLoad from "react-lazyload";

const Comment = ({ comments }) => {
  return (
    <List>
      {comments.map((comment) => (
        <ListItem alignItems="flex-start" key={comment.commentId}>
          <ListItemAvatar>
            <LazyLoad>
              <Avatar
                alt={comment.user.nickname}
                src={comment.user.avatarUrl}
              />
            </LazyLoad>
          </ListItemAvatar>
          <ListItemText
            primary={comment.user.nickname}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {comment.content}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Comment;
