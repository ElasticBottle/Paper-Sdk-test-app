import { PaperClient } from "@paperxyz/embedded-wallet-sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const EmbeddedWalletComponent = () => {
  const [PaperWalletSdk, setPaperWalletSdk] = useState<PaperClient>();
  const [pwd, setPwd] = useState("");
  useEffect(() => {
    const setUp = async () => {
      const Paper = new PaperClient({
        clientId: "00fdf7b2-1dd8-4784-a2c3-58d16910a1af",
      });
      setPaperWalletSdk(Paper);
    };
    console.log("calling setup");
    setUp();
  }, []);

  const createWallet = async () => {
    if (PaperWalletSdk) {
      const { walletAddress } = await PaperWalletSdk.User.createWallet({
        recoveryPassword: pwd,
      });
      console.log("walletAddress", walletAddress);
    }
  };
  const getAddress = async () => {
    if (PaperWalletSdk) {
      const signer = await PaperWalletSdk.User.getSigner({});
      const address = await signer.getAddress();
      console.log("address", address);
    }
  };
  const signMessage = async () => {
    if (PaperWalletSdk) {
      const signer = await PaperWalletSdk.User.getSigner({
        rpcEndpoint: "mainnet",
      });
      const signedMessage = await signer.signMessage("hello world");
      console.log("signedMessage", signedMessage);
    }
  };
  const signTransaction = async () => {
    if (PaperWalletSdk) {
      const signer = await PaperWalletSdk.User.getSigner({
        rpcEndpoint: "goerli",
      });
      const tx = {
        to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
        value: ethers.utils.parseEther("0.1"),
      };
      const signedTransaction = await signer.signTransaction(tx);
      console.log("signedTransaction", signedTransaction);
    }
  };

  return (
    <div className="flex flex-col">
      <input
        value={pwd}
        onChange={(e) => {
          setPwd(e.target.value);
        }}
        placeholder="enter recovery password"
        type="text"
        className="m-2 rounded-xl bg-gray-700 px-4 py-2"
      />
      <button
        onClick={createWallet}
        className="m-2 rounded-xl bg-orange-600 px-4 py-2 hover:bg-orange-700 active:bg-orange-800"
      >
        createWallet
      </button>
      <button
        onClick={getAddress}
        className="m-2 rounded-xl bg-orange-600 px-4 py-2 hover:bg-orange-700 active:bg-orange-800"
      >
        GetAddress
      </button>
      <button
        onClick={signMessage}
        className="m-2 rounded-xl bg-orange-600 px-4 py-2 hover:bg-orange-700 active:bg-orange-800"
      >
        SignMessage
      </button>
      <button
        onClick={signTransaction}
        className="m-2 rounded-xl bg-orange-600 px-4 py-2 hover:bg-orange-700 active:bg-orange-800"
      >
        SignTransaction
      </button>
    </div>
  );
};
