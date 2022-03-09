import { Button, Divider, Input, Slider } from "antd";
import { useRef, useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import { RgbaColorPicker } from "react-colorful";
import Swal from "sweetalert2";

function App() {
  const saveableCanvas = useRef();
  //
  const [brushSize, setBrushSize] = useState(12);
  const [labelData, setLabelData] = useState({});
  const [brushColor, setBrushColor] = useState({
    r: 200,
    g: 150,
    b: 35,
    a: 0.5,
  });

  const [labelClass, setLabelClass] = useState({
    value: "",
    registeredClass: [],
  });
  const [selectedLabelClass, setSelectedLabelClass] = useState("");
  //
  //
  const handleRegisteredClassClick = (eachRegisteredClass) => {
    if (selectedLabelClass === eachRegisteredClass) {
      setSelectedLabelClass("");
    } else {
      setSelectedLabelClass(eachRegisteredClass);
    }
    saveableCanvas.current.eraseAll();
  };
  //

  //
  useEffect(() => {
    if (selectedLabelClass) {
      if (selectedLabelClass === "all") {
        let pictureDimension = {};
        if (Object.keys(labelData)?.length) {
          let firstKey = Object.keys(labelData)[0];
          pictureDimension["height"] = labelData[firstKey]?.height;
          pictureDimension["width"] = labelData[firstKey]?.width;
        }
        let dataCollaboration = Object.values(labelData)?.reduce(
          (acc, item) => {
            acc["lines"] = [...acc["lines"], ...item["lines"]];
            return acc;
          },
          { lines: [] }
        );
        dataCollaboration["height"] = pictureDimension["height"];
        dataCollaboration["width"] = pictureDimension["width"];
        saveableCanvas.current.loadSaveData(JSON.stringify(dataCollaboration));
      } else {
        if (selectedLabelClass in labelData) {
          saveableCanvas.current.loadSaveData(
            JSON.stringify(labelData[selectedLabelClass])
          );
        }
      }
    }

    //eslint-disable-next-line
  }, [selectedLabelClass]);

  useEffect(() => {
    if (Object.keys(labelData).length) {
      console.log(labelData);
    }
  }, [labelData]);

  return (
    <div
      className="pl-24 w-full flex justify-between items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="w-full h-full py-12 flex justify-around items-center"
        style={{ flex: "0.8" }}
      >
        <div className="h-full  flex flex-col justify-center items-center">
          <CanvasDraw
            ref={(canvasDraw) => (saveableCanvas.current = canvasDraw)}
            brushColor={`rgba(${brushColor.r}, ${brushColor.g}, ${brushColor.b}, ${brushColor.a})`}
            catenaryColor={`rgba(${brushColor.r}, ${brushColor.g}, ${brushColor.b}, ${brushColor.a})`}
            brushRadius={brushSize}
            imgSrc="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            disabled={selectedLabelClass ? false : true}
          />
          <div className="mt-4">
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
          </div>
        </div>

        <div className="mb-10 ">
          <div className="flex flex-col justify-center items-center">
            <RgbaColorPicker color={brushColor} onChange={setBrushColor} />
            {/* <span className="text-red-600 font-medium text-xs mt-2">
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

      <div
        className="border-l h-full flex flex-col items-center justify-start"
        style={{ flex: "0.2" }}
      >
        <div className="p-4">
          <Input
            placeholder="Enter Label Class"
            onPressEnter={(e) =>
              setLabelClass({
                ...labelClass,
                registeredClass: [
                  ...labelClass.registeredClass,
                  e.target.value,
                ],
                value: "",
              })
            }
            onChange={(e) =>
              setLabelClass({ ...labelClass, value: e.target.value })
            }
            value={labelClass.value}
          />
        </div>
        <Divider style={{ margin: "0 0 16px 0" }} />
        <div className="w-full px-2 flex flex-col justify-start items-center">
          {Object.keys(labelData)?.length ? (
            <Button
              className="w-full mb-2"
              type="primary"
              onClick={() => handleRegisteredClassClick("all")}
              danger={selectedLabelClass === "all" ? true : false}
            >
              Show All
            </Button>
          ) : (
            ""
          )}
          {labelClass.registeredClass.map((eachRegisteredClass) => (
            <Button
              className="w-full"
              key={eachRegisteredClass}
              onClick={() => handleRegisteredClassClick(eachRegisteredClass)}
              danger={selectedLabelClass === eachRegisteredClass ? true : false}
            >
              {eachRegisteredClass}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
