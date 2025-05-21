'use client'

import React, { PropsWithChildren }  from 'react';
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";

export default function Providers({children}: PropsWithChildren) {
  return (
    <AptosWalletAdapterProvider
      optInWallets={['Petra']}
      autoConnect={true}
      dappConfig={{ network: Network.TESTNET }}
      onError={(error) => {
    console.log("error", error);
  }} 
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}