import React from "react";
import { useParams } from "react-router-dom";
import { Skeleton, Paper } from "@mui/material";
import { useRequest } from "ahooks";
import { getUserDetail } from "../../api";
import UserDetail from "../../components/User/Detail";
import Error from "../../components/Error";

const User = () => {
  const params = useParams();
  const {
    data: user,
    loading: loadingUser,
  } = useRequest(getUserDetail, {
    defaultParams: [params.uid],
  });
  return (
    <>
      {loadingUser ? (
        <>
          <Skeleton variant="rectangular" height={250} />
        </>
      ) : (
        <>
          {user.code !== 200 ? (
            <Error errorCode={404} />
          ) : (
            <UserDetail detail={user} />
          )}
        </>
      )}
    </>
  );
};

export default User;
