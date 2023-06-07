import React from "react";

// Getting image url from DropBox container.
export const useDragAndDrop = () => {
  // Saving image from the file system.
  const [image, setImage] = React.useState([]);

  const onDrop = React.useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();

      // onload property contains an event handler executed when the load event is fired.
      reader.onload = function (e) {
        setImage(file);
      };

      // Reading an image.
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  return [onDrop, image];
};
