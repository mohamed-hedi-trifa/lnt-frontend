import React, { ReactNode } from 'react'

export default function PageParagraph({children}:{children:ReactNode}) {
  return (
    <div className='text-justify leading-10 text-[22px]'>{children}</div>
  )
}
