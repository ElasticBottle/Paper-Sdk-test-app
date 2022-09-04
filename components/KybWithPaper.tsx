import { useEffect } from "react";

export const KybWithPaper = () => {
  useEffect(() => {
    const messageHandler = async (event: MessageEvent) => {
      const payload = event.data;
      switch (payload.eventType) {
        case "sellerOnboardingEmailVerified":
          const authToken = payload.authToken;
          console.log("authToken", authToken);
          await fetch("api/swap-for-user-developer-key", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ authToken }),
          });
          break;
        default:
          break;
      }
    };
    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  return (
    <iframe
      className="h-80 w-full"
      src="http://localhost:3000/sdk/2022-08-12/seller-onboarding/verify-email?platformId=0x04Fa9bD20b5fac18d537ED29997EC400E9538c6A"
    />
  );
};
