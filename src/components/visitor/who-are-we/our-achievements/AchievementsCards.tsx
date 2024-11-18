import React from 'react'
import ButtonDropdown from '../../../ButtonDropdown'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import DateRangeSelector from './DateRangeSelector'

const CATEGORIES = [
    {
        id:1,
        name: "All themes"
    },
    {
        id:2,
        name: "Conservation Marine"
    },
    {
        id:3,
        name: "Tourisme Responsable"
    },
    {
        id:4,
        name: "Peche Durable"
    },
    {
        id:5,
        name: "Ecologie et Environmenet"
    },
    {
        id:6,
        name: "Education et Formation"
    }
]

export default function AchievementsCards() {
  return (
    <section className='flex justify-center w-full relative z-10'>
    <div className='flex gap-8'>  

  <ButtonDropdown
    item={<DateRangeSelector />}
    position="left"
    renderItem={(item) => (
        <div className='py-1'>{item.name}</div>
    )}
  >
    {(isOpen) => (
      <button className={`flex items-center gap-2  underline-offset-4 border-black border-2 rounded-full px-6 py-2`}>
        Published at
        <ChevronDownIcon className={`w-6 h-6 duration-200 ${isOpen ? "-rotate-180" : ""}`} />
      </button>
    )}
  </ButtonDropdown> 
  
    <ButtonDropdown
    items={CATEGORIES}
    position="left"
    renderItem={(item) => (
        <div className='py-1 px-4'> {item.name}</div>
    )}
  >
    {(isOpen) => (
      <button className={`flex items-center gap-2  underline-offset-4 border-black border-2 rounded-full px-6 py-2`}>
        Theme
        <ChevronDownIcon className={`w-6 h-6 duration-200 ${isOpen ? "-rotate-180" : ""}`} />
      </button>
    )}
  </ButtonDropdown> 
   </div>
    </section>
  )
}
