import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import Cropper from "react-easy-crop";
import EasyCrop from "./EasyCrop";
import { ImageSelectionProps } from "../types";

const CropImage = ({ imageSelected }: ImageSelectionProps) => {
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)
  const [imgSrc, setImgSrc] = useState('/sample.png')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels)
  }
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

  const handlePreviewImage = () => {
    const closeModal = new CustomEvent("open-preview-modal", {
      detail: {
        file: imageSelected,
      }
    });
    window.dispatchEvent(closeModal);
  }

  return (
    <div className="overflow-auto h-screen">
      <div className="mx-auto flex justify-between">
        <div>{""}</div>
        <h1 className="modal__title text-center">Pan and crop image</h1>
        <button onClick={handleCloseCropImage}><Image src="/times.svg" width={40} height={40} alt="Close modal" /> </button>
      </div>
      <div className="bg-black p-10 mt-10">
        <div className="w-[300px] mx-auto">
          <img src={imgSrc} alt="" width={384} height={498} style={{width: "100%"}} />
          {/* <div className=""> */}
          {/* <EasyCrop  /> */}
          {/* <Cropper
            image={imgSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          /> */}
          {/* </div> */}
        </div>
      </div>
      <div className="mx-auto text-center mt-5 mb-20">
        <button className="button button__create text-white py-2 px-7" onClick={handlePreviewImage}>Done </button>
        <p className="mt-5">{" "}</p>
        <button className="button button__outline py-2 px-7" onClick={() => { }}>Re-Upload Image </button>
      </div>
      <div className="py-10">{" "} </div>
    </div>
  )
}
export default CropImage;