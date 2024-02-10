import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <div className="w-full p-5">
      <div className="container mx-auto flex justify-between">
        <div><Image src="./logo.svg" width={154} height={34} alt="Logo image" /></div>
        <div>
          <Link href="#" className="inline-block px-3">
            <Image src="./social-icons/facebook.svg" width={24} height={24} alt="facebook icon" />
          </Link>
          <Link href="#" className="inline-block px-3">
            <Image src="./social-icons/x.svg" width={24} height={24} alt="x icon" />
          </Link>
          <Link href="#" className="inline-block px-3">
            <Image src="./social-icons/instagram.svg" width={24} height={24} alt="instagram icon" />
          </Link>
          <Link href="#" className="inline-block px-3">
            <Image src="./social-icons/linkedin.svg" width={24} height={24} alt="linkedin icon" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header;