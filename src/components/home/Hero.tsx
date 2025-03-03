import React from "react";
import NewsLetterSub from "../NewsLetterSub";

export default function Hero() {
  return (
    <div className="grid h-screen">
      <video className="block w-full h-0 min-h-full object-cover" autoPlay muted>
        <source type="video/mp4" src="/output.mp4" />
      </video>
    </div>
  );
}
