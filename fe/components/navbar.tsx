'use client';

import React from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow mb-8 sticky top-0 z-10">
      <h1 className="font-poppins text-2xl font-bold text-blue-500">Aptos NFT Launchpad</h1>
      <div>
        <WalletSelector />
      </div>
    </nav>
  );
}