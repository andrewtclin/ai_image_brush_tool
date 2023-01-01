import { useRef, useState, useEffect } from "react";
import ImageProcessor from "./containers/imageProcessor/ImageProcessor";

import Sidebar from "./containers/sidebar/Sidebar";

import Particles from "react-tsparticles";

function App() {
  const particlesOptions = {
    particles: {
      number: {
        value: 50,
        density: { enable: true, value_area: 900 },
      },
      color: {
        value: ["#BD10E0", "#B8E986", "#50E3C2", "#FFD300", "#E86363"],
      },

      links: {
        enable: true,
        distance: 150,
        color: "#c8c8c8",
        opacity: 0.05,
        width: 1,
      },
      size: {
        value: 1.017060304327615,
        random: true,
        anim: {
          enable: true,
          speed: 1.181158184520175,
          size_min: 1,
          sync: true,
        },
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        out_mode: "out",
      },
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: { enable: false, mode: "grab" },
        // onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 0.5 } },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 0.2,
          speed: 3,
        },
      },
    },
  };

  const saveableCanvas = useRef();

  const [labelData, setLabelData] = useState({});
  const [labelClass, setLabelClass] = useState({
    value: "",
    registeredClass: [],
  });

  const [selectedLabelClass, setSelectedLabelClass] = useState("");

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
    <div className="w-full flex flex-col lg:flex-row justify-between items-center h-screen">
      <Particles
        options={particlesOptions}
        style={{
          zIndex: "-9999",
          position: "fixed",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        }}
      />
      <ImageProcessor
        saveableCanvas={saveableCanvas}
        selectedLabelClass={selectedLabelClass}
        labelData={labelData}
        setLabelData={setLabelData}
        setLabelClass={setLabelClass}
      />

      <Sidebar
        labelClass={labelClass}
        setLabelClass={setLabelClass}
        handleRegisteredClassClick={handleRegisteredClassClick}
        labelData={labelData}
        selectedLabelClass={selectedLabelClass}
      />
    </div>
  );
}

export default App;
