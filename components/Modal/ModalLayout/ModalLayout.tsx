import { Props } from "../types";
import 'animate.css';

const Modal = ({ children, size, className }: Props) => {
  const defaultSize = size === "default" ? "fixed items-center  flex justify-center animate__slideUp": ""; 
  const defaultSizeContent = size === "default" ? "lg:w-[50%] w-full" : "";
  const mediumSize = size === "medium" ? "mt-5 lg:w-[70%] md:w-[90%] w-full mx-auto": "";
  const mediumLayout = size === "medium" ? "lg:fixed absolute" : ""
  const fullContentSize = size === "full" ? "lg:fixed absolute z-0" : "z-20";
  const fullContent = size === "full" ? " h-screen" : "rounded-[40px] shadow-md p-10";

  return (
    <section className={`${fullContentSize} ${defaultSize} ${mediumLayout} left-0 top-0  animate__animated ${className}  bg-black bg-opacity-50 w-screen h-screen`}>
    {/*<section className={`${defaultSize} fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen ${fullContentSize}`}>*/}
      <div className={`bg-white ${fullContent} ${mediumSize} ${defaultSizeContent}`}> {children} </div>
    </section>
  )
}
export default Modal;