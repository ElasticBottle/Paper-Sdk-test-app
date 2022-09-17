import { CheckoutWithCard, CheckoutWithEth } from "@paperxyz/react-client-sdk";
import { useEffect, useState } from "react";

const CheckoutWithElementsExample = () => {
  const [ClientSdkSecret, setClientSdkSecret] = useState("");
  useEffect(() => {
    const setup = async () => {
      const resp = await fetch("/api/get-sdk-intent", {
        method: "POST",
      });
      if (!resp.ok) {
        throw new Error((await resp.json()).error);
      }
      return resp.json();
    };
    setup().then(({ sdkClientSecret }) => {
      setClientSdkSecret(sdkClientSecret);
    });
  }, []);

  if (!ClientSdkSecret) {
    return null;
  }
  return (
    <>
      <CheckoutWithEth sdkClientSecret={ClientSdkSecret} />
      <CheckoutWithCard
        sdkClientSecret={ClientSdkSecret}
        onPaymentSuccess={(result) => {
          console.log("result", result);
        }}
      />
    </>
  );
};

export default CheckoutWithElementsExample;
