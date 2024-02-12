import Image from "next/image";
import Link from "next/link";
import style from "./header.module.css"
import Script from "next/script";
const Header = () => {
  return (
    <>
    <Script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module" />
    <div className="w-full p-5">
      <div className="container mx-auto flex justify-between">
        <div><Image src="./logo.svg" width={154} height={34} alt="Logo image" /></div>
        <div className={style.header__layout}>
          <Link href="https://www.facebook.com/profile.php?id=61550987756051&mibextid=LQQJ4d" target="_blank" className="inline-block">
            <Image src="./social-icons/facebook.svg" width={24} height={24} alt="facebook icon" />
          </Link>
          <Link href="https://x.com/mcomnigeria?s=21&t=PZ3i1ayGP4wtCWdetiJ7nw" target="_blank" className="inline-block">
            <Image src="./social-icons/x.svg" width={24} height={24} alt="x icon" />
          </Link>
          <Link href="https://instagram.com/mcomnigeria?igshid=MmVlMjlkMTBhMg==" target="_blank" className="inline-block">
            <Image src="./social-icons/instagram.svg" width={24} height={24} alt="instagram icon" />
          </Link>
          <Link href="https://www.linkedin.com/company/mcom-nigeria/" target="_blank" className="inline-block">
            <Image src="./social-icons/linkedin.svg" width={24} height={24} alt="linkedin icon" />
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Header;