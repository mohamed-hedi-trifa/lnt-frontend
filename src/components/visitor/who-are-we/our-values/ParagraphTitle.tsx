import React from 'react';

interface PageTitleProps {
  title: string;
  width?: string;
  color?: string; // Color as a prop
}

export default function ParagraphTitle({ title, width, color = '#0270A0' }: PageTitleProps) {
  return (
    <section className="">
      <div className="flex flex-col items-start">
        <div className="flex flex-col md:items-start ">
          <div className="">
            <h1
              className="font-bold text-[38px] sm:text-[40px] sm:px-[0px] "
              style={{ color }}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
