import React from "react";

interface FacebookCircleIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

export default function FacebookCircleIcon({
  width = 50,
  height = 50,
  ...props
}: FacebookCircleIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-[0px_4px_2px_rgb(0,0,0,.3)] ${props.className || ""}`}
      {...props}
    >
      <path
        d="M50 24.6721C50 37.1326 40.6404 47.434 28.4816 49.1057C27.3447 49.2612 26.1816 49.3425 25.0009 49.3425C23.638 49.3425 22.2997 49.2353 20.9964 49.0279C9.09155 47.1367 0 36.9511 0 24.6721C0 11.0464 11.1936 0 24.9991 0C38.8046 0 50 11.0464 50 24.6721Z"
        fill="#1877F2"
      />
      <path
        d="M28.4816 19.8087V25.1832H35.2188L34.152 32.4231H28.4816V49.1034C27.3447 49.2589 26.1816 49.3402 25.0009 49.3402C23.638 49.3402 22.2997 49.233 20.9964 49.0256V32.4231H14.783L14.783 25.1832H20.9964V18.6072C20.9964 14.5275 24.3475 11.2188 28.4834 11.2188V11.2222C28.4956 11.2222 28.5061 11.2188 28.5184 11.2188L35.2206 11.2188V17.4801H30.8412C29.5397 17.4801 28.4834 18.5225 28.4834 19.807L28.4816 19.8087Z"
        fill="white"
      />
    </svg>
  );
}
