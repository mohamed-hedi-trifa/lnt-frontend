import { useTranslation } from "@/contexts/TranslationContext";
import { Link } from "gatsby";
import React from "react";

type Props = {
  to: string;
  children: React.ReactNode;
  [key: string]: any;
};

export default function LangLink({ to, children, ...props }: Props) {
  const { t, lang } = useTranslation();

  return (
    <Link to={`/${lang}${to}`} {...props}>
      {children}
    </Link>
  );
}
