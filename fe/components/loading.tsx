import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-4">
          <span className="block w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
          <span className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-500 opacity-70" fill="none" viewBox="0 0 24 24">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
        </div>
        <span className="text-blue-700 font-semibold text-lg animate-pulse">Loading NFT Collection...</span>
      </div>
    </div>
  );
}