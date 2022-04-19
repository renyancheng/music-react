import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers/index";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
export default { store, persistor };
