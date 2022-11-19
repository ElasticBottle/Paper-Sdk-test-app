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
        chain: "Mumbai",
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
      const signer = PaperWalletSdk.User.getSigner();
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
  const signTransactionEth = async () => {
    if (PaperWalletSdk) {
      const signer = await PaperWalletSdk.User.getSigner({
        rpcEndpoint: "mainnet",
      });
      const tx = {
        to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
        value: ethers.utils.parseEther("0.1"),
      };
      const signedTransaction = await signer.signTransaction(tx);
      console.log("signedTransaction", signedTransaction);
    }
  };
  const signTransactionGoerli = async () => {
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
  const callContractGasless = async () => {
    if (PaperWalletSdk) {
      console.log(
        "await PaperWalletSdk.User.details.walletAddress",
        await PaperWalletSdk.User.details.walletAddress
      );
      const params = {
        contractAddress: "0xb2369209b4eb1e76a43fAd914B1d29f6508c8aae",
        method: {
          args: [await PaperWalletSdk.User.details.walletAddress, 1, 0],
          stub: "function claimTo(address _to, uint256 _tokeIt, uint256 _quantity) external" as const,
        },
      };
      console.log("params", params);
      try {
        const { transactionHash } = await PaperWalletSdk.User.writeTo.contract(
          params
        );
        console.log("transactionHash", transactionHash);
      } catch (e) {
        console.error(`something went wrong sending gasless transaction ${e}`);
      }
    }
  };
  const getNftHoldings = async () => {
    if (PaperWalletSdk) {
      try {
        const nfts = await PaperWalletSdk.User.walletHoldings.listNfts({
          chain: "Mumbai",
          limit: 10,
          offset: 0,
        });
        console.log("nfts", nfts);
      } catch (e) {
        console.error(`something went wrong sending gasless transaction ${e}`);
      }
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
        onClick={signTransactionEth}
        className="m-2 rounded-xl bg-orange-600 px-4 py-2 hover:bg-orange-700 active:bg-orange-800"
      >
        SignTransaction Eth
      </button>
      <button
        onClick={signTransactionGoerli}
        className="m-2 rounded-xl bg-orange-600 px-4 py-2 hover:bg-orange-700 active:bg-orange-800"
      >
        SignTransaction Goerli
      </button>
      <button
        onClick={callContractGasless}
        className="m-2 rounded-xl bg-orange-600 px-4 py-2 hover:bg-orange-700 active:bg-orange-800"
      >
        call contract gasless
      </button>
      <button
        onClick={getNftHoldings}
        className="m-2 rounded-xl bg-orange-600 px-4 py-2 hover:bg-orange-700 active:bg-orange-800"
      >
        Get Nft Holdings
      </button>
    </div>
  );
};
