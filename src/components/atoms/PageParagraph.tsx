import React, { ReactNode } from 'react'

export default function PageParagraph({children, fontWeight="font-normal", spacing=""}:{children:ReactNode, fontWeight?:string, spacing?:string}) {
  return (
    <div className={`text-justify leading-8 text-xl ${fontWeight} ${spacing}`}>{children}</div>
  )
}
