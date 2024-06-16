import React from "react";
import {
  Button,
  CardContent,
  CardHeader,
  Avatar,
  Skeleton,
} from "@mui/material";
import Event from "./Event";

const Events = ({ events, loading }) => {
  return (
    <>
      {!loading ? (
        <>
          {events?.map((event) => (
            <Event event={event} key={event.id} />
          ))}
        </>
      ) : (
        <>
          <Skeleton variant="rectangular" height={250} />
        </>
      )}
    </>
  );
};

export default Events;
