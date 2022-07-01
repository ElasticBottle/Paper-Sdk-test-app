import {
  PaperSDKError,
  PayWithCard,
  PayWithCrypto,
  TransferSuccessResult,
} from "@paperxyz/react-client-sdk";
import { useState } from "react";

export function PayWithCardExample() {
  const [message, setMessage] = useState<string>("");

  const onPayWithCardTransferSuccess = (result: TransferSuccessResult) => {
    setMessage(`Transaction succeeded!`);
  };

  const onPayWithCardError = (error: PaperSDKError) => {
    console.log("error", error);
    setMessage(`Something went wrong! ${JSON.stringify(error, null, 4)}`);
  };

  return (
    <>
      <PayWithCard
        checkoutId={"54762a95-76e7-4fc9-83c6-11d9a2c3ebf8"}
        recipientWalletAddress={"0x927a5D4d0e720379ADb53a895f8755D327faF0F5"}
        emailAddress={"winston@paper.xyz"}
        onTransferSuccess={onPayWithCardTransferSuccess}
        onError={onPayWithCardError}
      />
      <PayWithCrypto
        checkoutId={"54762a95-76e7-4fc9-83c6-11d9a2c3ebf8"}
        recipientWalletAddress="0x768e25b305aF92DC2a610ac9D7a3732D7D049573"
        onSuccess={(code) => {
          console.log("transaction success, txHash: ", code.hash);
        }}
        onError={(error) => {
          console.log("error.code", error.code);
        }}
      />
      <PayWithCrypto
        checkoutId={"54762a95-76e7-4fc9-83c6-11d9a2c3ebf8"}
        recipientWalletAddress="0x768e25b305aF92DC2a610ac9D7a3732D7D049573"
      >
        <div className="rounded-xl bg-orange-800 px-3 py-2 text-lg font-bold transition-all hover:scale-105 hover:bg-orange-900 active:bg-orange-800">
          Mint with Eth
        </div>
      </PayWithCrypto>
      {/* <PayWithCrypto checkoutId={"bc4a5443-6a5e-4c00-928e-80582601b1a7"}>
        {({ openModal }: PayWithCryptoChildrenProps) => {
          return (
            <button
              onClick={openModal}
              className="rounded-xl bg-purple-800 px-3 py-2 text-lg font-bold transition-all hover:scale-105 hover:bg-purple-900 active:bg-purple-800"
            >
              Mint with Eth
            </button>
          );
        }}
      </PayWithCrypto> */}
      {message}
    </>
  );
}
