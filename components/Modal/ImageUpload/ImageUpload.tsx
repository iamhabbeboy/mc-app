import Image from "next/image";
import style from "./imageUpload.module.css";
import { useDropzone } from "react-dropzone";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";

const ImageUpload = () => {
  const imageUploadRef = useRef(null);

  const handleCloseImageUploadModal = () => {
    const closeModal = new CustomEvent("close-image-upload-modal");
    window.dispatchEvent(closeModal);
  }

  const handleCropImageModal = () => {
    const openModal = new CustomEvent("open-crop-image-modal");
    window.dispatchEvent(openModal);
  }
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    }
  });
  useEffect(() => {
    if (acceptedFiles.length) {
      const firstImage = acceptedFiles[0];
      const openModal = new CustomEvent("open-crop-image-modal", {
        detail: {
          file: firstImage,
        }
      });
      window.dispatchEvent(openModal);
      return;
    }
  }, [acceptedFiles])

  const handleImageUpload = () => {
    // @ts-ignore
    imageUploadRef.current?.click();
  }

  const handleImageProcessing = (evt: any) => {
    const files = evt.target.files
    const firstImage = files[0];
    const openModal = new CustomEvent("open-crop-image-modal", {
      detail: {
        file: firstImage,
      }
    });
    window.dispatchEvent(openModal);
}

return (
  <>
    <div className="mx-auto flex justify-center item-center pt-10">
      <button onClick={() => window.location.href = "/"}><Image src="./logo.svg" width={154} height={34} alt="Logo image" /></button>
    </div>
    <div className="bg-[url('/pattern-2.png')] h-[300px] fixed bottom-0 w-full">
      <div className="relative bottom-[400px] mx-auto lg:w-[60%] w-full">
        <div className="text-center mt-10">
          <h1 className="section__title font-normal text-5xl inline"> Make L<Image src="/love.svg" width={42} height={33} alt="Love shot image" className="inline" />ve </h1>
          <h3 className="inline font-normal text-4xl section__subtext pl-5">Possible</h3>
        </div>
        <p className="text-center text-2xl">Upload a image of you and your partner</p>
        <div className={`${style.imageupload__layout} lg:mt-20 mt-5 border-2 border-dashed p-10 text-center rounded-lg`}>
          <div className="mx-auto" {...getRootProps()}>
          {/* <div className="mx-auto"> */}
            <div className="mx-auto w-[60px]">
              <Image src="./file-upload.svg" width={60} height={60} alt="image upload" />
            </div>
            <h4 className="text-center font-semibold my-3">Drag image here</h4>
            <p className="my-2">- or - </p>
            <button className="button button__create text-white py-2 px-7" onClick={handleImageUpload}>Upload Image </button>
            {/* <button className="button button__create text-white py-2 px-7" onClick={handleCropImageModal}>Upload Image </button> */}
            <form method="post" encType="multipart/form-data" style={{ opacity: "0" }}>
              <input type="file" ref={imageUploadRef} onChange={handleImageProcessing} accept="image/png, image/gif, image/jpeg" />
            </form>
          </div>
        </div>
        <span className="absolute bottom-[-30px] right-[-55px]">
          <Image src="./rose.svg" width={154} height={34} alt="rose image" />
        </span>
      </div>
    </div>
  </>
)
}
export default ImageUpload;