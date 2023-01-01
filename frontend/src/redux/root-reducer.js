import { combineReducers } from "redux";
import fileSystemReducer from "./modules/fileSystem/fileSystem-reducer";

const rootReducer = combineReducers({ fileSystem: fileSystemReducer });

export default rootReducer;
