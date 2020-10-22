import {combineReducers} from "redux";
import {imgReducer, } from "./imgReducer";
import {indexDB_reducer} from "./indexDB_reducer";

export const rootReducer = combineReducers({
    imgReducer,
    indexDB_reducer
})