import {
  PaperCheckout,
  PaperCheckoutDisplay,
  PaymentSuccessResult,
  TransferSuccessResult,
} from "@paperxyz/react-client-sdk";

/**
 * We have two magic variables:
 * * `$WALLET` corresponds to the user's wallet
 * *  `$QUANTITY`corresponds to the quantity the user wants to purchase.
 * If you pass in either {@param recipientWalletAddress} or {@param quantity},
 * it will resolve themselves as expected.
 *
 */
export function PaperCheckoutExample() {
  return (
    <PaperCheckout
      checkoutId="0795f5a0-e01b-4a15-bb1f-0b2ab336261b"
      appName="Hello World"
      display={PaperCheckoutDisplay.MODAL}
      recipientWalletAddress="0x768e25b305aF92DC2a610ac9D7a3732D7D049573"
      emailAddress={"winston@paper.xyz"}
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
          value: "4",
        },
        callOptions: {
          gasOptions: "medium",
        },
      }}
      eligibilityMethod={{
        name: "getClaimIneligibilityReason",
        args: {
          _recipient: "$WALLET",
          _quantity: "1",
          _tokenId: "0",
        },
      }}
      onPaymentSuccess={(result: PaymentSuccessResult) => {
        console.log("result", result);
      }}
      onTransferSuccess={(transferSuccess: TransferSuccessResult) => {
        console.log("transferSuccess", transferSuccess);
      }}
    />
  );
}
