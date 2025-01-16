import React, { ReactNode } from 'react'

export default function PageBody({children}:{children:ReactNode}) {
  return (
    <section className='px-4 sm:px-0'>
        <section className='max-w-6xl mx-auto'>
{children}
        </section>
    </section>
  )
}
