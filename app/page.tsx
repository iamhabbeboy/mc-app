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

export default function Home() {
  const [formModal, setFormModal] = useState(false);
  const [restartModal, setRestartModal] = useState(false);
  const [instructionModal, setInstructionModal] = useState(false);
  const [imageUploadModal, setImageUploadModal] = useState(false);
  const [closeCropImageModal, setCloseCropImageModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);

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

  useEffect(() => {
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

  return (
    <main>
      <Header />
      <section className="lg:flex lg:justify-between container mx-auto">
        <div className={`lg:w-6/12 sm:w-full md:px-10 section__layout`}>
          <h1 className="section__title text-5xl lg:mt-48 mt-20"> Make L<Image src="/love.svg" width={42} height={33} alt="Love shot image" className="inline" />ve </h1>
          <h3 className="text-4xl section__subtext">Possible</h3>
          <p className="section__paragraph">Share your love story and be among 3 lucky couples to win an all-expense-paid dinner this Valentine</p>
          <div className="lg:flex mt-10 w-full button__layout"> 
            <button className="button button__create text-white py-2 px-7" onClick={handleImageUploadModal}>Create Filter Now </button>
            <button className="button button__outline py-2 px-7 ml-10" onClick={handleHowToCreateModal}>How To Create </button>
          </div>
        </div>
        <div className="hero__image lg:w-6/12 w-full">
          <Image src="/love-shot.png" width={654} height={689} alt="Love shot image" />
        </div>
      </section>
      {instructionModal && <Modal size="default">
        <Instruction />
      </Modal>}
      {formModal && <Modal size="medium">
        <Form />
      </Modal>}
      {imageUploadModal && <Modal size="full">
        <ImageUpload />
      </Modal>}
      {closeCropImageModal && <Modal size="medium">
        <CropImage imageSelected={imageSelected}/>
      </Modal>}
      {previewModal && <Modal size="full">
        <PreviewImageFrame imageSelected={imageSelected} />
      </Modal>}
    </main>
  );
}
