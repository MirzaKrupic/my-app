import classes from "./ImageGalery.module.css";
import { useEffect, useState } from "react";

function ImageGallery({ image }) {
  const imagesArr = image
    ? image.split(";").filter((el) => el.length !== 0)
    : [];
  const [currentImage, setCurrentImage] = useState(
    imagesArr ? imagesArr[0] : null
  );

  useEffect(() => {
    (async ()=> {
    setCurrentImage(imagesArr[0]);
  })()
  }, [image]);

  const renderImageOptions = () => {
    return (
      <div className={classes.picture_selection_container}>
          {imagesArr.map((image, index) => (
            <img
              key={index}
              className={classes.picture_option}
              src={image}
              onClick={() => setCurrentImage(image)}
            />
          ))}
      </div>
    );
  };

  return (
    <div className={classes.image_galery_container}>
      <img className={classes.main_picture} src={currentImage} />
      {renderImageOptions()}
    </div>
  );
}

export default ImageGallery;
