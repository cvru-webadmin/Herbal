import React, { forwardRef, useEffect, useRef, useState } from "react";
import ImageCropModel from "../component/models/imageModel";

type PostHerbProps = { setImg: (url: string) => void; img: string | null };

const ImageUtility = forwardRef<HTMLInputElement, PostHerbProps>(
  (props, ref) => {
    const imageRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageSelect = () => {
      imageRef.current?.click();
    };

    // Handle file change event
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
    };

    // Handle cropping completion
    const handleCropComplete = (croppedUrl: string | null) => {
      if (croppedUrl) {
        // setCroppedImageUrl(croppedUrl);
        props.setImg(croppedUrl);
      }
      setImagePreview(null);
    };

    // Cleanup image preview URL on unmount
    useEffect(() => {
      return () => {
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
      };
    }, [imagePreview]);

    return (
      <div
        className="items-center justify-center cursor-pointer rounded-lg w-fit"
        onClick={handleImageSelect}
      >
        {imagePreview && (
          <ImageCropModel
            imageSrc={imagePreview}
            aspectRatio={16 / 9}
            onComplete={handleCropComplete}
            onCancel={() => setImagePreview(null)}
          />
        )}
        {props.img ? (
          <img
            src={props.img}
            alt="Course Thumbnail"
            className="aspect-video min-w-[280px] md:w-80 max-w-[400px] rounded-lg border-[1px]"
          />
        ) : (
          <div className="aspect-video min-w-[280px] md:w-80 max-w-[400px] bg-gray-200 rounded-lg border-[1px] flex items-center justify-center text-gray-500">
            Click to upload image
          </div>
        )}
        <input
          className="hidden"
          type="file"
          accept="image/*"
          ref={(node) => {
            // @ts-ignore
            imageRef.current = node;
            if (ref) {
              (ref as React.MutableRefObject<HTMLInputElement | null>).current =
                node;
            }
          }}
          onChange={handleFileChange}
        />
      </div>
    );
  }
);

export default ImageUtility;
