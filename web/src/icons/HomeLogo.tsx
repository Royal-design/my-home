import React from "react";

export const HomeLogo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 10.5L12 4l9 6.5" />
      <path d="M4 10v10h6v-6h4v6h6V10" />
    </svg>
  );
};
