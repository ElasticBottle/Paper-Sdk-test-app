import {
  PaperSDKError,
  PaperSDKProvider,
  PayWithCard,
  TransferSuccessResult,
} from "@paperxyz/react-client-sdk";
import React, { useState } from "react";

export function PayWithCardExample() {
  const [message, setMessage] = useState<string>("");

  const onPayWithCardTransferSuccess = (result: TransferSuccessResult) => {
    setMessage(`Transaction succeeded!`);
  };

  const onPayWithCardError = (error: PaperSDKError) => {
    console.log("error", error);
    setMessage(`Something went wrong! ${error}`);
  };

  return (
    <>
      <PaperSDKProvider chainName="Polygon">
        <PayWithCard
          checkoutId={"70e08b7f-c528-46af-8b17-76b0e0ade641"}
          recipientWalletAddress={"0x927a5D4d0e720379ADb53a895f8755D327faF0F5"}
          emailAddress={"winston@paper.xyz"}
          onTransferSuccess={onPayWithCardTransferSuccess}
          onError={onPayWithCardError}
        />
        {/* <PayWithCrypto /> */}
        {/* <PayWithCrypto>
          <div className="px-3 py-2 text-lg font-bold transition-all bg-orange-800 rounded-xl hover:scale-105 hover:bg-orange-900 active:bg-orange-800">
            Mint with Eth
          </div>
        </PayWithCrypto>
        <PayWithCrypto>
          {({ openModal }: PayWithCryptoChildrenProps) => {
            return (
              <button
                onClick={openModal}
                className="px-3 py-2 text-lg font-bold transition-all bg-purple-800 rounded-xl hover:scale-105 hover:bg-purple-900 active:bg-purple-800"
              >
                Mint with Eth
              </button>
            );
          }}
        </PayWithCrypto> */}
      </PaperSDKProvider>
      {message}
    </>
  );
}
