import "./HomePage.css";
import Radio from "../../components/Radio/Radio";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import Photo from "../../components/Photo/Photo";

const HomePage = () => {
  const [formData, setFormData] = useState({});
  const [roversData, setRoversData] = useState("");
  const [isResponseSended, setIsResponseSended] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAllPhoto, setIsShowAllPhoto] = useState(false);
  const [currentPhotoIndex, setcurrentPhotoIndex] = useState(0);

  const apiRovers =
    "https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=udw6I2DT6QJreS6eeLUhtthbxJliPkEJfav0o2kJ";

  useEffect(() => {});

  const setRoverHandler = (e) => {
    let id = parseInt(e.target.id.replace(/[^\d]/g, ""));
    setIsShowAllPhoto(false);
    setFormData({
      ...formData,
      roverName: roversData[id].name,
      roverId: id,
    });
    console.log(formData);
  };

  const setCameraHandler = (camera) => {
    setFormData({
      ...formData,
      selectedCamera: camera,
    });
  };

  return (
    <main className="container">
      {isResponseSended ? (
        roversData ? (
          <div className="button-wraper">
            {roversData.map((rover, index) => {
              return (
                <Radio
                  onClick={setRoverHandler}
                  key={index}
                  index={index}
                  inpuName={"rover"}
                >
                  {rover.name}
                </Radio>
              );
            })}
          </div>
        ) : (
          <div className="center">
            <span>...Loading</span>
          </div>
        )
      ) : (
        <div className="center">
          <Button
            onClick={() => {
              setIsResponseSended(true);
              fetch(apiRovers)
                .then((res) => {
                  if (res.status >= 200 && res.status <= 300) {
                    return res.json();
                  } else {
                    throw new Error(res.status);
                  }
                })
                .then((res) => {
                  setRoversData(res.rovers);
                });
            }}
          >
            Explore mars
          </Button>
        </div>
      )}

      <div className="loading-contetn">
        {formData.roverId || formData.roverId === 0 ? (
          <input
            className="range-input"
            type={"range"}
            min={1}
            max={roversData[formData.roverId].max_sol}
            value={formData.selectedSol}
            onChange={(e) => {
              setFormData({
                ...formData,
                selectedSol: e.target.valueAsNumber,
              });
            }}
          />
        ) : null}
        {formData.selectedSol && roversData[formData.roverId].max_sol ? (
          formData.selectedSol <= roversData[formData.roverId].max_sol ? (
            <span>{formData.selectedSol}</span>
          ) : (
            setFormData({
              ...formData,
              selectedSol: roversData[formData.roverId].max_sol,
            })
          )
        ) : null}
      </div>
      <div className="camera-wrapper">
        {formData.selectedSol
          ? roversData[formData.roverId].cameras.map((camera, index) => {
              return (
                <Radio
                  onClick={(e) => {
                    setCameraHandler(camera.name);
                    setIsShowAllPhoto(false);
                  }}
                  index={index}
                  inpuName={"camera"}
                  key={index}
                >
                  {camera.full_name}
                </Radio>
              );
            })
          : null}
      </div>
      <div className="photos">
        {formData.roverName &&
        formData.selectedSol &&
        formData.selectedCamera ? (
          formData.roverName &&
          formData.selectedSol &&
          formData.selectedCamera &&
          isShowAllPhoto ? (
            <>
              <Photo
                isLoading={isLoading}
                selectedRovorName={formData.roverName}
                selectedSol={formData.selectedSol}
                selectedCamera={formData.selectedCamera}
              />
            </>
          ) : (
            <div>
              <Photo
                selectedRovorName={formData.roverName}
                selectedSol={formData.selectedSol}
                selectedCamera={formData.selectedCamera}
                isLoading={isLoading}
                setIsShowAllPhoto={setIsShowAllPhoto}
                isShowAllPhoto={isShowAllPhoto}
                setcurrentPhotoIndex={setcurrentPhotoIndex}
                currentPhotoIndex={currentPhotoIndex}
                setIsLoading={setIsLoading}
              />
            </div>
          )
        ) : null}
      </div>
    </main>
  );
};
export default HomePage;
