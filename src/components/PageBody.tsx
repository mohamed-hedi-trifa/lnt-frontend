import React, { ReactNode } from 'react'

export default function PageBody({children, maxWidth="max-w-6xl"}:{children:ReactNode, maxWidth?:string;}) {
  return (
    <section className='px-4 sm:px-0'>
        <section className={`${maxWidth} mx-auto`}>
{children}
        </section>
    </section>
  )
}
