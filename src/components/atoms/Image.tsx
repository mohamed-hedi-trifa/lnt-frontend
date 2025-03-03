import React from 'react'

export default function Image({src, alt}:{src:string, alt?:string}) {
  return (
    <div className='relative w-full max-w-[600px] mx-auto h-auto rounded-lg'>
        <img src={src} alt={alt||"Image"} className="object-cover" />
        <div className='w-full h-full absolute top-0 left-0'></div>
    </div>
  )
}
