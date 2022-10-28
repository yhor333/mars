import "./Photo.css";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";

const Photo = ({
  photos,
  isLoading,
  setcurrentPhotoIndex,
  currentPhotoIndex,
}) => {
  const [isShowPagination, setIsShowPagination] = useState(false);
  useEffect(() => {
    setIsShowPagination(false);
  }, [photos, setIsShowPagination]);
  if (isLoading) {
    return <Loader />;
  }
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
};

export default Photo;
