import { set, get, rm } from "lockr";
import {
  ADD_SONGS,
  DELETE_SONG,
  UPDATE_SETTING,
  PLAY_NEXT,
  PLAY_PREVIOUS,
} from "../constant";

const initState = {
  songs: [],
  setting: {
    current: 0,
    src: null,
    lyric: null,
    volume: 1,
    mode: "order", // random, repeat
  },
  /* songs: get("songs") || [],
  setting: get("setting") || {
    current: 0,
    src: null,
    lyric: null,
    volume: 1,
    mode: "order", // random, repeat
  }, */
};

export default function player(preState = initState, { type, data }) {
  switch (type) {
    case ADD_SONGS:
      if (data?.replace === true) {
        const songs = [...data.songs];
        const setting = { ...preState.setting, current: 0 };
        // set("songs", songs);
        // set("setting", setting);
        return { songs, setting };
      } else {
        let songs = [...preState.songs, ...data.songs]; // 所有歌曲播放列表
        // 遍历要添加的每个歌曲，过滤掉列表中相同的音乐
        data.songs.forEach((newSong) => {
          songs = songs.filter((song) => song.id !== newSong.id);
        });
        songs = [...data.songs, ...songs];
        // set("songs", songs);
        return { ...preState, songs };
      }
    case UPDATE_SETTING:
      let setting = { ...preState.setting, ...data };
      // set("setting", setting);
      return { ...preState, setting };
    default:
      return preState;
  }
}
