import Image from "next/image";

const CropImage = () => {
    const handleCloseCropImage = () => {
        const closeModal = new CustomEvent("close-crop-image-modal");
        window.dispatchEvent(closeModal);
    }

    return (
        <>
            <div className="mx-auto flex justify-between">
                <div>{""}</div>
                <h1 className="modal__title text-center">Pan and crop image</h1>
                <button onClick={handleCloseCropImage}><Image src="/times.svg" width={40} height={40} alt="Close modal" /> </button>
            </div>
            <div className="bg-black p-10 mt-10">
                <div className="w-[200px] mx-auto">
                    <Image src="/sample.png" width={284} height={498} alt="Sample image" />
                </div>
            </div>
            <div className="mx-auto text-center mt-5">
                <button className="button button__create text-white py-2 px-7">Done </button>
                <p className="mt-5">{" "}</p>
                <button className="button button__outline py-2 px-7" onClick={() => { }}>Re-Upload Image </button>
            </div>
        </>
    )
}
export default CropImage;