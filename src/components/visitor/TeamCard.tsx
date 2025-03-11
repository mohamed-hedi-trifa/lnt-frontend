import React from 'react'

const Card = ({ member, customClassName = "", textHidden = false }: { member: any, customClassName?: string, textHidden?: boolean }) => {
  return <div className={`sm:translate-x-[-110%] transition duration-500 group-hover:translate-x-0 absolute bottom-2 right-2 left-2 flex flex-col gap-1 rounded-[15px] p-2 ${customClassName}`}>
    <div className={`font-semibold text-lg text-white ${textHidden && "opacity-0"}`}>{member.name}</div>
    <div className={`font-semibold leading-6 ${textHidden && "opacity-0"}`}>{member.position_en || member.position_fr}</div>
    <div className={`font-medium text-sm text-white ${textHidden && "opacity-0"}`}>{member.job_en || member.job_fr}</div>
  </div>
}

export default function TeamCard({ member }: { member: any }) {
  return (
    <div key={member.name} className='group relative z-10 hover:scale-110 transition duration-200 overflow-hidden' >
      <img src={`${process.env.GATSBY_API_URL}${member.image}`} className='w-full' />
      <Card member={member} customClassName='bg-[linear-gradient(90deg,rgba(81,173,198,0.8)_0%,rgba(0,110,159,0.8)_100%)]' textHidden={true} />

      <Card member={member} customClassName={'sm:translate-x-[110%]'} />
    </div>
  )
}