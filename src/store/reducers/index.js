import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import userReducer from "./user";
import walletReducer from "./wallet"
import sendReducer from "./send";
import authReducer from "./auth";

const buildRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    wallet:walletReducer,
    send:sendReducer,
    auth:authReducer
  });

export default buildRootReducer;
