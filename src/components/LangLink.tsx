import { GatsbyLinkProps, Link } from "gatsby";
import React from "react";

type Props = {
  to: string;
  children: React.ReactNode;
  [key: string]: any;
};

export default function LangLink({ to, children, ...props }: Props) {
  const lang = window?.location?.pathname.startsWith("/fr/") ? "fr" : "en";

  return (
    <Link to={`/${lang}${to}`} {...props}>
      {children}
    </Link>
  );
}
