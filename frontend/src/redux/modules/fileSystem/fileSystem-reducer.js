import FileSystemActionTypes from "./fileSystem-types";

const INITIAL_STATE = {
  uploadFileStatus: {
    isLoading: false,
    response: null,
    error: null,
  },
  downloadDataStatus: {
    isLoading: false,
    response: null,
    error: null,
  },
};

const fileSystemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FileSystemActionTypes.UPLOAD_FILE_START:
      return {
        ...state,
        uploadFileStatus: {
          ...state.uploadFileStatus,
          isLoading: true,
        },
      };

    case FileSystemActionTypes.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        uploadFileStatus: {
          ...state.uploadFileStatus,
          isLoading: false,
          response: action.payload,
          error: null,
        },
      };

    case FileSystemActionTypes.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        uploadFileStatus: {
          ...state.uploadFileStatus,
          isLoading: false,
          error: action.payload,
        },
      };

    case FileSystemActionTypes.DOWNLOAD_DATA_START:
      return {
        ...state,
        downloadDataStatus: {
          ...state.downloadDataStatus,
          isLoading: true,
        },
      };

    case FileSystemActionTypes.DOWNLOAD_DATA_SUCCESS:
      return {
        ...state,
        downloadDataStatus: {
          ...state.downloadDataStatus,
          isLoading: false,
          response: action.payload,
          error: null,
        },
      };

    case FileSystemActionTypes.DOWNLOAD_DATA_FAILURE:
      return {
        ...state,
        downloadDataStatus: {
          ...state.downloadDataStatus,
          isLoading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default fileSystemReducer;
