import {
  CreateWallet,
  LoginWithPaper,
  PaperCheckout,
  PaperCheckoutDisplay,
  PaperSDKError,
  PaperUser,
  PaymentSuccessResult,
  PayWithCard,
  TransferSuccessResult,
} from "@paperxyz/react-client-sdk";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTwitterSquare } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { IoLogoDiscord } from "react-icons/io5";
import NFTPreview from "../public/android-chrome-256x256.png";
import Logo from "../public/icons/paper-logo-icon.svg";
import LogoText from "../public/icons/paper-text-light.svg";

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

      <main className="flex flex-1 w-full text-gray-800">
        <div className="grid w-full h-full max-w-3xl grid-cols-1 px-3 py-4 mx-auto auto-rows-auto md:grid-cols-2 md:px-6 md:py-10 lg:max-w-5xl">
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

function PaperLogo() {
  return (
    <div className="flex">
      <div className="pr-1">
        <Image src={Logo} alt="Paper icon" />
      </div>
      <Image src={LogoText} alt="Paper logo" />
    </div>
  );
}

function MintComponent() {
  const [Time, setTime] = useState("second");
  const onSuccessLogin = async (code: string) => {
    const resp = await fetch("/api/get-user-token", {
      method: "POST",
      body: JSON.stringify({
        code,
      }),
    });
    if (resp.status !== 200) {
      console.log("resp", resp);
      throw new Error("Failed to get user token");
    }
    const { userToken } = await resp.json();
    console.log("userToken", userToken);
  };
  const onClick = async () => {
    const resp = await fetch("/api/get-user-token", {
      method: "POST",
    });
    if (resp.status !== 200) {
      console.log("resp", resp);
      throw new Error("Failed to get user token");
    }
    const { home } = await resp.json();
    console.log("home", home);
  };

  return (
    <div className="flex flex-col items-center order-1 pb-4 space-y-5 md:order-2">
      <div className="items-center overflow-hidden aspect-square w-52 rounded-xl">
        <Image src={NFTPreview} alt="NFT preview" layout="responsive" />
      </div>
      <button className="bg-blue-500 border-2" onClick={onClick}>
        try
      </button>
      <LoginWithPaper
        className="justify-center w-full"
        onSuccess={onSuccessLogin}
      />
      <PayWithCardWithCreateWalletExample />
    </div>
  );
}

function InfoComponent() {
  const iconSize = 22;

  return (
    <div className="flex flex-col items-center order-2 w-full h-full space-y-2 md:order-1 md:items-start">
      <h1 className={"pb-2 text-3xl font-bold md:pb-4 md:text-5xl lg:text-6xl"}>
        Paper Explorers
      </h1>
      <div className="flex space-x-2">
        <div className="block px-2 py-1 border-2 border-gray-700 rounded-lg whitespace-nowrap">
          Total Items <span className="font-bold">10,000</span>
        </div>
        <div className="block px-2 py-1 border-2 border-gray-700 rounded-lg whitespace-nowrap">
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
      <PaperCheckoutTest />
    </div>
  );
}

function PayWithCardWithCreateWalletExample() {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [paperCheckoutId, setPaperCheckoutId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showPayWithCard, setShowPayWithCard] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      // Fetch the Paper checkout ID from your backend
      // const checkoutFetch = await fetch("/api/paper/checkout", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     // Potentially some params you want to pass to tell
      //     // your backend which Paper checkout you want to get.
      //   }),
      // });
      // const { checkoutId } = await checkoutFetch.json();
      // setPaperCheckoutId(checkoutId);
    })();
  }, []);

  const onPayWithCardTransferSuccess = (result: TransferSuccessResult) => {
    setMessage(`Transaction succeeded!`);
  };

  const onPayWithCardError = (error: PaperSDKError) => {
    setMessage(`Something went wrong! ${error}`);
  };

  const onCreateWalletSuccess = (paperUser: PaperUser) => {
    setWalletAddress(paperUser.walletAddress);
    setEmailAddress(paperUser.emailAddress);
    setShowPayWithCard(true);
  };

  const onCreateWalletError = (error: PaperSDKError) => {
    setMessage(`Your email could not be verified.`);
  };

  return (
    <>
      <input
        placeholder="Email address"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmailAddress(e.target.value);
        }}
      />
      <CreateWallet
        emailAddress={emailAddress}
        onSuccess={onCreateWalletSuccess}
        onError={onCreateWalletError}
      />

      <PayWithCard
        checkoutId={"49cfc793-9a16-4e77-8afd-d80de6e9ccd4"}
        recipientWalletAddress={"0x927a5D4d0e720379ADb53a895f8755D327faF0F5"}
        emailAddress={"winston@paper.xyz"}
        onTransferSuccess={onPayWithCardTransferSuccess}
        onError={onPayWithCardError}
      />
      {message}
    </>
  );
}

export function PaperCheckoutTest() {
  return (
    <PaperCheckout
      checkoutId="70e08b7f-c528-46af-8b17-76b0e0ade641"
      appName="Hello World"
      display={PaperCheckoutDisplay.EMBED}
      emailAddress={"winston@paper.xyz"}
      recipientWalletAddress={"0x450D82Ed59f9238FB7fa37E006B32b2c51c37596"}
      onPaymentSuccess={(result: PaymentSuccessResult) => {
        console.log("result", result);
      }}
      onTransferSuccess={(transferSuccess: TransferSuccessResult) => {
        console.log("transferSuccess", transferSuccess);
      }}
    />
  );
}
