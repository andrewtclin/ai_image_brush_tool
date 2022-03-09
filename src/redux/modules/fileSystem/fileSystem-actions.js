import FileSystemActionTypes from "./fileSystem-types";

export const uploadFileStart = (file) => ({
  type: FileSystemActionTypes.UPLOAD_FILE_START,
  payload: file,
});

export const uploadFileSuccess = (response) => ({
  type: FileSystemActionTypes.UPLOAD_FILE_SUCCESS,
  payload: response,
});

export const uploadFileFailure = (error) => ({
  type: FileSystemActionTypes.UPLOAD_FILE_FAILURE,
  payload: error,
});

export const downloadDataStart = (labelData) => ({
  type: FileSystemActionTypes.DOWNLOAD_DATA_START,
  payload: labelData,
});

export const downloadDataSuccess = (response) => ({
  type: FileSystemActionTypes.DOWNLOAD_DATA_SUCCESS,
  payload: response,
});

export const downloadDataFailure = (error) => ({
  type: FileSystemActionTypes.DOWNLOAD_DATA_FAILURE,
  payload: error,
});
