import React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Skeleton,
  Grid,
  Typography,
  Link,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import { useRequest } from "ahooks";
import { getTopMv, getPersonalizedMv, getLastMv } from "../../../api";
import LazyLoad from "react-lazyload";
import Title from "../../../components/Title";
import MvList from "../../../components/Mv/List";

const Mv = () => {
  const navigate = useNavigate();

  const { data: topMv, loading: loadingTopMv } = useRequest(getTopMv);
  const { data: lastMv, loading: loadingLastMv } = useRequest(getLastMv);
  const { data: personalizedMv, loading: loadingPersonalizedMv } =
    useRequest(getPersonalizedMv);

  return (
    <>
      <Title title="热门MV" />
      {!loadingTopMv ? (
        <>
          <MvList mvList={topMv.data} />
        </>
      ) : (
        <Grid spacing={2} container>
          <Grid xs={6} sm={4} md={3} lg={2} item>
            <Card>
              <Skeleton variant="rectangular" height={130} />
              <CardContent>
                <Skeleton />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      <Title title="最新MV" />
      {!loadingLastMv ? (
        <>
          <MvList mvList={lastMv.data} />
        </>
      ) : (
        <Grid spacing={2} container>
          <Grid xs={6} sm={4} md={3} lg={2} item>
            <Card>
              <Skeleton variant="rectangular" height={130} />
              <CardContent>
                <Skeleton />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      <Title title="推荐MV" />
      {!loadingPersonalizedMv ? (
        <>
          <MvList mvList={personalizedMv.result} />
        </>
      ) : (
        <Grid spacing={2} container>
          <Grid xs={6} sm={4} md={3} lg={2} item>
            <Card>
              <Skeleton variant="rectangular" height={130} />
              <CardContent>
                <Skeleton />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Mv;
