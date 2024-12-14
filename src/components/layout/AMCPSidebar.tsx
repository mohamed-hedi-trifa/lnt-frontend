import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/solid';
import React, { useState, useRef, useEffect } from 'react';

const Sidebar = () => {
  const items = [
    {
      label: "Présentation",
      items: [
        {
          label: "Aire Marine et Côtière Protégée des Îlots Nord de l'archipel de Kerkennah (AMCP)",
          path: "/who-are-we/presentation/amcp"
        },
        {
          label: "Partenaires AMCP",
          path: "/who-are-we/presentation/partners"
        }
      ]
    },
    {
      label: "Suivi Scientifique",
      items: [
        {
          label: "Suivi Marin",
          path: "/aire-marine/suivie/marin"
        },
        {
          label: "Suivi Terrestre",
          path: "/aire-marine/suivie/terrestre"
        }
      ]
    },
    {
      label: "Formation et Campement Scientifique",
      path: "/achievements"
    },
    {
      label: "L’équipe",
      path: "/team"
    }
  ];  

  const [opened, setOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const submenuRefs = useRef<(HTMLUListElement | null)[]>([]);

  const toggleSubmenu = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (activeIndex === null) return; // If none is open, do nothing
    const ul = submenuRefs.current[activeIndex];
    if (!ul) return;

    const isOpen = activeIndex !== null;
    // We'll open/close only the currently active submenu

    // Reset transition
    ul.style.transition = 'none';
    ul.style.overflow = 'hidden';

    if (isOpen) {
      // Opening sequence
      ul.style.height = '0px';
      // Force reflow
      ul.offsetHeight; 
      ul.style.transition = 'height 300ms ease';
      requestAnimationFrame(() => {
        ul.style.height = ul.scrollHeight + 'px';
      });
    } else {
      // Closing sequence (though activeIndex === null means no submenu is active)
      ul.style.height = ul.scrollHeight + 'px';
      ul.offsetHeight;
      ul.style.transition = 'height 300ms ease';
      requestAnimationFrame(() => {
        ul.style.height = '0px';
      });
    }
  }, [activeIndex]);

  // Handle closing transition in a separate effect
  // When activeIndex changes to null, close the previously open submenu
  useEffect(() => {
    if (activeIndex !== null) return;
    // If activeIndex is null, find the previously open submenu and close it
    submenuRefs.current.forEach((ul) => {
      if (ul && ul.style.height !== '0px') {
        ul.style.transition = 'none';
        ul.offsetHeight;
        ul.style.transition = 'height 300ms ease';
        requestAnimationFrame(() => {
          ul.style.height = '0px';
        });
      }
    });
  }, [activeIndex]);

  return (
    <div className='mx-auto sticky top-[65px] sm:top-[120px] h-[100px] sm:h-fit w-[366px] shrink-0 z-20'>
      <div className='h-fit'>
        <div
          className={`flex flex-col ${opened ? "gap-6" : "gap-0"} sm:gap-8 transition-all duration-300 p-4 sm:p-8 py-2 sm:py-12 rounded-3xl sm:rounded-[20px] text-white`}
          style={{ background: 'linear-gradient(90deg, #51ADC6 0%, #006E9F 100%)' }}
        >
          <section className='flex justify-between w-full items-center'>
            <div className='flex flex-col sm:gap-8'>
              <h2 className="text-[20px] sm:text-2xl font-bold">Air Marine et Côtière Protégée</h2>
              <div className='font-medium sm:hidden'>Menu de section</div>
            </div>
            <div className='sm:hidden'>
              <button onClick={() => setOpened(!opened)}>
                <Bars3Icon className='h-8 w-8 text-black' />
              </button>
            </div>
          </section>

          <ul className={`flex flex-col gap-8 overflow-hidden transition-all duration-300 ${opened ? "h-[320px] sm:h-fit" : "h-0 sm:h-fit"}`}>
            {items.map((item, index) => {
              const hasSubmenu = !!item.items;
              const isOpen = activeIndex === index;
              return (
                <li key={index} className="flex flex-col">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => hasSubmenu && toggleSubmenu(index)}
                  >
                    <div className='h-6 w-6 rounded-full bg-primary flex justify-center items-center shrink-0'>
                      <ChevronRightIcon className={`h-4 w-4 transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                    </div>
                    <a className="sm:text-xl font-semibold" href={item.path ? "/en" + item.path : "#"}>{item.label}</a>
                  </div>

                  {hasSubmenu && (
                    <ul
                      ref={el => submenuRefs.current[index] = el}
                      className="relative pl-8 mt-2 flex flex-col gap-4 overflow-hidden"
                      style={{ height: '0px' }}
                    >
                      {item.items!.map((subItem, subIndex) => (
                        <li key={subIndex} className="relative flex items-center gap-2 ml-[14px]">
                          {/* A small horizontal line connecting the icon to the vertical line */}
                          <span className="absolute left-[-1rem] top-1/2 -translate-y-1/2 w-4 h-[2px] bg-white"></span>
                          
                          <div className='h-4 w-4 rounded-full bg-white flex justify-center items-center z-10 shrink-0'>
                            <ChevronRightIcon className='h-3 w-3 text-primary' />
                          </div>
                          <a className="sm:text-lg font-medium" href={"/en" + subItem.path}>{subItem.label}</a>
                        </li>
                      ))}
                      {hasSubmenu && (
                        <div className='absolute ml-[-32px] w-[32px] flex justify-end h-full'>
                          <div className='bg-white h-[calc(100%-14px)] w-[2px]'></div>
                        </div>
                      )}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
