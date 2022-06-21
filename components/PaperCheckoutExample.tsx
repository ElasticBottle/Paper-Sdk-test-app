import {
  PaperCheckout,
  PaperCheckoutDisplay,
  PaymentSuccessResult,
  TransferSuccessResult,
} from "@paperxyz/react-client-sdk";

export function PaperCheckoutTest() {
  return (
    <PaperCheckout
      checkoutId="70e08b7f-c528-46af-8b17-76b0e0ade641"
      appName="Hello World"
      display={PaperCheckoutDisplay.MODAL}
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
