import { set, get, rm } from "lockr";
import {} from "../constant";

const initState = {
  songs: [],
  setting: {},
};

function player(preState = initState, { type, data }) {
  switch (type) {
    default:
      return preState;
  }
}
