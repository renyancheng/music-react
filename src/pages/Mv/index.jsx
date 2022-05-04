import React, { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Icon,
  Typography,
  Skeleton,
  Box,
  Link,
  Badge,
  Pagination,
} from "@mui/material";
import { useRequest } from "ahooks";
import ReactPlayer from "react-player";
import {
  getMvDetail,
  getMvDetailInfo,
  getMvUrl,
  getMvComment,
  getSimiMv,
} from "../../api";
import Title from "../../components/Title";
import Comment from "../../components/Comment";
import MvList from "../../components/Mv/List";

const Mv = () => {
  const { id: mvId } = useParams();
  const [commentPage, setCommentPage] = useState(1);

  const { data: mvDetail, loading: loadingMvDetail } = useRequest(
    () => getMvDetail(mvId),
    {
      refreshDeps: [mvId],
    }
  );
  const { data: simiMv, loading: loadingSimiMv } = useRequest(
    () => getSimiMv(mvId),
    {
      refreshDeps: [mvId],
    }
  );
  const { data: mvDetailInfo, loading: loadingMvDetailInfo } = useRequest(
    () => getMvDetailInfo(mvId),
    {
      refreshDeps: [mvId],
    }
  );

  const { data: mvUrl, loading: loadingMvUrl } = useRequest(
    () => getMvUrl(mvId),
    {
      refreshDeps: [mvId],
    }
  );
  const { data: mvComment, loading: loadingMvComment } = useRequest(
    () => getMvComment(mvId, commentPage),
    {
      refreshDeps: [mvId, commentPage],
    }
  );

  return (
    <>
      <Grid spacing={2} container>
        <Grid xs={12} md={7} item>
          <Card>
            {!loadingMvUrl ? (
              <ReactPlayer
                width="100%"
                height="100%"
                url={mvUrl.data.url}
                controls
              />
            ) : (
              <Skeleton variant="rectangular" height={350} />
            )}

            <CardContent>
              <Typography variant="h5">
                {!loadingMvDetail ? (
                  <>{mvDetail.data.name}</>
                ) : (
                  <Skeleton width="50%" />
                )}
              </Typography>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body1"
                color="text.secondary"
              >
                {!loadingMvDetail ? (
                  <>
                    {mvDetail.data.artists.map((artist) => {
                      return (
                        <Link
                          key={artist.id}
                          component={RouterLink}
                          to={`/artist/${artist.id}`}
                          sx={{ mr: 1 }}
                          underline="hover"
                          color="inherit"
                        >
                          {artist.name}
                        </Link>
                      );
                    })}
                  </>
                ) : (
                  <Skeleton width="40%" />
                )}
              </Typography>
              <Typography variant="body2">
                {!loadingMvDetail ? <>{mvDetail.data.desc}</> : <Skeleton />}
              </Typography>
            </CardContent>
            <CardActions>
              {!loadingMvDetailInfo ? (
                <>
                  <IconButton>
                    <Badge
                      badgeContent={mvDetailInfo.likedCount}
                      max={999}
                      color="primary"
                    >
                      <Icon>thumb_up_alt</Icon>
                    </Badge>
                  </IconButton>
                  <IconButton>
                    <Badge
                      badgeContent={mvDetailInfo.shareCount}
                      max={999}
                      color="primary"
                    >
                      <Icon>share</Icon>
                    </Badge>
                  </IconButton>
                  <IconButton>
                    <Badge
                      badgeContent={mvDetailInfo.commentCount}
                      max={999}
                      color="primary"
                    >
                      <Icon>comment</Icon>
                    </Badge>
                  </IconButton>
                </>
              ) : (
                <></>
              )}
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={12} md={5} item>
          <Card>
            <CardContent>
              <Title
                title={
                  loadingMvDetailInfo
                    ? "评论"
                    : `评论(${mvDetailInfo.commentCount})`
                }
              />
              {!loadingMvComment ? (
                <>
                  <Comment comments={mvComment.comments} />
                  <Pagination
                    count={Math.floor(mvComment.total / 5) + 1}
                    page={commentPage}
                    variant="outlined"
                    color="primary"
                    sx={{ my: 1 }}
                    onChange={(_, newCommentPage) =>
                      setCommentPage(newCommentPage)
                    }
                  />
                </>
              ) : (
                <Skeleton variant="rectangular" height={50} />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item container>
          <Title title="相似MV" />
          {!loadingSimiMv ? (
            <MvList mvList={simiMv.mvs} />
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
        </Grid>
      </Grid>
    </>
  );
};

export default Mv;
