import React from "react";

export default function Toast({ message, type = "info", onClose }: { message: React.ReactNode; type?: "info" | "success" | "error"; onClose: () => void }) {
  const gradient =
    type === "success"
      ? "from-blue-400 via-green-300 to-blue-200"
      : type === "error"
      ? "from-blue-400 via-red-300 to-blue-300"
      : "from-blue-400 via-blue-200 to-blue-100";

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] animate-slide-in px-6 py-4 rounded-xl shadow-xl bg-gradient-to-br ${gradient} text-blue-900 font-semibold flex items-center gap-3 min-w-[260px]`}
      style={{ animation: "slide-in 0.5s cubic-bezier(.4,2,.6,1) both" }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-auto text-blue-700 hover:text-blue-900 text-xl font-bold focus:outline-none"
        aria-label="Close"
      >
        ×
      </button>
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}