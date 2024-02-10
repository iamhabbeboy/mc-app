import { Props } from "./types";

const Modal = ({ children, size }: Props) => {
  const defaultSize = size === "default" ? "items-center  flex justify-center": ""; 
  const defaultSizeContent = size === "default" ? "w-[40%]" : "";
  const mediumSize = size === "medium" ? "mt-5 w-[60%] mx-auto ": "";
  const fullContentSize = size === "full" ? "z-0" : "z-20";
  const fullContent = size === "full" ? "h-screen" : "rounded-[40px] shadow-md p-10";

  return (
    <section className={`${defaultSize} fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen ${fullContentSize}`}>
      <div className={`bg-white ${fullContent} ${mediumSize} ${defaultSizeContent}`}> {children} </div>
    </section>
  )
}
export default Modal;