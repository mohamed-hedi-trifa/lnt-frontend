import React from 'react';
import Title from '@/components/atoms/titles/Title';
import PageParagraph2 from '@/components/atoms/PageParagraph2';

interface SectionHeaderProps {
  title: React.ReactNode;
  text: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, text }) => {
  return (
    <div className="flex flex-col items-center text-center justify-center py-10">
      <Title size="text-2xl sm:text-[36px] pb-4">
        {title}
      </Title>
      <PageParagraph2>
        <p className="font-semibold text-lg sm:text-[20px] text-center max-w-3xl mx-auto">
          {text}
        </p>
      </PageParagraph2>
    </div>
  );
};

export default SectionHeader;
