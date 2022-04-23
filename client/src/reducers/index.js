import { combineReducers } from "redux";

import portfolios from "./portfolios";
import auth from "./auth";

export const reducers = combineReducers({ portfolios, auth });
