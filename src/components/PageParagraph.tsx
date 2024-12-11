import React, { ReactNode } from 'react'

export default function PageParagraph({children}:{children:ReactNode}) {
  return (
    <div className='text-justify leading-8 text-lg'>{children}</div>
  )
}
