import React from "react";

interface XCircleIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

export default function XCircleIcon({
  width = 50,
  height = 50,
  ...props
}: XCircleIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-[0px_4px_2px_rgb(0,0,0,.3)] ${props.className || ""}`}
      {...props}
    >
      <path
        d="M49.9965 25.3558C49.9965 37.8159 40.6373 48.1169 28.4788 49.7885C27.342 49.9441 26.1789 50.0253 24.9982 50.0253C23.6354 50.0253 22.2972 49.9182 20.9939 49.7107C9.09123 47.8196 0 37.6344 0 25.3558C0 11.7306 11.1932 0.68457 25 0.68457C38.8068 0.68457 50 11.7306 50 25.3558H49.9965Z"
        fill="#1C1C1B"
      />
      <path
        d="M10.1388 11.5645L21.6683 26.7765L10.0669 39.145H12.6787L22.8367 28.3168L31.0433 39.145H39.9296L27.7519 23.0772L38.551 11.5645H35.9393L26.5853 21.537L19.0268 11.5645H10.1405H10.1388ZM13.9784 13.4625H18.0599L36.0864 37.247H32.005L13.9784 13.4625Z"
        fill="white"
      />
    </svg>
  );
}
