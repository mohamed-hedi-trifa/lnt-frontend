import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Home from "../components/home/Home"
import { useTranslation } from "@/contexts/TranslationContext";

const IndexPage: React.FC<PageProps> = () => {
  const { t } = useTranslation("en");
  return (
    <main>
      <Home />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
