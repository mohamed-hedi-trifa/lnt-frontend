import React, { ReactNode } from 'react'

export default function PageParagraph({children, fontWeight}:{children:ReactNode, fontWeight?:string}) {
  return (
    <div className={`text-justify leading-8 text-xl ${fontWeight ? fontWeight : "font-normal"}`}>{children}</div>
  )
}
