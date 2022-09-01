import { CreateWallet, PaperSDKProvider } from "@paperxyz/react-client-sdk";
import Image from "next/image";
import NFTPreview from "../public/android-chrome-256x256.png";
import { LoginWithPaperExample } from "./LoginWithPaperExample";
import { PaperCheckoutExample } from "./PaperCheckoutExample";
import { PayWithCardExample } from "./PayWithCardExample";

export function MintComponent() {
  return (
    <div className="order-1 flex flex-col items-center space-y-5 pb-4 md:order-2">
      <div className="aspect-square w-52 items-center rounded-xl">
        <Image src={NFTPreview} alt="NFT preview" layout="responsive" />
      </div>
      <PaperSDKProvider chainName="Mumbai" appName={"Paper Test App"}>
        <LoginWithPaperExample />
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
        >
          {({ createWallet }) => {
            return (
              <button
                className="bg-blue-500 p-5"
                onClick={createWallet("mafdace@gmail.com")}
              >
                testing
              </button>
            );
          }}
        </CreateWallet>
        <PayWithCardExample />
      </PaperSDKProvider>
    </div>
  );
}
