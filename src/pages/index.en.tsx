import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Home from "../components/home/Home"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Home />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
