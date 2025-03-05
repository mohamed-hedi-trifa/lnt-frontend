import React, { ReactNode } from 'react'

export default function PageParagraph({children, fontWeight="font-normal", spacing=""}:{children:ReactNode, fontWeight?:string, spacing?:string}) {
  return (
    <div className={` text-[rgb(36,36,36)] leading-[29px] text-lg font-serif ${fontWeight} ${spacing}`}>{children}</div>
  )
}
