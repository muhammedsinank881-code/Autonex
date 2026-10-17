
import React from "react";

const MainLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#0b1320] text-white">
      {/* Top Bar Accent */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#0088ff] to-transparent opacity-80" />

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* Brand Logo & Animated Icon */}
        <div className="relative flex flex-col items-center">
          <div className="relative mb-4 flex h-24 w-24 items-center justify-center">
            {/* Outer Spinning Ring */}
            <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full border-2 border-dashed border-[#0088ff]/30" />

            {/* Inner Spinning Ring */}
            <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-[#0088ff]" />

            {/* AUTONEX Icon */}
            <svg
              className="h-10 w-10 text-[#0088ff] drop-shadow-[0_0_12px_rgba(0,136,255,0.6)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-black tracking-widest uppercase">
            AUTO<span className="text-[#0088ff]">NEX</span>
          </h1>

          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">
            Parts That Perform
          </p>
        </div>

        {/* Simple Loading Indicator */}
        <div className="mt-8 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0088ff]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0088ff] [animation-delay:200ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0088ff] [animation-delay:400ms]" />
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pb-8 text-center text-xs tracking-wider text-slate-500">
        PREMIUM AUTOMOTIVE PARTS & ACCESSORIES
      </div>
    </div>
  );
};

export default MainLoader;
