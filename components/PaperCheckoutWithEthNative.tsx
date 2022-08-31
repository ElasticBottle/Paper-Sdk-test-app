import {
  configureChains,
  createClient,
  defaultChains,
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSigner,
  WagmiConfig,
} from "wagmi";

import { publicProvider } from "wagmi/providers/public";

import { useEffect, useRef, useState } from "react";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import {
  createCheckoutWithCardElement,
  createCheckoutWithEthElement,
} from "@paperxyz/js-client-sdk/";

export function WalletConnection() {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <img src={ensAvatar || ""} alt="ENS Avatar" />
        <div>{ensName ? `${ensName} (${address})` : address}</div>
        <div>Connected to {connector?.name}</div>
        <button
          className="m-3 w-full rounded-lg bg-blue-900 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1">
      {connectors.map((connector) => (
        <button
          className="m-3 w-full rounded-lg bg-blue-900 px-4 py-2 text-white hover:bg-blue-700"
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div className="text-red-500">{error.message}</div>}
    </div>
  );
}

export function NativeCheckoutWithEth() {
  const { data: signer } = useSigner();
  const checkoutWithEthContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!signer || !checkoutWithEthContainer.current) {
      return;
    }
    createCheckoutWithEthElement({
      payingWalletSigner: signer,
      sdkClientSecret:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250cmFjdElkIjoiOTE0ZDZjM2ItMWY2Ny00NWU1LTk2OTQtYzQxNzBiMmM4NjhiIiwid2FsbGV0QWRkcmVzcyI6IjB4NzY4ZTI1YjMwNWFGOTJEQzJhNjEwYWM5RDdhMzczMkQ3RDA0OTU3MyIsImVtYWlsIjoibm8tcmVwbHlAcGFwZXIueHl6IiwicXVhbnRpdHkiOjEsIm1ldGFkYXRhIjp7fSwiZXhwaXJlc0luTWludXRlcyI6MTAwMDAwMDAwLCJtaW50TWV0aG9kIjp7Im5hbWUiOiJjbGFpbVRvIiwiYXJncyI6eyJfdG8iOiIkV0FMTEVUIiwiX3F1YW50aXR5IjoiJFFVQU5USVRZIiwiX3Rva2VuSWQiOjB9LCJjYWxsT3B0aW9ucyI6eyJnYXNQcmlvcml0eSI6Im1lZGl1bSJ9LCJwYXltZW50Ijp7ImN1cnJlbmN5IjoiTUFUSUMiLCJ2YWx1ZSI6IjAuMDAwMSAqICRRVUFOVElUWSJ9fSwicHJpY2luZ0RldGFpbHMiOnsiY2hhaW5OYW1lIjoiTXVtYmFpIiwiY3VycmVuY3lBZGRyZXNzIjoiMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwiY3VycmVuY3lTeW1ib2wiOiJNQVRJQyIsInJlYWRhYmxlUHJpY2UiOiIwLjAwMDEiLCJwcmljZUluV2VpIjp7InR5cGUiOiJCaWdOdW1iZXIiLCJoZXgiOiIweDVhZjMxMDdhNDAwMCJ9LCJsb2NrZWRQcmljZVVzZENlbnRzIjowfSwidHJhbnNhY3Rpb25JZCI6IjdmMGY2NDc3LTQzMGUtNDliNS05ODQ1LTFhMDAyMmI2ODY2ZiIsImlhdCI6MTY2MTkxNzI0NywiZXhwIjo3NjYxOTE3MjQ3LCJpc3MiOiJwYXBlci54eXoifQ.R0pJoS1nLkDsVxai9U7YBttboxJ3OTt90eMS447I_5g",
      suppressErrorToast: true,
      elementOrId: checkoutWithEthContainer.current,
      onLoad() {
        console.log("iframe loaded");
      },
      receivingWalletType: "MetaMask",
      onError(error) {
        console.log("error", error);
      },
      onSuccess({ transactionId, transactionResponse }) {
        console.log("transactionId", transactionId);
        console.log("transactionResponse", transactionResponse);
      },
      setUpUserPayingWalletSigner({ chainId }) {
        console.log("chainId make sure signer is on", chainId);
      },
    });
  }, [signer]);

  return (
    <div
      ref={checkoutWithEthContainer}
      className="w-full bg-red-400"
      id="checkout-with-eth-container"
    />
  );
}

