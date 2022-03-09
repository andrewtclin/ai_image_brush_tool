import { takeLatest, put, all, call } from "redux-saga/effects";
import { axiosFileSystem, host } from "../../../apiConfig/axios";

import FileSystemActionTypes from "./fileSystem-types";

import {
  uploadFileSuccess,
  uploadFileFailure,
  downloadDataSuccess,
  downloadDataFailure,
} from "./fileSystem-actions";

//#region ------ API ------
const uploadFileApi = async ({ file }) => {
  let bodyFormData = new FormData();
  bodyFormData.append("file", file);
  const response = await axiosFileSystem({
    method: "post",
    url: "/upload",
    data: bodyFormData,
  });
  return response.data.result;
};

const downloadDataApi = async ({ labelData }) => {
  await axiosFileSystem({
    method: "post",
    url: "/download_data",
    data: labelData,
  });
  await window.open(`https://${host}/file/download_data`, "_blank");
};
//#endregion

//#region ------ Watchers ------
function* uploadFileStart() {
  yield takeLatest(FileSystemActionTypes.UPLOAD_FILE_START, uploadFile);
}

function* downloadDataStart() {
  yield takeLatest(FileSystemActionTypes.DOWNLOAD_DATA_START, downloadData);
}
//#endregion

//#region ------ Workers ------
function* uploadFile({ payload: file }) {
  try {
    yield call(uploadFileApi, { file });
    yield put(uploadFileSuccess({ filename: file.name }));
  } catch (error) {
    yield put(uploadFileFailure(error));
  }
}

function* downloadData({ payload: labelData }) {
  try {
    yield call(downloadDataApi, { labelData });
    yield put(downloadDataSuccess("Success"));
  } catch (error) {
    yield put(downloadDataFailure(error));
  }
}
//#endregion

export function* fileSystemSaga() {
  yield all([call(uploadFileStart), call(downloadDataStart)]);
}
