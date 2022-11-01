import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Icon,
  AppBar,
  Toolbar,
  Fab,
  Card,
  CardContent,
  IconButton,
  Typography,
  Button,
  Paper,
  Grid,
  Box,
  Dialog,
  Slide,
} from "@mui/material";
import { DataGrid, zhCN } from "@mui/x-data-grid";
import { useConfirm } from "material-ui-confirm";
import { useRequest, useResponsive, useKeyPress } from "ahooks";
import { updateSetting, deleteSong } from "../../redux/actions/player";
import Title from "../../components/Title";
import SongList from "../../components/SongList";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Next = ({ songs, deleteSong }) => {
  const confirm = useConfirm();

  const [playlistDialog, setPlaylistDialog] = React.useState(false);

  const [selectionModel, setSelectionModel] = React.useState([]);
  const deleteSelectedSongs = async () => {
    confirm({
      title: "确定要删除所选歌曲吗？",
      description: "操作后不可恢复",
    }).then(() => {
      // console.log(selectionModel);
      deleteSong(selectionModel);
      setPlaylistDialog(false);
      // console.log(songs);
    });
  };

  const columns = [
    { field: "name", headerName: "歌曲", width: 200, sortable: false },
    {
      field: "ar",
      headerName: "歌手",
      // width: 200,
      sortable: false,
      renderCell: (params) => (
        <Typography variant="body2" component="div">
          {params.row.ar
            .map((ar) => {
              return ar.name;
            })
            .join("/")}
        </Typography>
      ),
    },
    /* {
      field: "ar",
      headerName: "歌手",
      width: 130,
      valueGetter: (params) => {
        let ars;
        params.row.ar.map((ar) => {
          ars + ar.name;
        });
        return ars;
      },
    }, */
  ];
  return (
    <>
      <Card>
        <CardContent>
          <Title title="播放列表" />
          <Button
            variant="outlined"
            color="error"
            onClick={() => setPlaylistDialog(true)}
          >
            删除歌曲
          </Button>
          <SongList songList={songs} />
        </CardContent>
      </Card>
      <Dialog
        fullScreen
        open={playlistDialog}
        onClose={() => setPlaylistDialog(false)}
        TransitionComponent={Transition}
      >
        <AppBar color="error" sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setPlaylistDialog(false)}
            >
              <Icon>close</Icon>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              选择要删除的歌曲
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => deleteSelectedSongs()}
            >
              确定
            </Button>
          </Toolbar>
        </AppBar>
        <DataGrid
          rows={songs}
          columns={columns}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
          checkboxSelection
        />
      </Dialog>
    </>
  );
};

export default connect(
  ({ player: { songs } }) => ({
    songs,
  }),
  {
    updateSetting,
    deleteSong,
  }
)(Next);
