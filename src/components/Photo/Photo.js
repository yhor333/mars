import "./Photo.css";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";

const Photo = ({
  selectedRovorName,
  selectedSol,
  selectedCamera,
  isLoading,
  setcurrentPhotoIndex,
  currentPhotoIndex,
  setIsLoading,
}) => {
  const [isShowPagination, setIsShowPagination] = useState(false);
  const [photos, setPhotos] = useState("");

  const getPhotoHandler = () => {
    setcurrentPhotoIndex(0);
    if (selectedRovorName && selectedSol) {
      setIsLoading(true);
      const api = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRovorName}/photos?sol=${selectedSol}&camera=${selectedCamera}&api_key=udw6I2DT6QJreS6eeLUhtthbxJliPkEJfav0o2kJ`;
      fetch(api)
        .then((res) => {
          if (res.status >= 200 && res.status <= 300) {
            setIsLoading(false);
            return res.json();
          } else {
            throw new Error(res.status);
          }
        })
        .then((res) => {
          setPhotos(res);
        });
    }
    return;
  };
  useEffect(() => {
    getPhotoHandler();
    setIsShowPagination(false);
  }, [setIsShowPagination, selectedRovorName, selectedSol, selectedCamera]);
  if (isLoading) {
    return <Loader />;
  }
  if (photos) {
    if (photos.photos.length === 0) {
      return <h3>Select other options</h3>;
    }
    if (photos.photos[currentPhotoIndex].img_src !== undefined) {
      return (
        <div className="img-wrapper">
          <img src={photos.photos[currentPhotoIndex].img_src} alt="foto"></img>
          <div className="pagination-wrapper">
            {!isShowPagination ? (
              <Button
                onClick={(e) => {
                  setIsShowPagination(true);
                }}
              >
                Load more…
              </Button>
            ) : (
              <Pagination
                totalPhotos={photos.photos.length}
                setcurrentPhotoIndex={setcurrentPhotoIndex}
                currentPhotoIndex={currentPhotoIndex}
              />
            )}
          </div>
        </div>
      );
    }
  }
};

export default Photo;
