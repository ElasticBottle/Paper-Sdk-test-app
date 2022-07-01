import { PaperSDKProvider } from "@paperxyz/react-client-sdk";
import "@paperxyz/react-client-sdk/dist/index.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PaperSDKProvider chainName="Mumbai" appName={"Paper Test App"}>
      <Component {...pageProps} />
    </PaperSDKProvider>
  );
}

export default MyApp;
