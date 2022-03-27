import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Grid,
  Stack,
  Chip,
  Card,
  CardContent,
  Typography,
  IconButton,
  Icon,
  Divider,
  Button,
  Paper,
  Avatar,
} from "@mui/material";
import moment from "moment";
import numeral from "numeral";
import Description from "../../Description";

moment.locale("zh-cn");

export const PlaylistDetail = ({ detail, profile, playAll }) => {
  return (
    <>
      <Card sx={{ display: "flex" }}>
        <Grid container>
          <Grid
            xs={12}
            sm={6}
            md={4}
            lg={3}
            item
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Paper>
                <Avatar
                  alt={detail.name}
                  src={detail.coverImgUrl}
                  sx={{ width: 220, height: 220, borderRadius: 3 }}
                ></Avatar>
              </Paper>
            </CardContent>
          </Grid>
          <Grid xs={12} sm={6} md={8} lg={9} container item>
            <CardContent>
              <Grid xs={12} sm={12} md={12} lg={12} item sx={{ m: 1 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="h5">{detail.name}</Typography>
                  {/* <Chip
                    color="secondary"
                    size="small"
                    variant="outlined"
                    label={`LV.${detail.level}`}
                  /> */}
                </Stack>
              </Grid>
              {/* <Grid xs={12} sm={12} md={12} lg={12} item sx={{ m: 1 }}>
                <Stack direction="row" spacing={3}>
                  <Stack sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1">1</Typography>
                    <Typography variant="body1">动态</Typography>
                  </Stack>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Stack sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1">1</Typography>
                    <Typography variant="body1">关注</Typography>
                  </Stack>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Stack sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1">1</Typography>
                    <Typography variant="body1">粉丝</Typography>
                  </Stack>
                </Stack>
              </Grid> */}
              <Grid xs={12} sm={12} md={12} lg={12} item sx={{ m: 1 }}>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<Icon>play_arrow</Icon>}
                    onClick={() => playAll()}
                  >
                    播放
                  </Button>
                  {detail.creator.userId === profile?.userId ? (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<Icon>edit</Icon>}
                      >
                        编辑歌单
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Icon>star</Icon>}
                      >
                        收藏
                      </Button>
                    </>
                  )}
                </Stack>
              </Grid>
              <Grid item sx={{ m: 1 }}>
                {detail.creator && (
                  <Description
                    name="创建者"
                    value={
                      <Chip
                        avatar={
                          <Avatar
                            alt={detail.creator.nickname}
                            src={detail.creator.avatarUrl}
                          />
                        }
                        label={detail.creator.nickname}
                        variant="outlined"
                        component={Link}
                        to={`/user/home/${detail.creator.userId}`}
                      />
                    }
                  />
                )}
                <Box sx={{ my: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="div"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    标签：
                    <Stack direction="row" spacing={1}>
                      {detail.tags.map((tag) => {
                        return (
                          <Chip
                            color="primary"
                            size="small"
                            variant="outlined"
                            label={tag}
                            key={tag}
                          />
                        );
                      })}
                    </Stack>
                  </Typography>
                </Box>

                <Description
                  name="歌单简介"
                  value={detail.description || "这家伙很懒什么也没有写"}
                />
                <Description
                  name="收藏数量"
                  value={`${numeral(detail.trackCount).format("0a")}`}
                />
                <Description
                  name="创建时间"
                  value={moment(detail.createTime).format("YYYY-MM-DD")}
                />
                <Description
                  name="更新时间"
                  value={moment(detail.updateTime).fromNow()}
                />
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default connect(({ auth: { profile } }) => ({
  profile,
}))(PlaylistDetail);
