import { Button, Divider, Input } from "antd";

function Sidebar({
  labelClass,
  setLabelClass,
  handleRegisteredClassClick,
  labelData,
  selectedLabelClass,
}) {
  return (
    <div
      className="pb-2 border-t lg:border-l h-full w-full flex flex-col items-center justify-start shadow-lg order-1 lg:order-last"
      style={{ flex: "0.2" }}
    >
      <div className="p-4">
        <Input
          placeholder="Enter Label Class"
          onPressEnter={(e) =>
            setLabelClass({
              ...labelClass,
              registeredClass: [...labelClass.registeredClass, e.target.value],
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
  );
}

export default Sidebar;
