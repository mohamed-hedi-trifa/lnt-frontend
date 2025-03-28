import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { useTranslation } from "@/contexts/TranslationContext";

const IndexPage: React.FC<PageProps> = () => {
  const { t } = useTranslation("fr");
  return (
    <main>
      frensh version
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
