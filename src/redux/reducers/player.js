import { set, get, rm } from "lockr";
import {
  ADD_SONGS,
  DELETE_SONG,
  UPDATE_SETTING,
  PLAY_NEXT,
  PLAY_PREVIOUS,
} from "../constant";

const initState = {
  songs: get("songs") || [],
  setting: get("setting") || {
    current: 0,
    src: null,
    volume: 1,
    mode: "order", // random, once
  },
};

export default function player(preState = initState, { type, data }) {
  switch (type) {
    case ADD_SONGS:
      if (data?.replace === true) {
        const songs = [...data.songs];
        const setting = { ...preState.setting, current: 0 };
        set("songs", songs);
        set("setting", setting);
        return { songs, setting };
      } else {
        const songs = [...data.songs, ...preState.songs];
        set("songs", songs);
        return { ...preState, songs };
      }
    case UPDATE_SETTING:
      let setting = { ...preState.setting, ...data };
      set("setting", setting);
      return { ...preState, setting };
    default:
      return preState;
  }
}
