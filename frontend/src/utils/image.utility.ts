export const getCroppedImage = async (
    imageSrc: string,
    cropAreaPixels: { x: number; y: number; width: number; height: number }
  ): Promise<string | null> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    if (!ctx) {
      return null;
    }
  
    canvas.width = cropAreaPixels.width;
    canvas.height = cropAreaPixels.height;
  
    ctx.drawImage(
      image,
      cropAreaPixels.x,
      cropAreaPixels.y,
      cropAreaPixels.width,
      cropAreaPixels.height,
      0,
      0,
      cropAreaPixels.width,
      cropAreaPixels.height
    );
  
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          resolve(null);
        }
      }, "image/jpeg");
    });
  };
  
  const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });
  };
  