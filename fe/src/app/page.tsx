'use client';

import Navbar from "@components/navbar";
import NFTShowcase from "@components/nftshowcase";
import CollectionGrid from "@components/collection";
import LatestTransactions from "@components/transaction";

const collection = [
  { image: "", title: "NFT #1" },
  { image: "", title: "NFT #2" },
  { image: "", title: "NFT #3" },
  { image: "", title: "NFT #4" },
];

const transactions = [
  { hash: "0x123456789abcdef", buyer: "0xabc...123", nft: "Genesis NFT", time: "2 min ago" },
  { hash: "0x987654321fedcba", buyer: "0xdef...456", nft: "NFT #2", time: "5 min ago" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 flex flex-col gap-10">
        <NFTShowcase />
        <CollectionGrid nfts={collection} />
        <LatestTransactions transactions={transactions} />
      </main>
    </div>
  );
}