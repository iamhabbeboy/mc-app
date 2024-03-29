import Image from "next/image";
import { useEffect, useRef } from "react";
import 'animate.css';
import "./instruction.module.css";
import { useRouter } from "next/navigation";

const Instruction = () => {
  const instructionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(instructionRef.current) {
      instructionRef.current.classList.add('opacity-100') //translate-y-0
      instructionRef.current.classList.add('translate-y-0');
    }
  }, []);

  const handleCloseModal = () => {
    const instructionModal = new CustomEvent("close-instruction-modal");
    window.dispatchEvent(instructionModal);
  };

  const router = useRouter();

  return (
    <div className="" ref={instructionRef}>
      <div className="mx-auto flex justify-between w-full">
        <div className="modal__emptyspace">{""}</div>
        <Image src="./logo.svg" width={154} height={34} alt="Logo image" />
        <button onClick={handleCloseModal}><Image src="/times.svg" width={40} height={40} alt="Close modal" /> </button>
      </div>
      <div className="mx-auto lg:w-[80%] w-full">
        <h1 className="modal__title mt-10 text-center"> How To Create Your <span>Make Love Possible</span> Filter </h1>
        <div className="modal__content overflow-scroll h-[200px]">
          <ul className="list-disc">
            <li><p>Enter the name and location of both you and your partner</p></li>
            <li><p>Proceed to upload an image of you and your partner and the mcom filter will be added</p></li>
            <li><p>Download your Make Love Possible image</p></li>
            <li><p>Share to your Instragram, Facebook or X feeds along with your story</p></li>
            <li><p>Use the hashtag #makelovepossible and tag @mcomnigeria</p></li>
            <li><p>Couples must be following @mcomnigeria on all social media platforms</p></li>
          </ul>
          <p>
            N.B: Entries will be judged based on empathy, authenticity and relatability.
          </p>
          <p>Submissions close Feb. 14th, 2024 at 11:59 pm.</p>
          <p>One couple will be selected from each of the following locations (Lagos, Abuja, Port Harcourt & Kano) and winners will be announced on Feb. 16th, 2024.</p>
          <p>Terms &amp; Conditions apply!</p>
        </div>
        <div className="mx-auto text-center">
          <button className="button button__create text-white py-2 px-7" onClick={() => router.push("/create-filter")}>Create Filter Now </button>
        </div>
      </div>
    </div>
  )
}
export default Instruction;