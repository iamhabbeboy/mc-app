"use client";
import Header from "@/components/Header/Header";
import CropImage from "@/components/Modal/CropImage/CropImage";
import Form from "@/components/Modal/Form/Form";
import ImageUpload from "@/components/Modal/ImageUpload/ImageUpload";
import Instruction from "@/components/Modal/Instruction/Instruction";
import Modal from "@/components/Modal/ModalLayout/ModalLayout";
import PreviewImageFrame from "@/components/Modal/PreviewImageFrame/PreviewImageFrame";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import 'animate.css';
import { useRouter } from 'next/navigation'
import style from "./home.module.css"

export default function Home() {
  const [formModal, setFormModal] = useState(false);
  const [restartModal, setRestartModal] = useState(false);
  const [instructionModal, setInstructionModal] = useState(false);
  const [imageUploadModal, setImageUploadModal] = useState(false);
  const [closeCropImageModal, setCloseCropImageModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);

  const router = useRouter();

  const handleHowToCreateModal = useCallback(() => {
    setInstructionModal(!instructionModal);
  }, [instructionModal]);

  const handleCropImageModal = useCallback((data: any) => {
    setImageSelected(data.detail.file);
    if (closeCropImageModal === true) {
      setFormModal(false);
    }
    setCloseCropImageModal(!closeCropImageModal);
  }, [closeCropImageModal]);

  const handleCloseCropImageModal = useCallback(() => {
    setCloseCropImageModal(false);
  }, []);

  const handleImageUploadModal = useCallback(() => {
    setImageUploadModal(true);
    setTimeout(() => {
      setFormModal(true)
    }, 1000)
  }, []);
  const hanleCloseAllModal = useCallback(() => {
    setImageUploadModal(false);
    setFormModal(false);
  }, []);

  const handleRestartModal = () => {
    setRestartModal(false)
  }

  const handlePreviewModal = () => {
    setCloseCropImageModal(false);
    setPreviewModal(true);
  }

  const handleClosePreviewModal = () => {
    setPreviewModal(false);
    setImageUploadModal(false);
  }
  
  const handleOpenImageUploadModal = () => {
    setInstructionModal(false);
    setImageUploadModal(true);
    setTimeout(() => {
      setFormModal(true)
    }, 1000)
  }

  const handleImageEditUploadModal = () => {
    setPreviewModal(false);
    setCloseCropImageModal(false);
    setInstructionModal(false);
    setImageUploadModal(true);
    setFormModal(false)
  }

  useEffect(() => {
    window.addEventListener("edit-image-upload-modal", handleImageEditUploadModal);
    window.addEventListener("open-image-upload-modal", handleOpenImageUploadModal);
    window.addEventListener("close-preview-modal", handleClosePreviewModal);
    window.addEventListener("open-preview-modal", handlePreviewModal);
    window.addEventListener("restart-modal", handleRestartModal);
    window.addEventListener("close-all-form-modal", hanleCloseAllModal);
    window.addEventListener("close-form-modal", () => setFormModal(false));
    window.addEventListener("close-instruction-modal", handleHowToCreateModal);
    window.addEventListener("open-crop-image-modal", handleCropImageModal);
    window.addEventListener("close-crop-image-modal", handleCloseCropImageModal);
    window.addEventListener("close-image-upload-modal", () => {
      setImageUploadModal(false)
    });
    return () => {
      window.addEventListener("edit-image-upload-modal", handleImageEditUploadModal);
      window.addEventListener("open-image-upload-modal", handleOpenImageUploadModal);
      window.addEventListener("close-preview-modal", handleClosePreviewModal);
      window.addEventListener("open-preview-modal", handlePreviewModal);
      window.addEventListener("restart-modal", handleRestartModal);
      window.addEventListener("close-all-form-modal", hanleCloseAllModal);
      window.addEventListener("close-crop-image-modal", handleCloseCropImageModal);
      window.addEventListener("open-crop-image-modal", handleCropImageModal);
      window.removeEventListener("close-instruction-modal", handleHowToCreateModal);
      window.addEventListener("close-form-modal", () => {
        setFormModal(false)
      });
      window.addEventListener("close-image-upload-modal", () => {
        setImageUploadModal(false)
      });
    };
  }, [handleCloseCropImageModal, handleCropImageModal, handleHowToCreateModal, handleImageUploadModal, hanleCloseAllModal]);

  const [formModalTracker, setFormModalTracker] = useState(false);
  const [initialtrack, setInitialTrack] = useState(false);

  useEffect(() => {
    if(instructionModal) {
      setInitialTrack(true);
    }
  }, [closeCropImageModal, formModal, imageUploadModal, instructionModal])

  return (
    <main>
      <Header />
      <section className="lg:flex lg:justify-between container mx-auto">
        <div className={`lg:w-6/12 sm:w-full md:px-10 section__layout`}>
          <h1 className="section__title text-5xl lg:mt-48 mt-20"> Make L<Image src="/love.svg" width={42} height={33} alt="Love shot image" className="inline" />ve </h1>
          <h3 className="text-4xl section__subtext">Possible</h3>
          <p className="section__paragraph">Share your love story and be among 4 lucky couples to win an all-expense-paid dinner this Valentine</p>
          <div className={`mt-10 w-full ${style.home__button} button__layout`}> 
            <button className="button button__create text-white py-2 px-7" onClick={() => router.push("/create-filter")}>Create Filter Now </button>
            <button className="button button__outline py-2 px-7 ml-10" onClick={handleHowToCreateModal}>How To Create </button>
          </div>
        </div>
        <div className="lg:w-6/12 w-full pt-3">
          <div className="absolute">
            <iframe className="hidden sm:hidden md:block lg:block relative top-[-55px] left-[40px]" src="https://lottie.host/embed/8d95feaa-3839-44ef-973f-3d1c12e2324e/lSlaLwdhIt.json"></iframe>
            <iframe className="hidden sm:hidden md:block lg:block relative top-[-200px] left-[350px]" src="https://lottie.host/embed/8d95feaa-3839-44ef-973f-3d1c12e2324e/lSlaLwdhIt.json"></iframe>
          </div>
            <img src="/love-shot.png" width={654} height={689} alt="Love shot image" />
          {/* <img srcset="/love-shot.png 240w, medium.png 480w, /love-shot.png 960w" sizes="(min-width: 36em) 33.3vw,100vw" src="/love-shot.png" /> */}
        </div>
      </section>
      <Modal size="default"  className={instructionModal ? 'animate__slideInUp' : initialtrack ? 'animate__slideOutDown' :  'hidden'}>
        <Instruction />
      </Modal>
    </main>
  );
}
