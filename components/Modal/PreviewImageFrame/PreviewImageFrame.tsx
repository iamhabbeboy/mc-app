import Image from "next/image";
import style from "./previewImageFrame.module.css";
import * as htmlToImage from 'html-to-image';
import { useEffect, useRef, useState } from "react";
import { ImageSelectionProps } from "../types";
import axios from "axios";
import { User } from "@/app/types";
import { FacebookShareButton, TwitterShareButton } from "react-share";

const PreviewImageFrame = ({ imageSelected }: ImageSelectionProps) => {
  const imageFrameRef = useRef(null);
  const imageRefPreview = useRef<HTMLDivElement>(null);
  const [imagePreview, setImagePreview] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User>();
  const [socialMediaUrl, setSocialMediaUrl] = useState("");
  const shareOnFacebookRef = useRef<HTMLButtonElement>(null)
  const shareOnTwitterRef = useRef<HTMLButtonElement>(null)
  const shareOnInstagramRef = useRef<HTMLButtonElement>(null)
  const [imageFramed, setImageFramed] = useState<File | null>(null)
  const [imageFramedUrl, setImageFramedUrl] = useState("");

  useEffect(() => {
    if (!imageSelected) {
      return alert("error occured while processing your photo, try again.");
    }
    const image = URL.createObjectURL(imageSelected)
    setImagePreview(image)
    handleImageFramed();
    if (imageRefPreview.current) {
      imageRefPreview.current.style.backgroundImage = `url(${image || "/sample.png"})`
    }
  }, [imageSelected]);

  const handleDownload = async () => {
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

      await storeUserInformation();
    }
  }

  const handleImageFramed = async () => {
    if (imageFrameRef.current) {
      htmlToImage.toPng(imageFrameRef.current)
        .then(function (blobUrl) {
          const config = { responseType: 'blob' } as any;
          axios.get(blobUrl, config).then(response => {
            const framed = new File([response.data], "fileName.png", { type: response.data.type, });
            setImageFramed(framed);
          });
        });
    }
  }
  const storeUserInformation = async () => {
    const user = JSON.parse(localStorage.getItem("mcom-data") || "");
    if(!user) {
      return alert("Error occured: Your user information is missing, kindly restart the process");
    }
    if (!imageSelected || !imageFramed) {
      return alert("Error occured while processing your data, try again by refreshing the page");
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("user", JSON.stringify(user));
    formData.append("image", imageFramed);
    try {
      const image = URL.createObjectURL(imageFramed)
      setImageFramedUrl(image);
      const resp = await axios.post(`${process.env.API_URI}/user`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setIsLoading(false);
      setUserInfo(resp.data.data);
      const userId = user?.id as string || "aaa"
      const metaUrl = `https://makelovepossible.mcom.ng/${userId}`
      setSocialMediaUrl(metaUrl)
    } catch (e) {
      console.log(e)
      alert("Error occured, kindly try again")
    }
  }

  const handleRestartProcess = () => {
    const closeModal = new CustomEvent("restart-modal");
    window.dispatchEvent(closeModal);
  }

  const handleShare = async (sn: string) => {
    let user = userInfo as User;
    if (!user) {
      await storeUserInformation();
    }
    const userId = user?.id as string || ""
    let fbUrl = ''
    const metaUrl = `https://makelovepossible.mcom.ng/${userId}`
    if (sn === "instagram") {
       fbUrl = `https://www.instagram.com/?url=${encodeURIComponent(metaUrl)}`;
    }else if(sn === "facebook") {
        fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(metaUrl)}`;
    } else if (sn === "x") {
        fbUrl = `http://x.com/share?url=${encodeURIComponent(metaUrl)}`
    }
    console.log(fbUrl)
    const windowFeatures = "left=100,top=100,width=520,height=520";
    const handle = window.open(fbUrl, "_blank", windowFeatures);
    if (!handle) {
      window.location.href = fbUrl;
    }
    // if (sn === "facebook") {
    //   if (shareOnFacebookRef.current) {
    //     shareOnFacebookRef.current.click();
    //   }
    // } else if (sn === "x") {
    //   if (shareOnTwitterRef.current) {
    //     shareOnTwitterRef.current.click();
    //   }
    // }
  }

  const handleCloseAll = () => {
    const closeModal = new CustomEvent("close-preview-modal");
    window.dispatchEvent(closeModal);
  }

  const handleEditImage = () => {
    const openModal = new CustomEvent("open-crop-image-modal", {
      detail: {
        file: imageSelected,
      }
    });
    window.dispatchEvent(openModal);
  }

  return (
    <>
      <div className="overflow-y-scroll h-screen">
        <div className="mx-auto flex py-10 justify-center item-center pt-10">
          <button onClick={() => window.location.href = "/"}><Image src="./logo.svg" width={154} height={34} alt="Logo image" /></button>
        </div>
        <div className="bg-[url('/pattern-2.png')] bg-repeat w-full">
          <h1 className="modal__title text-center py-10">Your <span>Make Love Possible</span> Image Is Ready!</h1>
          <div className={`rounded-[30px] sm:w-full lg:w-[60%] mx-auto md:py-10 pb-5 sm:py-5 ${style.frame__layout}`}>
            <div className="mx-auto lg:w-[450px] sm:w-full">
              <span className={`relative block left-[-380px] ${style.ring__circle}`}>
                <Image src="/love-circle.svg" width={159} height={132} alt="love circle image" />
              </span>
              <div className="w-[400px] mx-auto">
                {/* <div className={`bg-[url('/frame.png')] bg-no-repeat lg:w-[450px] sm:w-full lg:h-[562px] bg-red-500 h-[495px] bg-contain mx-auto ${style.image__previewLayout}`} ref={imageFrameRef}>
                <div className={`bg-no-repeat bg-center bg-contain lg:w-[350px] lg:h-[350px] w-[76%] h-[270px] relative top-[42px] left-[44px] lg:top-[46px] lg:left-[48px]`}>
                  <Image src={imagePreview} width={350} height={350} alt="" className="object-cover"/>
                </div> */}
                <div className={`bg-[url('/frame.png')] bg-no-repeat bg-center lg:w-[450px] sm:w-full lg:h-[562px] h-[495px] bg-contain mx-auto ${style.image__previewLayout}`} ref={imageFrameRef}>
                  {/* Works well for mobile screens */}
                  {/* <div className={`bg-no-repeat bg-center bg-contain lg:w-[350px] lg:h-[350px] w-[80.5%] h-[270px] relative top-[38px] left-[37.5px] lg:top-[46px] lg:left-[48px]`}>
                    <Image src={imagePreview} width={350} height={350} alt="" className="object-cover" />
                  </div> */}

                  <div className={`bg-no-repeat bg-center bg-contain lg:w-[370px] lg:h-[380px] w-[80.5%] h-[270px] relative top-[38px] left-[37.5px] lg:top-[42px] lg:left-[42px]`}>
                    <Image src={imagePreview} width={380} height={380} alt="" className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mx-auto mt-5">
              <div className={`flex justify-between my-5 mx-auto text-center ${style.button__layout}`}>
                <button className="button button__outline py-2 px-7" onClick={handleEditImage}>Edit Image </button>
                <button disabled={isLoading} className="button button__create text-white py-2 px-7" onClick={handleDownload}><span className="inline">Download Images </span>
                  <Image src="/download.svg" width={24} height={24} alt="download icon" className="inline" />
                </button>
              </div>
              {isLoading && <span> <img src="/loader.svg" width={24} height={24} alt="download icon" className="inline" /></span>}
              <div className="mt-5">
                <div className="mx-auto text-center lg:w-[40%] w-[60%] mb-8">
                  <h3>Share image on social media</h3>
                  <hr className="mt-5" />
                </div>
                <div className="flex justify-between mx-auto text-center lg:w-[20%] w-[70%]">
                  <div className={`rounded-full w-[40px] h-[40px] pt-1 cursor-pointer ${style.social__instagram}`} onClick={() => handleShare('instagram')}>
                    <Image src="/social-icons/instagram-fill.svg" width={24} height={24} alt="instagram icon" className="inline" />
                  </div>
                  <div className="rounded-full w-[40px] h-[40px] pt-1 bg-black cursor-pointer" onClick={() => handleShare('x')}>
                    <Image src="/social-icons/x-fill.svg" width={24} height={24} alt="instagram icon" className="inline" />
                  </div>
                  <div className="rounded-full w-[40px] h-[40px] pt-1 bg-blue-500 cursor-pointer" onClick={() => handleShare('facebook')}>
                    <Image src="/social-icons/facebook-fill.svg" width={24} height={24} alt="instagram icon" className="inline" />
                  </div>
                </div>
                {/* <TwitterShareButton ref={shareOnTwitterRef} hidden title="Share and make love possible" url={socialMediaUrl}>share on twitter</TwitterShareButton>
                <FacebookShareButton ref={shareOnFacebookRef} hidden title="Share and make love possible" url={socialMediaUrl}>share on facebook</FacebookShareButton> */}
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