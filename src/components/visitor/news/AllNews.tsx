import React, { useEffect, useState } from 'react'
import HeaderSection from './HeaderSection'
import LeftSidebar from './LeftSidebar'

import NewsCards from './NewsCards'
import { Link } from 'gatsby';

export default function AllNews() {




  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      document.querySelector("body")!.style.overflow = "hidden";
    } else {
      document.querySelector("body")!.style.overflow = "visible";
    }
  })


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
      <div className='px-5'>
        <HeaderSection headerName="Toutes les Actualités" />
      </div>


      <div className='flex justify-between gap-5 mt-10'>
        <LeftSidebar isOpened={isOpened} setIsOpened={setIsOpened} />

        <section className="flex-1">

            <NewsCards />

        </section>
      </div>

    </div>
  )
}
