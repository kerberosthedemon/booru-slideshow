import { useState } from "react";

export default function usePictureController() {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const [zoom, setZoom] = useState(1);

  const [IposX, setIposX] = useState(null);
  const [IposY, setIposY] = useState(null);
  const [Izoom, setIzoom] = useState(null);

  const resetTransform = () => {
    setPosX(0);
    setPosY(0);
    setZoom(1);

    if (IposX) {
      clearInterval(IposX);
      setIposX(null);
    }

    if (IposY) {
      clearInterval(IposY);
      setIposY(null);
    }
  };

  const handleKeyUp = (event) => {
    switch (event.key) {
      case "a":
      case "d":
        if (IposX) {
          clearInterval(IposX);
          setIposX(null);
        }
        break;

      case "w":
      case "s":
        if (IposY) {
          clearInterval(IposY);
          setIposY(null);
        }
        break;

      case "q":
      case "e":
        if (Izoom) {
          clearInterval(Izoom);
          setIzoom(null);
        }
        break;

      case "c":
        resetTransform();
        break;

      default:
        break;
    }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "a":
        if (!IposX)
          setIposX(
            setInterval(() => {
              setPosX((prev) => prev + 10 * zoom);
            }, 25)
          );
        break;

      case "d":
        if (!IposX)
          setIposX(
            setInterval(() => {
              setPosX((prev) => prev - 10 * zoom);
            }, 25)
          );
        break;

      case "w":
        if (!IposY)
          setIposY(
            setInterval(() => {
              setPosY((prev) => prev + 10 * zoom);
            }, 25)
          );
        break;

      case "s":
        if (!IposY)
          setIposY(
            setInterval(() => {
              setPosY((prev) => prev - 10 * zoom);
            }, 25)
          );
        break;

      case "q":
        if (!Izoom)
          setIzoom(
            setInterval(() => {
              setZoom((prev) => prev + 0.05);
            }, 25)
          );
        break;

      case "e":
        if (!Izoom)
          setIzoom(
            setInterval(() => {
              setZoom((prev) => prev - 0.05);
            }, 25)
          );
        break;

      default:
        break;
    }
  };

  const transform = { posX, posY, zoom };
  const handlers = { handleKeyDown, handleKeyUp };
  const actions = { resetTransform }

  return [transform, handlers, actions];
}
