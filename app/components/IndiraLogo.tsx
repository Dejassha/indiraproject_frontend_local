import React from "react";

interface IndiraLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function IndiraLogo({ className = "", width = 120, height = 135 }: IndiraLogoProps) {
  return (
    <div
      className={`relative inline-block select-none group transition-transform duration-300 hover:scale-[1.02] ${className}`}
      style={{
        width: `${width}px`,
        filter: "drop-shadow(0 10px 14px rgba(0, 0, 0, 0.45)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
      }}
    >
      <svg
        viewBox="0 0 140 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <path
          d="M 4 2 H 136 V 118 L 70 156 L 4 118 Z"
          fill="#FFFFFF"
        />

        <g id="brand-dots">
          <circle cx="80" cy="36" r="14" fill="#D81B60" />
          <circle cx="98" cy="30" r="13" fill="#F4511E" opacity="0.95" />
        </g>

        <text
          x="18"
          y="72"
          fill="#13193A"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="36"
          fontWeight="bold"
          letterSpacing="-0.5"
        >
          Indira
        </text>

        <text
          x="116"
          y="50"
          fill="#13193A"
          fontFamily="Arial, sans-serif"
          fontSize="10"
          fontWeight="bold"
        >
          ®
        </text>

        <text
          x="70"
          y="95"
          fill="#13193A"
          fontFamily="'Arial', 'Helvetica Neue', sans-serif"
          fontSize="13"
          fontWeight="800"
          letterSpacing="4"
          textAnchor="middle"
        >
          PROJECTS
        </text>

        <polygon
          points="20,103 124,103 118,120 14,120"
          fill="#13193A"
        />

        <text
          x="69"
          y="114"
          fill="#FFFFFF"
          fontFamily="'Arial', 'Helvetica Neue', sans-serif"
          fontSize="6.8"
          fontWeight="900"
          letterSpacing="0.8"
          textAnchor="middle"
        >
          ENGINEERING FUTURE
        </text>
      </svg>
    </div>
  );
}
