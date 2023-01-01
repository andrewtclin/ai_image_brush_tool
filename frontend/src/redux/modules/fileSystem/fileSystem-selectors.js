import { createSelector } from "reselect";

const selectFileSystem = (state) => state.fileSystem;

export const selectUploadFileStatus = createSelector(
  [selectFileSystem],
  (fileSystem) => fileSystem.uploadFileStatus
);

export const selectdownloadDataStatus = createSelector(
  [selectFileSystem],
  (fileSystem) => fileSystem.downloadDataStatus
);
