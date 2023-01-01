import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CanvasDraw from "react-canvas-draw";
import { RgbaColorPicker } from "react-colorful";

import { Button, Slider, Upload } from "antd";

import Swal from "sweetalert2";
import { InboxOutlined } from "@ant-design/icons";
import {
  downloadDataStart,
  uploadFileStart,
  uploadFileSuccess,
} from "../../redux/modules/fileSystem/fileSystem-actions";
import { selectUploadFileStatus } from "../../redux/modules/fileSystem/fileSystem-selectors";
import { host, port } from "../../apiConfig/axios";

function ImageProcessor({
  saveableCanvas,
  selectedLabelClass,
  labelData,
  setLabelData,
  setLabelClass,
}) {
  const dispatch = useDispatch();
  const { Dragger } = Upload;
  const uploadFileStatus = useSelector(selectUploadFileStatus);

  const uploadConfig = {
    name: "files",
    onChange(info) {
      dispatch(uploadFileStart(info.file.originFileObj));
    },
  };

  const [imgSrc, setImgSrc] = useState("");
  // "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  const [brushSize, setBrushSize] = useState(12);
  const [brushColor, setBrushColor] = useState({
    r: 200,
    g: 150,
    b: 35,
    a: 0.5,
  });
  const handleLabelDataDownload = () => {
    dispatch(downloadDataStart(labelData));
  };

  useEffect(() => {
    if (
      uploadFileStatus.response !== null &&
      Object.keys(uploadFileStatus.response).length
    ) {
      setImgSrc(
        `https://${host}:${port}/file/${uploadFileStatus.response.filename}`
      );
    }
    //eslint-disable-next-line
  }, [uploadFileStatus.isLoading]);

  return (
    <div
      className="order-last lg:order-1 px-24 w-full h-full py-12 flex flex-col justify-start items-center"
      style={{ flex: "0.8" }}
    >
      <div className="flex flex-col justify-center items-center w-full mb-6 text-gray-700 text-lg flex-[0.3]">
        <div className="text-xl font-medium mb-3">
          Pre AI Training Image Labelling Brush Tool
        </div>
        <div className="flex flex-col justify-start">
          <div>1. Upload an Image.</div>
          <div>2. Enter your label class.</div>
          <div>3. Start Labelling</div>
          <div>4. Enjoy Downloading Your Data!</div>
        </div>
      </div>
      <div className="flex-[0.7] w-full flex flex-col justify-start items-center lg:grid lg:grid-cols-2 md:gap-x-12 md:place-items-center ">
        {!imgSrc ? (
          <div className="lg:self-start lg:justify-self-end">
            <Dragger {...uploadConfig} style={{ padding: "50px 20px" }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="text-lg">
                Click or drag image to this area to upload
              </p>
            </Dragger>
          </div>
        ) : (
          <div className="lg:self-start lg:justify-self-end">
            <CanvasDraw
              ref={(canvasDraw) => (saveableCanvas.current = canvasDraw)}
              brushColor={`rgba(${brushColor.r}, ${brushColor.g}, ${brushColor.b}, ${brushColor.a})`}
              catenaryColor={`rgba(${brushColor.r}, ${brushColor.g}, ${brushColor.b}, ${brushColor.a})`}
              brushRadius={brushSize}
              imgSrc={imgSrc}
              disabled={selectedLabelClass ? false : true}
            />
            <div className="mt-4 flex justify-center items-center">
              <Button
                onClick={() => {
                  let currentData = JSON.parse(
                    saveableCanvas.current.getSaveData()
                  );
                  let tempLabelData = { ...labelData };
                  if (!currentData.lines.length) {
                    if (selectedLabelClass in tempLabelData) {
                      delete tempLabelData[selectedLabelClass];
                    }
                    setLabelData(tempLabelData);
                    return;
                  }

                  tempLabelData[selectedLabelClass] = currentData;
                  setLabelData(tempLabelData);
                  Swal.fire(
                    "Success",
                    "Data displayed at console. Data has been saved successfully.",
                    "success"
                  );
                }}
                disabled={selectedLabelClass ? false : true}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  Swal.fire({
                    title: "Warning",
                    text: "This action will erase all data of current class.",
                    icon: "warning",
                    showConfirmButton: true,
                    confirmButtonText: "Erase",
                    showCancelButton: true,
                    cancelButtonText: "Cancel",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      saveableCanvas.current.eraseAll();
                      return -1;
                    } else {
                      return -1;
                    }
                  });
                }}
                disabled={selectedLabelClass ? false : true}
              >
                Erase
              </Button>
              <Button
                onClick={() => {
                  saveableCanvas.current.undo();
                }}
                disabled={selectedLabelClass ? false : true}
              >
                Undo
              </Button>
              <Button
                type="primary"
                onClick={handleLabelDataDownload}
                disabled={
                  labelData !== null && Object.keys(labelData).length
                    ? false
                    : true
                }
              >
                Download
              </Button>
              <Button
                onClick={() => {
                  setImgSrc("");
                  dispatch(uploadFileSuccess(null));
                  setLabelClass({
                    value: "",
                    registeredClass: [],
                  });
                  setLabelData({});
                }}
                danger
              >
                Clear Image
              </Button>
            </div>
          </div>
        )}

        <div className="lg:self-start lg:justify-self-start pt-12 lg:pt-0">
          <div className="flex flex-col justify-center items-center">
            <RgbaColorPicker color={brushColor} onChange={setBrushColor} />
            {/* <span className="text-red-600 font-medium text-xs mt-2">z
              {selectedLabelClass
                ? "Label class is selected, brush color is now locked."
                : ""}
            </span> */}
          </div>
          <Slider
            value={brushSize}
            onChange={(e) => setBrushSize(e)}
            min={1}
            max={20}
          />
        </div>
      </div>
    </div>
  );
}

export default ImageProcessor;
