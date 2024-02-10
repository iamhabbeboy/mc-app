import Image from "next/image";
import style from "./previewImageFrame.module.css";
import * as htmlToImage from 'html-to-image';
import { useRef } from "react";

const PreviewImageFrame = () => {
  const imageFrameRef = useRef(null);
  const handleDownload = async () => {
    console.log("Downloading image...")
    if (imageFrameRef.current) {
        htmlToImage.toPng(imageFrameRef.current)
          .then(function (dataUrl) {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'mcom-love-possible.png';
            link.click();
          })
          .catch(function (error) {
            console.error(error);
            alert('Error occured, kindly refresh the page and try again.');
          });
    }
  }

  const handleRestartProcess = () => {
    const closeModal = new CustomEvent("restart-modal");
    window.dispatchEvent(closeModal);
  }

  const handleCloseAll = () => {
    const closeModal = new CustomEvent("close-preview-modal");
    window.dispatchEvent(closeModal);
  }
  return (
    <>
      <div className="overflow-auto h-screen">
        <div className="mx-auto flex py-10 justify-center item-center pt-10">
          <button onClick={handleCloseAll}><Image src="./logo.svg" width={154} height={34} alt="Logo image" /></button>
        </div>
        <div className="bg-[url('/pattern-2.png')] bg-repeat w-full">
          <h1 className="modal__title text-center py-10">Your <span>Make Love Possible</span> Image Is Ready!</h1>
          <div className={`rounded-[30px] w-[60%] mx-auto py-10 ${style.frame__layout}`}>
            <div className="mx-auto w-[450px]">
              <span className="relative left-[-380px]">
                <Image src="/love-circle.svg" width={159} height={132} alt="love circle image" />
              </span>
              <div className="bg-[url('/frame.png')] w-[450px] h-[562px] bg-contain" ref={imageFrameRef}>
                <div className="flex justify-center">
                  <Image src="/sample.png" width={280} height={280} alt="Frame layout" className="mt-12" />
                </div>
              </div>
            </div>
            <div className="text-center mx-auto mt-5">
              <div className="flex justify-between my-5 mx-auto text-center w-[30%]">
                <button className="button button__outline py-2 px-7" onClick={() => { }}>Edit Image </button>
                <button className="button button__outline py-2 px-7" onClick={() => { }}>Edit Love Story </button>
              </div>
              <button className="button button__create text-white py-2 px-7" onClick={handleDownload}><span className="inline">Download Images </span>
                <Image src="/download.svg" width={24} height={24} alt="download icon" className="inline" />
              </button>
              <div className="mt-5">
                <div className="mx-auto text-center w-[40%] mb-8">
                  <h3>Share image on social media</h3>
                  <hr className="mt-5" />
                </div>
                <div className="flex justify-between mx-auto text-center w-[20%]">
                  <div className={`rounded-full w-[40px] h-[40px] pt-1 cursor-pointer ${style.social__instagram}`}>
                    <Image src="/social-icons/instagram-fill.svg" width={24} height={24} alt="instagram icon" className="inline" />
                  </div>
                  <div className="rounded-full w-[40px] h-[40px] pt-1 bg-black cursor-pointer">
                    <Image src="/social-icons/x-fill.svg" width={24} height={24} alt="instagram icon" className="inline" />
                  </div>
                  <div className="rounded-full w-[40px] h-[40px] pt-1 bg-blue-500 cursor-pointer">
                    <Image src="/social-icons/facebook-fill.svg" width={24} height={24} alt="instagram icon" className="inline" />
                  </div>
                </div>
                <p>{""}</p>
                <button className="button button__outline mt-5 py-2 px-7" onClick={handleCloseAll}>Restart </button>
              </div>
            </div>
          </div>
          <div className="py-10">{" "} </div>
        </div>
      </div>
    </>
  )
}
export default PreviewImageFrame;