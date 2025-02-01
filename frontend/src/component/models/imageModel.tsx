import { useState, useCallback } from "react";
import { getCroppedImage } from "../../utils/image.utility";
import Cropper from "react-easy-crop";

export interface ImageCropDialogProps {
  imageSrc: string;
  aspectRatio: number;
  onComplete: (croppedUrl: string | null) => void;
  onCancel: () => void;
}

const ImageModel: React.FC<ImageCropDialogProps> = ({
  imageSrc,
  aspectRatio,
  onComplete,
  onCancel,
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [show, setShow] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | {
    width: number;
    height: number;
    x: number;
    y: number;
  }>(null);
  //   @ts-ignore
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDone = async () => {
    if (croppedAreaPixels) {
      const croppedImageUrl = await getCroppedImage(
        imageSrc,
        croppedAreaPixels
      );
      onComplete(croppedImageUrl);
      setShow(false);
    } else {
      onComplete(null);
      setShow(false);
    }
  };
  return (
    <div
      className={`absolute block min-w-[300px] w-[70%] z-50 bg-green-100 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-lg p-4 ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-green-700">Crop Image</h1>
        <div className="relative h-[300px] w-full">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      </div>
      <p className="flex items-center mt-5 font-medium text-gray-600">
        You can use{" "}
        <code className="mx-2 px-2 py-1 rounded-lg bg-gray-400 text-white">
          ctrl + mouse scroll
        </code>{" "}
        to zoom in and out. And{" "}
        <code className="mx-2 px-2 py-1 rounded-lg bg-gray-400 text-white ">
          right click
        </code>{" "}
        to move the image.
      </p>
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={onCancel}
          className="bg-green-200 px-4 py-2 rounded-lg text-green-700 font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleDone}
          className="bg-green-700 px-4 py-2 rounded-lg text-white font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ImageModel;
