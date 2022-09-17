import {
  PaperSDKError,
  PayWithCard,
  PayWithCrypto,
} from "@paperxyz/react-client-sdk";
import { useState } from "react";

/**
 * @deprecated
 * @returns
 */
export function PayWithElementsExample() {
  const [message, setMessage] = useState<string>("");

  const onPayWithCardError = (error: PaperSDKError) => {
    console.log("error", error);
    setMessage(`Something went wrong! ${JSON.stringify(error, null, 4)}`);
  };

  return (
    <>
      <PayWithCard
        // checkoutId={"5079ac2b-ff06-45ca-ad9f-9b008be207f4"}
        checkoutId={"c13c5083-0bfa-44f0-be54-87079d9df264"}
        recipientWalletAddress={"0x768e25b305aF92DC2a610ac9D7a3732D7D049573"}
        quantity={2}
        mintMethod={{
          name: "claimTo",
          args: {
            _to: "$WALLET",
            _quantity: "$QUANTITY",
            _tokenId: 0,
          },
          payment: {
            currency: "MATIC",
            value: "0.001  * $QUANTITY",
          },
        }}
        eligibilityMethod={{
          name: "getClaimIneligibilityReason",
          args: {
            _recipient: "$WALLET",
            _quantity: "$QUANTITY",
            _tokenId: 1,
          },
        }}
        onPaymentSuccess={({ id }) => {
          setMessage(id);
        }}
        emailAddress={"winston@paper.xyz"}
        onError={onPayWithCardError}
      />
      {/* <PayWithCard
        checkoutId={"54762a95-76e7-4fc9-83c6-11d9a2c3ebf8"}
        recipientWalletAddress={"0x927a5D4d0e720379ADb53a895f8755D327faF0F5"}
        emailAddress={"winston@paper.xyz"}
        onTransferSuccess={onPayWithCardTransferSuccess}
        onError={onPayWithCardError}
      /> */}
      <PayWithCrypto
        checkoutId={"c13c5083-0bfa-44f0-be54-87079d9df264"}
        recipientWalletAddress="0x768e25b305aF92DC2a610ac9D7a3732D7D049573"
        mintMethod={{
          name: "claimTo",
          args: {
            _to: "$WALLET",
            _quantity: "$QUANTITY",
            _tokenId: 1,
          },
          payment: {
            currency: "DERC20",
            value: "0.001 * $QUANTITY",
          },
        }}
        showConnectWalletOptions={true}
        eligibilityMethod={{
          name: "getClaimIneligibilityReason",
          args: {
            _recipient: "$WALLET",
            _quantity: "1",
            _tokenId: "0",
          },
        }}
        onSuccess={({ transactionResponse }) => {
          console.log(
            "transaction success, txHash: ",
            transactionResponse.hash
          );
        }}
        onError={(error) => {
          console.log("error.code", error.code);
        }}
      />

      {message}
    </>
  );
}
