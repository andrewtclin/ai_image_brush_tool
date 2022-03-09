import { all, call } from "redux-saga/effects";
import { fileSystemSaga } from "./modules/fileSystem/fileSystem-sagas";

export default function* rootSaga() {
  yield all([call(fileSystemSaga)]);
}
