import Image from "next/image";
import Logo from "../public/icons/paper-logo-icon.svg";
import LogoText from "../public/icons/paper-text-light.svg";

export function PaperLogo() {
  return (
    <div className="flex">
      <div className="pr-1">
        <Image src={Logo} alt="Paper icon" />
      </div>
      <Image src={LogoText} alt="Paper logo" />
    </div>
  );
}
