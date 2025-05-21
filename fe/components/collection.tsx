'use client';

import React from "react";
import Image from "next/image";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

type NFT = {
  image: string;
  title: string;
};

type CollectionGridProps = {
  nfts: NFT[];
};

export default function CollectionGrid({ nfts }: CollectionGridProps) {
  const { account, connect } = useWallet();
  const walletConnected = !!account;

  return (
    <section className="mb-8 relative bg-blue-50 rounded-xl shadow-lg p-8 border border-blue-100">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Collection</h3>
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition filter duration-300 ${!walletConnected ? "blur-sm pointer-events-none select-none" : ""}`}>
        {nfts.map((nft, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white rounded-xl border border-blue-100 shadow hover:shadow-xl transition-shadow duration-300 p-4 group"
          >
            {nft.image ? (
              <Image
                src={nft.image}
                alt={nft.title}
                width={128}
                height={128}
                className="w-32 h-32 object-cover rounded-lg mb-3 border border-blue-200 group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center rounded-lg mb-3 text-blue-300 text-lg group-hover:scale-105 transition-transform duration-300">
                No Image
              </div>
            )}
            <span className="font-semibold text-blue-800 text-lg text-center">{nft.title}</span>
          </div>
        ))}
      </div>
      {!walletConnected && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={() => connect("Petra")}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg text-lg hover:scale-105 transition"
          >
            Connect Wallet
          </button>
        </div>
      )}
    </section>
  );
}