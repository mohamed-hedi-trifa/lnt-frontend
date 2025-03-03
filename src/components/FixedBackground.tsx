import React from "react";

export default function FixedBackground({ pathname }: { pathname: string }) {
  if (pathname?.length <= 4) return null;

  return (
    <div className="fixed inset-0 z-[-1] bg-[linear-gradient(30deg,rgba(135,208,228,1)_0%,rgba(135,208,228,1)_15%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_65%,rgba(135,208,228,1)_100%)]"></div>
  );
}
