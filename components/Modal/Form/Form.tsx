import Image from "next/image";
import CheckBox from "../../CheckBox/CheckBox";
import { useRef, useState } from "react";

const Form = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const userAddressRef = useRef<HTMLInputElement>(null);
  const partnerNameRef = useRef<HTMLInputElement>(null);
  const partnerAddressRef = useRef<HTMLInputElement>(null);
  const [ackStatus, setAckStatus] = useState(false);

  const handleCloseAllModal = () => {
    const instructionModal = new CustomEvent("close-all-form-modal");
    window.dispatchEvent(instructionModal);
  };

  const handleCloseForm = () => {
    if (userNameRef.current) {
      if (userNameRef.current.value === "") {
        return userNameRef.current.focus();
      }
    }
    if (userAddressRef.current) {
      if (userAddressRef.current.value === "") {
        return userAddressRef.current.focus();
      }
    }

    if (partnerNameRef.current) {
      if (partnerNameRef.current.value === "") {
        return partnerNameRef.current.focus();
      }
    }

    if (partnerAddressRef.current) {
      if (partnerAddressRef.current.value === "") {
        return partnerAddressRef.current.focus();
      }
    }
    const payload = {
      user: {
        name: userNameRef.current?.value,
        address: userNameRef.current?.value
      },
      partner: {
        name: partnerNameRef.current?.value,
        address: partnerAddressRef.current?.value
      }
    }

    if(ackStatus === false) {
      return alert("Kindly accept the terms and condition before you proceed!");
    }
    localStorage.setItem("mcron-data", JSON.stringify(payload));
    const openModal = new CustomEvent("close-form-modal");
    window.dispatchEvent(openModal);
  }
  return (
    <>
      <div className="mx-auto w-[80%]">
        <h1 className="modal__title text-center"> Enter details </h1>
        <h2 className="mt-5 text-2xl text-center">Enter your name and precise address</h2>
        <div className="mt-10">
          <div className="flex justify-between">
            <div className="w-[45%]">
              <label>Your Name</label>
              <input type="text" className="input-form rounded-full px-4 py-2 w-full" placeholder="eg Jerry" ref={userNameRef} />
            </div>
            <div className="w-[45%]">
              <label>Your Address</label>
              <input type="text" className="input-form rounded-full px-4 py-2 w-full" placeholder="eg 3, Oni street, Alausa, Ikeja.Lagos" ref={userAddressRef} />
            </div>
          </div>
        </div>
        <h2 className="mt-5 text-2xl text-center">Enter your partner&apos;s name and precise address</h2>
        <div className="mt-5">
          <div className="flex justify-between">
            <div className="w-[45%]">
              <label>Your Name</label>
              <input type="text" className="input-form rounded-full px-4 py-2 w-full" placeholder="eg Jerry" ref={partnerNameRef} />
            </div>
            <div className="w-[45%]">
              <label>Your Address</label>
              <input type="text" className="input-form rounded-full px-4 py-2 w-full" placeholder="eg 3, Oni street, Alausa, Ikeja.Lagos" ref={partnerAddressRef} />
            </div>
          </div>
        </div>
        <div className="modal__content modal__ack">
          <div className="flex">
            <div><CheckBox setAckStatus={setAckStatus} /></div>
            <div> I understand that my provided information, including names and location, will be used solely for the purpose of generating personalized images for this Valentine&apos;s competition. I acknowledge that my data will be kept confidential and will not be shared with any third parties.</div>
          </div>
        </div>
        <div className="mx-auto text-center">
          <button className="button button__create text-white py-2 px-7" onClick={handleCloseForm}>Proceed To Upload Image </button>
          <p className="mt-5">{" "}</p>
          <button className="button button__outline py-2 px-7" onClick={handleCloseAllModal}>Go Back </button>
        </div>
      </div>
    </>
  )
}
export default Form;