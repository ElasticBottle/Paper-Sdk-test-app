import {
  PaperCheckout,
  PaperCheckoutDisplay,
  PaymentSuccessResult,
  TransferSuccessResult,
} from "@paperxyz/react-client-sdk";

export function PaperCheckoutExample() {
  return (
    <PaperCheckout
      checkoutId="24302f7d-6c20-4ebb-b0c8-0414ddc21e0a"
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
          value: "0.0001 * $QUANTITY",
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
