import {
  PaperSDKProvider,
  VerifyOwnershipWithPaper,
} from "@paperxyz/react-client-sdk";

export const LoginWithPaperExample = () => {
  const onSuccessLogin = async (code: string) => {
    // code is the temporary access code that you can swap for a permenant user access token
    const resp = await fetch("/api/get-user-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
      }),
    });
    if (resp.status !== 200) {
      console.log("resp", resp);
      throw new Error("Failed to get user token");
    }
    const { userToken } = await resp.json();
    console.log("userToken", userToken);
  };
  return (
    <PaperSDKProvider
      clientId="e61231d4-3681-459c-82e9-a6a69cca0098"
      chainName="Polygon"
    >
      <VerifyOwnershipWithPaper onSuccess={onSuccessLogin} />
    </PaperSDKProvider>
  );
};
