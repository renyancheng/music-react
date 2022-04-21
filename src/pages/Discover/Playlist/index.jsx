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

  const categorys = [
    { id: 0, name: "语种" },
    { id: 1, name: "风格" },
    { id: 2, name: "场景" },
    { id: 3, name: "情感" },
    { id: 4, name: "主题" },
  ];

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
              {/* <Icon>label</Icon> */}
              <Typography>歌单标签</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
                variant="outlined"
                onClick={() => setCategory("全部")}
                fullWidth
              >
                全部精品
              </Button>
              {categorys.map((cat) => (
                <Grid sx={{ my: 1 }} container key={cat.id}>
                  <Grid xs={2} item>
                    <Typography>{cat.name}</Typography>
                  </Grid>
                  <Grid xs={10} item>
                    {highQualityPlaylistTags.tags.map((tag) => (
                      <span key={tag.name}>
                        {tag.category === cat.id && (
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
              ))}
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
