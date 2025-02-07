import React from 'react'
import HeaderSection from './HeaderSection'
import LeftSidebar from './LeftSidebar'
import ButtonDropdown from '@/components/ButtonDropdown'
import sortIcon from "@/assets/icons/sort-icon.png"
import FilterIcon from '@/assets/icons/FilterIcon'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'
import NewCards from './NewsCards'

export default function AllNews() {
  const CATEGORIES = [
    {
      id: 1,
      name: "All themes"
    },
    {
      id: 2,
      name: "Conservation Marine"
    },
    {
      id: 3,
      name: "Tourisme Responsable"
    },
    {
      id: 4,
      name: "Peche Durable"
    },
    {
      id: 5,
      name: "Ecologie et Environmenet"
    },
    {
      id: 6,
      name: "Education et Formation"
    }
  ]
  return (
    <div className='mt-10 w-full '>
      <HeaderSection headerName="Toutes les Actualités" />

      <div className='flex justify-between gap-5 mt-10'>
        <LeftSidebar />

        <section className="flex-1">
          <div className='hidden sm:flex justify-between relative z-20'>
            <ButtonDropdown
              items={CATEGORIES}
              position="left"
              renderItem={(item) => (
                <div className='py-1 px-4'> {item.name}</div>
              )}
            >
              {(isOpen) => (
                <button className="h-12 rounded-[10px] border-2 border-black justify-center items-center flex w-fit">
                  <div className="px-2 py-1.5 justify-center items-center gap-2 flex">
                    <div className='text-primary'> <img src={sortIcon} className='size-6' /> </div>
                    <div className="text-center text-black text-xl font-medium font-['Montserrat'] leading-tight tracking-tight">Trier</div>
                    <div className={`w-6 h-6 relative transition duration-200 ${isOpen ? "-rotate-180" : ""}`}><ArrowDownIcon /></div>
                  </div>
                </button>
              )}
            </ButtonDropdown>

            <div className="text-center text-black text-xl font-semibold font-['Montserrat'] leading-tight tracking-tight mt-[2px]">1 - 12 de 150 Publication</div>
          </div>
          <div className='sm:hidden flex justify-between pr-5 relative z-20'>
            <button type='button' className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl justify-start items-center gap-2.5 inline-flex">
              <FilterIcon />
              <div className="text-center text-white text-sm font-bold font-['Montserrat']">Filtres</div>
            </button>
            <ButtonDropdown
              items={CATEGORIES}
              position="right"
              renderItem={(item) => (
                <div className='py-1 px-4'> {item.name}</div>
              )}
            >
              {(isOpen) => (
                <button className="h-12 rounded-[10px] border-2 border-black justify-center items-center flex w-fit">
                  <div className="px-2 py-1.5 justify-center items-center gap-2 flex">
                    <div className='text-primary'> <img src={sortIcon} className='size-6' /> </div>
                    <div className="text-center text-black text-xl font-medium font-['Montserrat'] leading-tight tracking-tight">Trier</div>
                    <div className={`w-6 h-6 relative transition duration-200 ${isOpen ? "-rotate-180" : ""}`}><ArrowDownIcon /></div>
                  </div>
                </button>
              )}
            </ButtonDropdown>
          </div>
          <div className='sm:hidden px-5 font-semibold leading-[20px] pt-5'>1 - 12 de 150 Publication</div>
          <NewCards />
        </section>
      </div>

    </div>
  )
}
