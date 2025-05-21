'use client';

import React from "react";

type Transaction = {
  hash: string;
  buyer: string;
  nft: string;
  time: string;
};

type LatestTransactionsProps = {
  transactions: Transaction[];
};

export default function LatestTransactions({ transactions }: LatestTransactionsProps) {
  return (
    <section className="mb-8 bg-blue-50 rounded-xl shadow-lg p-8 border border-blue-100">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Latest Transactions</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border border-blue-100">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left text-blue-700 font-semibold">NFT</th>
              <th className="py-3 px-4 text-left text-blue-700 font-semibold">Buyer</th>
              <th className="py-3 px-4 text-left text-blue-700 font-semibold">Time</th>
              <th className="py-3 px-4 text-left text-blue-700 font-semibold">Tx Hash</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr
                key={idx}
                className="border-t border-blue-100 hover:bg-blue-100/60 transition-colors"
              >
                <td className="py-2 px-4 font-medium text-blue-900">{tx.nft}</td>
                <td className="py-2 px-4 text-blue-700">{tx.buyer}</td>
                <td className="py-2 px-4 text-gray-500">{tx.time}</td>
                <td className="py-2 px-4 break-all">
                  <a
                    href={`https://explorer.aptoslabs.com/txn/${tx.hash}?network=testnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 transition"
                  >
                    {tx.hash.slice(0, 8)}...
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}