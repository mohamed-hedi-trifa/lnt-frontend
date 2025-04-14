import React, { ReactNode } from 'react';

export default function SpeciesTitle({
  title,
  color,
  fontSize = "text-6xl sm:text-7xl",
  spacing,
}: {
  title: string | ReactNode;
  color?: string;
  fontSize?: string;
  spacing?: string;
}) {
  return (
    <section
      className={`${spacing ? spacing : "mt-8"} flex justify-center text-center max-w-5xl mx-auto w-full`}
    >
      <div className="flex flex-col items-center">
        <h1
          className={`font-bold not-italic ${fontSize} drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(231,244,247,0.8) 50%, rgba(81,173,198,0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            // textShadow: '0px -8px 80px rgba(0, 0, 0, 0.07), 0px -2.92px 29.2px rgba(0, 0, 0, 0.05), 0px -1.42px 14.18px rgba(0, 0, 0, 0.04), 0px -0.69px 6.95px rgba(0, 0, 0, 0.03), 0px -0.27px 2.75px rgba(0, 0, 0, 0.02)',
            letterSpacing: '0.05em',
            textAlign: 'center',
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}