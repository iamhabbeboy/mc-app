import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "./ canvasPreview";

const CropImage = ({ imageSelected }: { imageSelected?: File | null }) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  })
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)
  const [imgSrc, setImgSrc] = useState('/sample.png')

  useEffect(() => {
    if(imageSelected) {
      const url = URL.createObjectURL(imageSelected)
      setImgSrc(url);
    }
  }, [imageSelected])
  // useDebounceEffect(
  //   async () => {
  //     if (
  //       completedCrop?.width &&
  //       completedCrop?.height &&
  //       imgRef.current &&
  //       previewCanvasRef.current
  //     ) {
  //       // We use canvasPreview as it's much faster than imgPreview.
  //       canvasPreview(
  //         imgRef.current,
  //         previewCanvasRef.current,
  //         completedCrop,
  //         scale,
  //         rotate,
  //       )
  //     }
  //   },
  //   100,
  //   [completedCrop, scale, rotate],
  // )

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  const handleCloseCropImage = () => {
    const closeModal = new CustomEvent("close-crop-image-modal");
    window.dispatchEvent(closeModal);
  }

  const handlePreviewImage = () => {
    const closeModal = new CustomEvent("open-preview-modal");
    window.dispatchEvent(closeModal);
  }

  return (
    <>
      <div className="mx-auto flex justify-between">
        <div>{""}</div>
        <h1 className="modal__title text-center">Pan and crop image</h1>
        <button onClick={handleCloseCropImage}><Image src="/times.svg" width={40} height={40} alt="Close modal" /> </button>
      </div>
      <div className="bg-skyblue p-10 mt-10">
        <div className="w-[300px] mx-auto">
          {/* <ReactCrop crop={crop} onChange={c => setCrop(c)} minHeight={100} aspect={aspect}> */}
          <img src={imgSrc} alt="" width={384} height={498} refs={imgRef} />
          {/* <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
          </ReactCrop> */}
        </div>
      </div>
      <div className="mx-auto text-center mt-5">
        <button className="button button__create text-white py-2 px-7" onClick={handlePreviewImage}>Done </button>
        <p className="mt-5">{" "}</p>
        <button className="button button__outline py-2 px-7" onClick={() => { }}>Re-Upload Image </button>
      </div>
    </>
  )
}
export default CropImage;