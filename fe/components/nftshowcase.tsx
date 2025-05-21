'use client';

import React, { useEffect, useState } from "react";
import { Aptos, Network, AptosConfig } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Loading from "./loading";
import Toast from "./toast";

const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);


export default function NFTShowcase() {
  const { account, signTransaction } = useWallet();
const [toast, setToast] = useState<{ message: React.ReactNode; type?: "info" | "success" | "error" } | null>(null);
  interface CollectionData {
    name: string;
    description?: string;
    supply?: number;
    maxPerWallet?: number;
    minted?: number;
    uri?: string;
  }

  const [collection, setCollection] = useState<CollectionData | null>(null);

  const handleMint = async () => {
    if (!account) {
      setToast({ message: "Please connect wallet first!" });
      return;
    }
    try {
      const transaction = await aptos.transaction.build.simple({
          sender: account.address,
          data: {
            function: "0x5011fdb0e6a54510aa9c14350148ebea652b1c7b86aacee567200c15aee19f40::nft_launch::mint_token",
            functionArguments: [],
          },
      });

      const senderAuthenticator = await signTransaction({ transactionOrPayload: transaction });


      const submittedTransaction = await aptos.transaction.submit.simple({
          transaction,
          senderAuthenticator: senderAuthenticator.authenticator,
      });

      setToast({
        message: (
          <span>
            Mint transaction submitted! Tx Hash:{" "}
            <span className="font-mono bg-blue-100 px-2 py-1 rounded text-blue-800">
              {submittedTransaction.hash.slice(0, 8)}...{submittedTransaction.hash.slice(-6)}
            </span>
            <button
              className="ml-2 px-2 py-1 text-xs bg-blue-200 rounded hover:bg-blue-300 transition"
              onClick={() => navigator.clipboard.writeText(submittedTransaction.hash)}
              title="Copy full hash"
            >
              Copy
            </button>
          </span>
        ),
        type: "success",
      });

    } catch (e: unknown) {
      if (e instanceof Error) {
        alert("Mint failed: " + e.message);
      } else {
        alert("Mint failed: " + String(e));
      }
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);


  useEffect(() => {
    async function fetchData() {
      try {
        const tokens = await aptos.getAccountOwnedTokens({ accountAddress: "0x5011fdb0e6a54510aa9c14350148ebea652b1c7b86aacee567200c15aee19f40" });
        const collection = tokens[0]?.current_token_data?.current_collection;

        setCollection({
          name: collection?.collection_name || "Unknown Collection",
          description: collection?.description || "No description available",
          supply: collection?.current_supply || 0,
          maxPerWallet: collection?.max_supply || 0,
          uri: collection?.uri || "No URI available",
        });
        console.log("Collections:", collection);
        
      } catch (error) {
        console.error("Error fetching collection data:", error);
      }
    }

    fetchData();
  }, []);


  if (!collection) return <Loading />;

  const supply = collection?.supply || 0;
  const percent = Math.min((supply) * 100, 100);

  return (
    <section className="flex gap-8 items-stretch bg-blue-50 rounded-xl shadow-lg p-8 mb-8 border border-blue-100">
      <div className="w-100 h-100 flex items-center justify-center bg-white rounded-lg text-gray-400 text-xl">
        No Image
      </div>

      <div className="flex flex-col flex-1 gap-6">
        <h2 className="text-3xl font-bold text-blue-900">{collection?.name}</h2>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-500 font-medium mb-1">Minted</span>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-blue-700">{collection?.supply}</span>
              <span className="text-lg text-gray-400 font-semibold">/</span>
              <span className="text-lg text-gray-600 font-semibold">{collection?.maxPerWallet}</span>
            </div>
            <div className="w-40 h-2 bg-gray-200 rounded mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded transition-all duration-500"
                style={{
                  width: `${percent}%`
                }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              Max per wallet: <span className="font-semibold text-blue-700">5</span>
            </span>
          </div>
        </div>
        <p className="text-gray-600">
          Introducing the Genesis NFT from Aptos NFT Launchpad! This exclusive digital collectible marks the beginning of a new era on Aptos. Each NFT is uniquely crafted, offering holders special access to future drops, community events, and hidden perks. Secure your spot in Aptos history and join a vibrant community of collectors and creators. 
        </p>
        <a
          href={collection?.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all"
        >
          {collection?.uri} 
        </a>
        <button
          onClick={handleMint}
          className="cursor-pointer relative mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow transition overflow-hidden"
          style={{ boxShadow: "0 4px 24px 0 rgba(80, 120, 255, 0.15)" }}
        >
          <span className="relative z-10">Mint NFT</span>
          <span className="mint-btn-stars">
            <span className="mint-btn-star mint-btn-star-1"></span>
            <span className="mint-btn-star mint-btn-star-2"></span>
            <span className="mint-btn-star mint-btn-star-3"></span>
            <span className="mint-btn-star mint-btn-star-4"></span>
          </span>
        </button>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </section>
  );
}