export function NativeCheckoutWithCard() {
  const checkoutWithEthContainer = useRef<HTMLDivElement>(null);
  const [showKyc, setShowKyc] = useState(false);
  const [kycLink, setKycLink] = useState("");
  useEffect(() => {
    if (!checkoutWithEthContainer.current) {
      return;
    }
    createCheckoutWithCardElement({
      sdkClientSecret:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250cmFjdElkIjoiOTE0ZDZjM2ItMWY2Ny00NWU1LTk2OTQtYzQxNzBiMmM4NjhiIiwid2FsbGV0QWRkcmVzcyI6IjB4NzY4ZTI1YjMwNWFGOTJEQzJhNjEwYWM5RDdhMzczMkQ3RDA0OTU3MyIsImVtYWlsIjoibm8tcmVwbHlAcGFwZXIueHl6IiwicXVhbnRpdHkiOjEsIm1ldGFkYXRhIjp7fSwiZXhwaXJlc0luTWludXRlcyI6MTAwMDAwMDAwLCJtaW50TWV0aG9kIjp7Im5hbWUiOiJjbGFpbVRvIiwiYXJncyI6eyJfdG8iOiIkV0FMTEVUIiwiX3F1YW50aXR5IjoiJFFVQU5USVRZIiwiX3Rva2VuSWQiOjB9LCJjYWxsT3B0aW9ucyI6eyJnYXNQcmlvcml0eSI6Im1lZGl1bSJ9LCJwYXltZW50Ijp7ImN1cnJlbmN5IjoiTUFUSUMiLCJ2YWx1ZSI6IjAuMDAwMSAqICRRVUFOVElUWSJ9fSwicHJpY2luZ0RldGFpbHMiOnsiY2hhaW5OYW1lIjoiTXVtYmFpIiwiY3VycmVuY3lBZGRyZXNzIjoiMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwiY3VycmVuY3lTeW1ib2wiOiJNQVRJQyIsInJlYWRhYmxlUHJpY2UiOiIwLjAwMDEiLCJwcmljZUluV2VpIjp7InR5cGUiOiJCaWdOdW1iZXIiLCJoZXgiOiIweDVhZjMxMDdhNDAwMCJ9LCJsb2NrZWRQcmljZVVzZENlbnRzIjowfSwidHJhbnNhY3Rpb25JZCI6IjBlMjc1MzI1LTJkZTUtNDZjMS1iMDFhLWVjYzdhMWM4OTY0NiIsImlhdCI6MTY2MTkxNzIzMywiZXhwIjo3NjYxOTE3MjMzLCJpc3MiOiJwYXBlci54eXoifQ.IHt9c3zXcrnfJU-idPyclAt_Ws9yD-0nz3PYegLNSLU",
      elementOrId: checkoutWithEthContainer.current,
      onLoad() {
        console.log("iframe loaded");
      },
      onError(error) {
        console.log("error", error);
      },
      onPaymentSuccess({ id }) {
        console.log("transactionId", id);
      },
      onCloseKycModal: () => {
        console.log("close kyc modal");
        setShowKyc(false);
      },
      onOpenKycModal({ iframeLink }) {
        console.log("kyc called");
        console.log("iframeLink", iframeLink);
        setShowKyc(true);
        setKycLink(iframeLink);
      },
      onReview({ cardholderName, id }) {
        console.log("cardholderName, id", cardholderName, id);
      },
    });
  }, []);

  return (
    <>
      <div
        ref={checkoutWithEthContainer}
        className="w-full bg-red-400"
        id="checkout-with-eth-container"
      />
      {showKyc && <iframe src={kycLink} />}
    </>
  );
}

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

// Pass client to React Context Provider
export function PaperCheckoutWithEthNative() {
  return (
    <WagmiConfig client={client}>
      <div className="grid w-full">
        <div className="mx-auto max-w-sm">
          <WalletConnection />
        </div>
        <NativeCheckoutWithEth />
        <NativeCheckoutWithCard />
      </div>
    </WagmiConfig>
  );
}
