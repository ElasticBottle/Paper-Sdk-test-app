import { PaperSDKProvider } from "@paperxyz/react-client-sdk";
import Image from "next/image";
import NFTPreview from "../public/android-chrome-256x256.png";
import CheckoutWithElementsExample from "./block/CheckoutWithElementsExamples";
import { LoginWithPaperExample } from "./block/LoginWithPaperExample";
import { PaperCheckoutExample } from "./block/PaperCheckoutExample";

export function MintComponent() {
  return (
    <div className="order-1 flex flex-col items-center space-y-5 pb-4 md:order-2">
      <div className="aspect-square w-52 items-center rounded-xl">
        <Image src={NFTPreview} alt="NFT preview" layout="responsive" />
      </div>
      <PaperSDKProvider chainName="Mumbai" appName={"Paper Test App"}>
        <LoginWithPaperExample />
        <PaperCheckoutExample />
        {/* <CreateWallet
          emailAddress="no-reply@paper.xyz"
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
                onClick={() => createWallet("winston@paper.xyz")}
              >
                testing
              </button>
            );
          }}
        </CreateWallet> */}
        {/* <PayWithElementsExample /> */}
        <CheckoutWithElementsExample />
        {/* <KybWithPaper /> */}
      </PaperSDKProvider>
    </div>
  );
}
