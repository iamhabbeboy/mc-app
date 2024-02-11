"use client";
import CropImage from "@/components/Modal/CropImage/CropImage";
import Form from "@/components/Modal/Form/Form";
import ImageUpload from "@/components/Modal/ImageUpload/ImageUpload";
import Modal from "@/components/Modal/ModalLayout/ModalLayout";
import PreviewImageFrame from "@/components/Modal/PreviewImageFrame/PreviewImageFrame";
import { useCallback, useEffect, useState } from "react";

const CreateFilter = () => {
  const [formModal, setFormModal] = useState(false);
  const [restartModal, setRestartModal] = useState(false);
  const [instructionModal, setInstructionModal] = useState(false);
  const [imageUploadModal, setImageUploadModal] = useState(false);
  const [closeCropImageModal, setCloseCropImageModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  
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
    setFormModal(true);
  }, [])

  useEffect(() => {
    window.addEventListener("edit-image-upload-modal", handleImageEditUploadModal);
    window.addEventListener("open-image-upload-modal", handleOpenImageUploadModal);
    window.addEventListener("close-preview-modal", handleClosePreviewModal);
    window.addEventListener("open-preview-modal", handlePreviewModal);
    window.addEventListener("restart-modal", handleRestartModal);
    window.addEventListener("close-all-form-modal", hanleCloseAllModal);
    window.addEventListener("close-form-modal", () => setFormModal(false));
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
      window.addEventListener("close-form-modal", () => {
        setFormModal(false)
      });
      window.addEventListener("close-image-upload-modal", () => {
        setImageUploadModal(false)
      });
    };
  }, [handleCloseCropImageModal, handleCropImageModal, handleImageUploadModal, hanleCloseAllModal]);

  const [formModalTracker, setFormModalTracker] = useState(false);
  const [initialtrack, setInitialTrack] = useState(false);
  const [imgUploadTracker, setImgUploadTracker] = useState(false);
  const [cropImageTracker, setCropImageTracker] = useState(false);
  
  useEffect(() => {
    if(instructionModal) {
      setInitialTrack(true);
    }
    if(formModal) {
      setFormModalTracker(true);
    }
    if(imageUploadModal) {
      setImgUploadTracker(true);
    }
    if(closeCropImageModal) {
      setCropImageTracker(true)
    }
  }, [closeCropImageModal, formModal, imageUploadModal, instructionModal])
  
  return (
    <>
      <ImageUpload />
      <Modal size="medium" className={formModal ? 'animate__slideInUp' : formModalTracker ? 'animate__slideOutDown' :  'hidden'}>
        <Form />
      </Modal>

       <Modal size="full" className={imageUploadModal ? 'animate__slideInRight' : imgUploadTracker ? 'animate__slideOutLeft' :  'hidden'}>
        <ImageUpload />
      </Modal>

      <Modal size="medium"  className={closeCropImageModal ? 'animate__slideInUp' : cropImageTracker ? 'animate__slideOutDown' :  'hidden'}>
        <CropImage imageSelected={imageSelected}/>
      </Modal>
      {previewModal && <Modal size="full">
        <PreviewImageFrame imageSelected={imageSelected} />
      </Modal>}
    </>
  )
}
export default CreateFilter;