import Image from "next/image";

const Instruction = () => {
  const handleCloseModal = () => {
    const instructionModal = new CustomEvent("close-instruction-modal");
    window.dispatchEvent(instructionModal);
  };
  return (
    <div className="overflow-scroll h-screen">
      <div className="mx-auto lg:flex lg:justify-between w-full">
        <div>{""}</div>
        <Image src="./logo.svg" width={154} height={34} alt="Logo image" />
        <button onClick={handleCloseModal}><Image src="/times.svg" width={40} height={40} alt="Close modal" /> </button>
      </div>
      <div className="mx-auto lg:w-[80%] w-full">
        <h1 className="modal__title mt-10 text-center"> How To Create Your <span>Make Love Possible</span> Filter </h1>
        <div className="modal__content">
          <p>1. Enter the name and location of both you and your partner</p>
          <p>2. Upload a photo containing you and your partner. Do not use any sexual, illegal or offensive images. Be cool!</p>
          <p>3. Download your Make Love Possible filter images.</p>
          <p>4. Share online, including your “story” as caption to your post.</p>
        </div>
        <div className="mx-auto text-center">
          <button className="button button__create text-white py-2 px-7">Create Filter Now </button>
        </div>
      </div>
    </div>
  )
}
export default Instruction;