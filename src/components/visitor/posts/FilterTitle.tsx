import React from "react";

interface FilterTitleProps {
  title: string;
}

const FilterTitle: React.FC<FilterTitleProps> = ({ title }) => {
  return (
    <div className='flex h-[59px] items-center bg-[#050101B2]'>
                                  <div className='bg-primary h-full w-2'></div>
                                  <div className=' text-white px-4 font-[Montserrat] font-extrabold'>{title}</div>
                                  </div>
  );
};

export default FilterTitle;
