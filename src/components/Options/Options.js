import "./Options.css";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Photo from "../Photo/Photo";

const Options = () => {
  const rovers = useSelector((state) => state.api.description.rovers);
  const [selectedRover, setSelectedRover] = useState("");
  const [selectRovorName, setselectRovorName] = useState("");
  const [selectedSol, setSelectedeSol] = useState(0);
  const [selectedCameraIndex, setSelectedCameraIndex] = useState("");
  const [selectedCamera, setSelectedCamera] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState("");
  const [isShowAllPhoto, setIsShowAllPhoto] = useState(false);
  const [currentPhotoIndex, setcurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const rovers = document.querySelectorAll(".rover");
    const cameras = document.querySelectorAll(".camera");
    if (rovers.length !== 0)
      rovers.forEach((rover) => rover.classList.remove("selected"));
    if (cameras.length !== 0)
      cameras.forEach((camera) => camera.classList.remove("selected"));
    if (selectedRover) rovers[selectedRover].classList.add("selected");

    if (selectedCameraIndex)
      cameras[selectedCameraIndex].classList.add("selected");
  }, [selectedCameraIndex, selectedRover, selectedSol]);

  const setRoverHandler = (e) => {
    setIsShowAllPhoto(false);
    setSelectedRover(e.target.id);
    setselectRovorName(e.target.innerText);
    getPhotoHandler();
  };

  const setCameraHandler = (camera) => {
    setSelectedCamera(camera);
  };

  const getPhotoHandler = () => {
    setcurrentPhotoIndex(0);
    if (selectRovorName && selectedSol) {
      setIsLoading(true);
      const api = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectRovorName}/photos?sol=${selectedSol}&camera=${selectedCamera}&api_key=udw6I2DT6QJreS6eeLUhtthbxJliPkEJfav0o2kJ`;
      fetch(api)
        .then((res) => {
          if (res.status >= 200 && res.status <= 300) {
            setIsLoading(false);
          }
          return res.json();
        })
        .then((res) => {
          setPhotos(res);
        });
    }
    return;
  };
  return (
    <main className="container">
      <h2>Select options</h2>
      <div className="button-wraper">
        {rovers.map((rover, index) => {
          return (
            <Button
              onClick={setRoverHandler}
              key={index}
              index={index}
              class={"rover"}
            >
              {rover.name}
            </Button>
          );
        })}
      </div>
      <div className="loading-contetn">
        {selectedRover ? (
          <input
            className="range-input"
            type={"range"}
            min={1}
            max={rovers[selectedRover].max_sol}
            value={selectedSol}
            onChange={(e) => {
              setSelectedeSol(e.target.valueAsNumber);
              getPhotoHandler();
              setIsShowAllPhoto(false);
            }}
          />
        ) : null}
        {selectedSol && rovers[selectedRover].max_sol ? (
          selectedSol <= rovers[selectedRover].max_sol ? (
            <span>{selectedSol}</span>
          ) : (
            setSelectedeSol(rovers[selectedRover].max_sol)
          )
        ) : null}
      </div>
      <div className="camera-wrapper">
        {selectedSol
          ? rovers[selectedRover].cameras.map((camera, index) => {
              return (
                <Button
                  onClick={(e) => {
                    setCameraHandler(camera.name);
                    setSelectedCameraIndex(e.target.id);
                    setIsShowAllPhoto(false);
                    getPhotoHandler();
                  }}
                  index={index}
                  class={"camera"}
                  key={index}
                >
                  {camera.full_name}
                </Button>
              );
            })
          : null}
      </div>
      <div className="photos">
        {photos ? (
          photos && isShowAllPhoto ? (
            <>
              <Photo photos={photos} isLoading={isLoading} />
            </>
          ) : (
            <div>
              <Photo
                photos={photos}
                isLoading={isLoading}
                setIsShowAllPhoto={setIsShowAllPhoto}
                isShowAllPhoto={isShowAllPhoto}
                setcurrentPhotoIndex={setcurrentPhotoIndex}
                currentPhotoIndex={currentPhotoIndex}
              />
            </div>
          )
        ) : null}
      </div>
    </main>
  );
};
export default Options;
