import { CreateWallet } from "@paperxyz/react-client-sdk";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FaTwitterSquare } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { IoLogoDiscord } from "react-icons/io5";
import { LoginWithPaperExample } from "../components/LoginWithPaperExample";
import { PaperCheckoutExample } from "../components/PaperCheckoutExample";
import { PaperLogo } from "../components/PaperLogo";
import { PayWithCardExample } from "../components/PayWithCardExample";
import NFTPreview from "../public/android-chrome-256x256.png";

const Home: NextPage = () => {
  return (
    <div className={"flex max-h-screen min-h-screen flex-col"}>
      <Head>
        <title>Paper Checkout demo</title>
        <meta
          name="description"
          content="Full stack example of Paper checkout sdk"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 text-gray-800">
        <div className="mx-auto grid h-full w-full max-w-3xl auto-rows-auto grid-cols-1 px-3 py-4 md:grid-cols-2 md:px-6 md:py-10 lg:max-w-5xl">
          <InfoComponent />
          <MintComponent />
        </div>
      </main>
      <footer className={"flex w-full justify-center bg-gray-200 py-5"}>
        <a
          href="https://paper.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <span className="pr-2">Powered by</span> <PaperLogo />
        </a>
      </footer>
    </div>
  );
};

export default Home;

function MintComponent() {
  return (
    <div className="order-1 flex flex-col items-center space-y-5 pb-4 md:order-2">
      <div className="aspect-square w-52 items-center rounded-xl">
        <Image src={NFTPreview} alt="NFT preview" layout="responsive" />
      </div>
      <LoginWithPaperExample />
      <PayWithCardExample />
    </div>
  );
}

function InfoComponent() {
  const iconSize = 22;

  return (
    <div className="order-2 flex h-full w-full flex-col items-center space-y-2 md:order-1 md:items-start">
      <h1 className={"pb-2 text-3xl font-bold md:pb-4 md:text-5xl lg:text-6xl"}>
        Paper Explorers
      </h1>
      <div className="flex space-x-2">
        <div className="block whitespace-nowrap rounded-lg border-2 border-gray-700 px-2 py-1">
          Total Items <span className="font-bold">10,000</span>
        </div>
        <div className="block whitespace-nowrap rounded-lg border-2 border-gray-700 px-2 py-1">
          Price <span className="font-bold">0.15 Sol</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <a href="https://paper.xyz" target="_blank" rel="noreferrer">
          <HiOutlineGlobeAlt size={iconSize} />
        </a>
        <a href="" target={"_blank"}>
          <IoLogoDiscord size={iconSize} />
        </a>
        <a
          href="https://twitter.com/papercheckout"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitterSquare size={iconSize} />
        </a>
      </div>
      <p>Congrats! You found the best NFT checkout flow on the internet.</p>
      <p>
        To use Paper for your own project, sign up at{" "}
        <a
          href="https://paper.xyz"
          className="font-bold hover:underline"
          target={"_blank"}
          rel="noreferrer"
        >
          https://paper.xyz
        </a>
        !
      </p>
      <PaperCheckoutExample />
      <CreateWallet
        emailAddress="winston@paper.xyz"
        onSuccess={(user) => {
          console.log("user", user);
        }}
        onEmailVerificationInitiated={() => {
          console.log("onEmailVerificationInitiated callback fired");
        }}
        onError={(error) => {
          console.log("error", error);
        }}
        redirectUrl="https://paper.xyz/dashboard"
      />
    </div>
  );
}
