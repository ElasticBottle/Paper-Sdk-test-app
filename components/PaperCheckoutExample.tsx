import {
  PaperCheckout,
  PaperCheckoutDisplay,
  PaymentSuccessResult,
  TransferSuccessResult,
} from "@paperxyz/react-client-sdk";

export function PaperCheckoutExample() {
  return (
    <PaperCheckout
      checkoutId="40fcbf88-5d08-44e7-960e-2e6106aba999"
      appName="Hello World"
      display={PaperCheckoutDisplay.MODAL}
      emailAddress={"winston@paper.xyz"}
      onPaymentSuccess={(result: PaymentSuccessResult) => {
        console.log("result", result);
      }}
      onTransferSuccess={(transferSuccess: TransferSuccessResult) => {
        console.log("transferSuccess", transferSuccess);
      }}
    />
  );
}
