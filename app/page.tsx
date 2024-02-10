"use client";
import Header from "@/components/Header/Header";
import CropImage from "@/components/Modal/CropImage/CropImage";
import Form from "@/components/Modal/Form";
import ImageUpload from "@/components/Modal/ImageUpload/ImageUpload";
import Instruction from "@/components/Modal/Instruction";
import Modal from "@/components/Modal/ModalLayout";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [instructionModal, setInstructionModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [imageUploadModal, setImageUploadModal] = useState(false);
  const [closeCropImageModal, setCloseCropImageModal] = useState(false);

  const handleHowToCreateModal = useCallback(() => {
    setInstructionModal(!instructionModal);
  }, [instructionModal]);

  const handleCloseCropImageModal = useCallback(() => {
    setCloseCropImageModal(!closeCropImageModal);
  }, [closeCropImageModal]);

  const handleImageUploadModal = useCallback(() => {
    setImageUploadModal(true);
    setTimeout(() => {
      setFormModal(true)
    }, 1000)
  }, []);

  useEffect(() => {
    window.addEventListener("close-form-modal", () => {
      setFormModal(false)
      setImageUploadModal(false)
    });
    window.addEventListener("close-instruction-modal", handleHowToCreateModal);
    window.addEventListener("close-crop-image-modal", handleCloseCropImageModal);
    window.addEventListener("close-image-upload-modal", () => {
      setFormModal(false)
      setImageUploadModal(false)
    });
    return () => {
      window.addEventListener("close-crop-image-modal", handleCloseCropImageModal);
      window.removeEventListener("close-instruction-modal", handleHowToCreateModal);
      window.addEventListener("close-form-modal", () => {
        setFormModal(false)
        setImageUploadModal(false)
      });
      window.addEventListener("close-image-upload-modal",  () => {
        setFormModal(false)
        setImageUploadModal(false)
      });
    };
  }, [handleHowToCreateModal, handleImageUploadModal]);

  return (
    <main>
      <Header />
      <section className="flex justify-between container mx-auto">
        <div className="w-4/12">
          <h1 className="section__title text-5xl mt-48"> Make L<Image src="/love.svg" width={42} height={33} alt="Love shot image" className="inline" />ve </h1>
          <h3 className="text-4xl section__subtext">Possible</h3>
          <p className="section__paragraph">Share your love story and be among 3 lucky couples to win an all-expense-paid dinner this Valentine</p>
          <div className="flex mt-10">
            <button className="button button__create text-white py-2 px-7" onClick={handleImageUploadModal}>Create Filter Now </button>
            <button className="button button__outline py-2 px-7 ml-10" onClick={handleHowToCreateModal}>How To Create </button>
          </div>
        </div>
        <div className="hero__image w-6/12">
          {/* <Image src="/love-shot.png" width={654} height={689} alt="Love shot image" /> */}
        </div>
      </section>
      {instructionModal && <Modal size="default">
        <Instruction />
      </Modal>}
      {formModal && <Modal size="medium">
        <Form />
      </Modal>}
      {imageUploadModal &&<Modal size="full">
        <ImageUpload />
      </Modal>}
      {closeCropImageModal && <Modal size="medium">
        <CropImage />
      </Modal>}
    </main>
  );
}
