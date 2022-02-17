import { ADD_SONGS, DELETE_SONG, UPDATE_SETTING } from "../constant";

export const addSongs = (data) => ({
  type: ADD_SONGS,
  data,
});

export const deleteSong = (data) => ({
  type: DELETE_SONG,
  data,
});

export const updateSetting = (data) => ({
  type: UPDATE_SETTING,
  data
})