"use client";
import React, { useState } from "react";

export default function LiquidGlass() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.5,1.5,0.5,1)] ${
        expanded
          ? "w-[34rem] h-[44rem] p-10"
          : "w-[17rem] h-[17rem] p-6"
      } cursor-grab active:cursor-grabbing`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* --- Glass Layers --- */}
      <div className="absolute inset-0 rounded-[2rem] backdrop-blur-[3px]">
        <svg className="absolute w-0 h-0">
          <filter id="glass-blur">
            <feGaussianBlur stdDeviation="6" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            />
          </filter>
        </svg>
        <div
          className="absolute inset-0 rounded-[2rem]"
          style={{ filter: "url(#glass-blur)" }}
        ></div>
      </div>

      {/* Face */}
      <div className="absolute inset-0 rounded-[2rem] shadow-[0_4px_4px_rgba(0,0,0,0.15),_0_0_12px_rgba(0,0,0,0.08)] z-[1]" />

      {/* Edge Highlight */}
      <div className="absolute inset-0 rounded-[2rem] z-[2] shadow-[inset_3px_3px_3px_rgba(255,255,255,0.45),inset_-3px_-3px_3px_rgba(255,255,255,0.45)]" />

      {/* Content */}
      <div className="relative z-[3] flex gap-4 transition-all duration-500">
        <a
          href="#"
          className={`flex items-center justify-center rounded-2xl transition-all duration-500 shadow-[inset_1px_1px_1px_rgba(255,255,255,0.45),inset_-1px_-1px_1px_rgba(255,255,255,0.45)] ${
            expanded
              ? "w-32 h-32 p-6 rounded-[2rem] shadow-[inset_1px_2px_2px_rgba(255,255,255,0.45),inset_-1px_-2px_2px_rgba(255,255,255,0.45)]"
              : "w-16 h-16 p-3"
          } bg-gradient-to-r from-[#1a76ad] to-[#288ec9]`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            width={expanded ? 64 : 32}
            height={expanded ? 64 : 32}
          >
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.762 0 5-2.24 5-5v-14c0-2.76-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.29c-.967 0-1.75-.79-1.75-1.76s.783-1.75 1.75-1.75 1.75.78 1.75 1.75-.783 1.76-1.75 1.76zm13.5 11.29h-3v-5.6c0-1.34-.026-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z" />
          </svg>
        </a>

        <a
          href="#"
          className={`flex items-center justify-center rounded-2xl transition-all duration-500 shadow-[inset_1px_1px_1px_rgba(255,255,255,0.45),inset_-1px_-1px_1px_rgba(255,255,255,0.45)] ${
            expanded
              ? "w-32 h-32 p-6 rounded-[2rem] shadow-[inset_1px_2px_2px_rgba(255,255,255,0.45),inset_-1px_-2px_2px_rgba(255,255,255,0.45)]"
              : "w-16 h-16 p-3"
          } bg-gradient-to-r from-[#262626] to-[#303030]`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            width={expanded ? 64 : 32}
            height={expanded ? 64 : 32}
          >
            <path d="M3 3v18h18v-18h-18zm15.09 14.68h-12.18v-12.18h12.18v12.18z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
