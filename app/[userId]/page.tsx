import { Metadata } from "next";
import style from "./imageUrl.module.css"
import Image from "next/image";
import { useRef } from "react";
import * as htmlToImage from 'html-to-image';
import { User } from "@/app/types";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }: { params: {userId: string } }): Promise<Metadata> {
  const {data} = await getPostByImageUrl(params.userId);
  const resp = data as User;
  return {
    metadataBase: new URL(process.env.BASE_URI as string),
    title: "Share your image - Make love possible",
    description: "Share your love story and be among 4 lucky couples to win an all-expense-paid dinner this Valentine",
    openGraph: {
      url: `${process.env.BASE_URI}/${resp.image}`,
      title: "Make love possible",
      description: "Share your love story and be among 4 lucky couples to win an all-expense-paid dinner this Valentine",
      images: [
        {
          url: `${resp.image}`,
          alt: "Make love possible Image preview",
        },
      ],
      type: "website",
    },
    twitter: {
      title: "Make love possible Image preview",
      description: "Share your love story and be among 4 lucky couples to win an all-expense-paid dinner this Valentine",
      images: [
        resp.image,
      ],
      card: "summary_large_image",
    },
  };
}

async function getPostByImageUrl(userId: string) {
  const uri = `${process.env.API_URI}/metadata/${userId}`
  const response = await fetch(uri);
  return response.json();
}
export default async function ImageShare({ params }: { params: {userId: string } }) {
  const {data} = await getPostByImageUrl(params.userId);
  const resp = data as User;
  if(!resp) {
    redirect("/")
  }

  const handleDownload = async () => {
  }

  return (
    <>
      <div className="overflow-auto h-screen">
        <div className="mx-auto flex py-10 justify-center item-center pt-10">
          <Link href="/"><Image src="/logo.svg" width={154} height={34} alt="Logo image" /></Link>
        </div>
        <div className="bg-[url('/pattern-2.png')] bg-repeat w-full">
          <h1 className="modal__title text-center py-10">Your <span>Make Love Possible</span> Image Is Ready!</h1>
          <div className={`rounded-[30px] sm:w-full lg:w-[60%] mx-auto md:py-10 pb-5 sm:py-5 ${style.frame__layout}`}>
            <div className="mx-auto lg:w-[450px] sm:w-full">
              <span className={`relative block left-[-380px] ${style.ring__circle}`}>
                <Image src="/love-circle.svg" width={159} height={132} alt="love circle image" />
              </span>
              <div className="w-[400px] mx-auto">
                {/* <div className={`bg-no-repeat lg:w-[450px] sm:w-full lg:h-[562px] h-[495px] bg-contain mx-auto ${style.image__previewLayout}`}> */}
                  {/* <div className={`bg-no-repeat bg-center bg-contain lg:w-[370px] lg:h-[380px] w-[80.5%] h-[270px] relative top-[38px] left-[37.5px] lg:top-[42px] lg:left-[42px]`}> */}
                    <img src={resp.image} width={380} height={380} alt="Make love possible image" className="object-cover" />
                  {/* </div> */}
                {/* </div> */}
              </div>
            </div>
            <div className="text-center mx-auto mt-5">
              <div className={`flex justify-center my-5 mx-auto text-center ${style.button__layout}`}>
                <Link href={resp.image} target="_blank" className="button button__create text-white py-2 px-7"><span className="inline">Download Images </span>
                  <Image src="/download.svg" width={24} height={24} alt="download icon" className="inline" />
                </Link>
              </div>
              <div className="mt-5">
                <div className="mx-auto text-center lg:w-[40%] w-[60%] mb-8">
                  {/* <h3>Share image on social media</h3>
                  <hr className="mt-5" /> */}
                </div>
                <p>{""}</p>
              </div>
            </div>
          </div>
          <div className="py-10">{" "} </div>
        </div>
      </div>
    </>
  )
}