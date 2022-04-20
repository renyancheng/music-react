import React, { useState } from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Icon,
  CircularProgress,
  Box,
  Grid,
  Chip,
} from "@mui/material";
import { useRequest } from "ahooks";
import {
  getRecommendPlaylist,
  getHighQualityPlaylist,
  getHighQualityPlaylistTags,
} from "../../../api";
import Title from "../../../components/Title";
import PlaylistList from "../../../components/Playlist/List";

const Playlists = () => {
  const [category, setCategory] = useState("全部");

  const { data: highQualityPlaylist, loading: loadingHighQualityPlaylist } =
    useRequest(() => getHighQualityPlaylist(category), {
      refreshDeps: [category],
    });
  const {
    data: highQualityPlaylistTags,
    loading: loadingHighQualityPlaylistTags,
  } = useRequest(getHighQualityPlaylistTags);
  // console.log(highQualityPlaylistTags, highQualityPlaylist);
  return (
    <>
      <Title title="精品歌单" />
      {!loadingHighQualityPlaylistTags ? (
        <>
          <Accordion sx={{ my: 2 }}>
            <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
              <Icon>label</Icon>
              <Typography>歌单标签</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid sx={{ my: 1 }} container>
                <Grid xs={2} item>
                  <Typography>语种</Typography>
                </Grid>
                <Grid xs={10} item>
                  {highQualityPlaylistTags.tags.map((tag) => (
                    <span key={tag.name}>
                      {tag.category === 0 && (
                        <Chip
                          label={tag.name}
                          color={tag.name == category ? "primary" : "default"}
                          onClick={() => setCategory(tag.name)}
                          sx={{ mr: 1 }}
                        />
                      )}
                    </span>
                  ))}
                </Grid>
              </Grid>
              <Grid sx={{ my: 1 }} container>
                <Grid xs={2} item>
                  <Typography>风格</Typography>
                </Grid>
                <Grid xs={10} item>
                  {highQualityPlaylistTags.tags.map((tag) => (
                    <span key={tag.name}>
                      {tag.category === 1 && (
                        <Chip
                          label={tag.name}
                          color={tag.name == category ? "primary" : "default"}
                          onClick={() => setCategory(tag.name)}
                          sx={{ mr: 1, mb: 1 }}
                        />
                      )}
                    </span>
                  ))}
                </Grid>
              </Grid>
              <Grid sx={{ my: 1 }} container>
                <Grid xs={2} item>
                  <Typography>场景</Typography>
                </Grid>
                <Grid xs={10} item>
                  {highQualityPlaylistTags.tags.map((tag) => (
                    <span key={tag.name}>
                      {tag.category === 2 && (
                        <Chip
                          label={tag.name}
                          color={tag.name == category ? "primary" : "default"}
                          onClick={() => setCategory(tag.name)}
                          sx={{ mr: 1 }}
                        />
                      )}
                    </span>
                  ))}
                </Grid>
              </Grid>
              <Grid sx={{ my: 1 }} container>
                <Grid xs={2} item>
                  <Typography>情感</Typography>
                </Grid>
                <Grid xs={10} item>
                  {highQualityPlaylistTags.tags.map((tag) => (
                    <span key={tag.name}>
                      {tag.category === 3 && (
                        <Chip
                          label={tag.name}
                          color={tag.name == category ? "primary" : "default"}
                          onClick={() => setCategory(tag.name)}
                          sx={{ mr: 1 }}
                        />
                      )}
                    </span>
                  ))}
                </Grid>
              </Grid>
              <Grid sx={{ my: 1 }} container>
                <Grid xs={2} item>
                  <Typography>主题</Typography>
                </Grid>
                <Grid xs={10} item>
                  {highQualityPlaylistTags.tags.map((tag) => (
                    <span key={tag.name}>
                      {tag.category === 4 && (
                        <Chip
                          label={tag.name}
                          color={tag.name == category ? "primary" : "default"}
                          onClick={() => setCategory(tag.name)}
                          sx={{ mr: 1 }}
                        />
                      )}
                    </span>
                  ))}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress sx={{ my: 2 }} size={35} />
        </Box>
      )}
      <PlaylistList
        playlistList={highQualityPlaylist?.playlists}
        loading={loadingHighQualityPlaylist}
      />
    </>
  );
};

export default Playlists;
