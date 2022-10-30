import "./Pagination.css";
import Button from "../Button/Button";

const Pagination = ({
  totalPhotos,
  setcurrentPhotoIndex,
  currentPhotoIndex,
}) => {
  return (
    <div className="pagination">
      <Button
        onClick={() => {
          if (currentPhotoIndex !== 0) {
            setcurrentPhotoIndex(currentPhotoIndex - 1);
          }
        }}
      >
        prev photo
      </Button>
      <h3>{`${currentPhotoIndex + 1} of ${totalPhotos}`}</h3>
      <Button
        onClick={() => {
          if (currentPhotoIndex < totalPhotos - 1) {
            setcurrentPhotoIndex(currentPhotoIndex + 1);
          }
        }}
        className="page-link"
      >
        next photo
      </Button>
    </div>
  );
};

export default Pagination;
