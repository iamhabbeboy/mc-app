import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AvatarEditor from 'react-avatar-editor'
import { ImageSelectionProps } from "../types";

const CropImage = ({ imageSelected }: ImageSelectionProps) => {
  const [imgSrc, setImgSrc] = useState('/blank.png')
  const imageCroppedRef = useRef<any>(null);

  useEffect(() => {
    if (imageSelected) {
      const url = URL.createObjectURL(imageSelected)
      setImgSrc(url);
    }
  }, [imageSelected])

  const handleCloseCropImage = () => {
    const closeModal = new CustomEvent("close-crop-image-modal");
    window.dispatchEvent(closeModal);
  }

  const handleUploadImage = () => {
    const openModal = new CustomEvent("edit-image-upload-modal");
    window.dispatchEvent(openModal);
  }

  const handlePreviewImage = async () => {
    if (imageCroppedRef.current) {
      try {
        const blob = await getCroppedImageBlob() as Blob;
        const newImage = new File([blob], "filename.jpeg", { type: blob.type, });
        const closeModal = new CustomEvent("open-preview-modal", {
          detail: {
            file: newImage,
          }
        });
        window.dispatchEvent(closeModal);
      } catch (e) {
        console.log(e)
      }
    }
  }

  const getCroppedImageBlob = () => {
    return new Promise((resolve, reject) => {
      return imageCroppedRef.current.getImageScaledToCanvas().toBlob((blob: File) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to get cropped image blob'));
        }
      }, 'image/jpeg'); // Specify the image format (e.g., 'image/jpeg')
    });
  };

  return (
    <div className="overflow-auto h-screen">
      <div className="mx-auto flex justify-between">
        <div>{""}</div>
        <h1 className="modal__title text-center">Pan and crop image</h1>
        <button onClick={handleCloseCropImage}><Image src="/times.svg" width={40} height={40} alt="Close modal" /> </button>
      </div>
      <div className="bg-black p-10 mt-10">
        <div className="flex justify-center mx-auto">
          {/* <img src={imgSrc} alt="" width={384} height={498} style={{width: "100%"}} /> */}
          <AvatarEditor
            image={imgSrc}
            width={384}
            height={498}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.2}
            rotate={0}
            ref={imageCroppedRef}
            disableHiDPIScaling={true}
          />
        </div>
      </div>
      <div className="mx-auto text-center mt-5 mb-20">
        <button className="button button__create text-white py-2 px-7" onClick={handlePreviewImage}>Done </button>
        <p className="mt-5">{" "}</p>
        <button className="button button__outline py-2 px-7" onClick={handleUploadImage}>Re-Upload Image </button>
      </div>
      <div className="py-10">{" "} </div>
    </div>
  )
}
export default CropImage;