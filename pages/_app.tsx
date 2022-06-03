import { PaperSDKProvider } from "@paperxyz/react-client-sdk";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PaperSDKProvider
      chainName="Polygon"
      clientId="dd92d312-3aeb-4822-b4a4-f4f25c527e57"
    >
      <Component {...pageProps} />
    </PaperSDKProvider>
  );
}

export default MyApp;
