import React, { useState } from 'react'
import ButtonDropdown from '../../../ButtonDropdown'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import DateRangeSelector from './DateRangeSelector'
import AchievementCard from './AchievementCard'
import achievementsHero from "../../../../images/achievements-hero.jpg";
import Pagination from '../../Pagination'

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

const ACHIEVEMENTS = [
  {
    id:1,
    categories: ["Art et Patrimoine", "Formation"],
    title:"Kerkennah: Une Jeunesse Qui Reve et Cree le Changement",
    img: achievementsHero,
    date: new Date()
  },
  {
    id:2,
    categories: ["Art et Patrimoine", "Formation"],
    title:"Kerkennah: Une Jeunesse Qui Reve et Cree le Changement",
    img: achievementsHero,
    date: new Date()
  },
  {
    id:3,
    categories: ["Art et Patrimoine", "Formation"],
    title:"Kerkennah: Une Jeunesse Qui Reve et Cree le Changement",
    img: achievementsHero,
    date: new Date()
  },
  {
    id:4,
    categories: ["Art et Patrimoine", "Formation"],
    title:"Kerkennah: Une Jeunesse Qui Reve et Cree le Changement",
    img: achievementsHero,
    date: new Date()
  },
  {
    id:5,
    categories: ["Art et Patrimoine", "Formation"],
    title:"Kerkennah: Une Jeunesse Qui Reve et Cree le Changement",
    img: achievementsHero,
    date: new Date()
  },
  {
    id:6,
    categories: ["Art et Patrimoine", "Formation"],
    title:"Kerkennah: Une Jeunesse Qui Reve et Cree le Changement",
    img: achievementsHero,
    date: new Date()
  },
  {
    id:7,
    categories: ["Art et Patrimoine", "Formation"],
    title:"Kerkennah: Une Jeunesse Qui Reve et Cree le Changement",
    img: achievementsHero,
    date: new Date()
  },
  {
    id:8,
    categories: ["Art et Patrimoine", "Formation"],
    title:"Kerkennah: Une Jeunesse Qui Reve et Cree le Changement",
    img: achievementsHero,
    date: new Date()
  },
  {
    id:9,
    categories: ["Art et Patrimoine", "Formation"],
    title:"Kerkennah: Une Jeunesse Qui Reve et Cree le Changement",
    img: achievementsHero,
    date: new Date()
  },
  {
    id:10,
    categories: ["Art et Patrimoine", "Formation"],
    title:"Kerkennah: Une Jeunesse Qui Reve et Cree le Changement",
    img: achievementsHero,
    date: new Date()
  },
  {
    id:11,
    categories: ["Art et Patrimoine", "Formation"],
    title:"Kerkennah: Une Jeunesse Qui Reve et Cree le Changement",
    img: achievementsHero,
    date: new Date()
  },
  {
    id:12,
    categories: ["Art et Patrimoine", "Formation"],
    title:"Kerkennah: Une Jeunesse Qui Reve et Cree le Changement",
    img: achievementsHero,
    date: new Date()
  },
]

export default function AchievementsCards() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = 5;

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className='flex flex-col gap-8 w-full relative z-10 my-10'>
    <div className='flex gap-8 justify-center'>  

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

   <div className='grid sm:grid-cols-3 gap-4'>
{ACHIEVEMENTS.map((achievement:any)=><AchievementCard key={achievement.id} achievement={achievement} />)}
   </div>

<div className='flex justify-center'><Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /></div>
    </section>
  )
}
