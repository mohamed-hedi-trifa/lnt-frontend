import { Link } from 'gatsby';
import React from 'react';
import ITraining from '@/models/ITraining';
import formatDate from '@/lib/formatDate';


interface TrainingCardProps {
  training: ITraining
}

export default function TrainingCard({ training }: TrainingCardProps) {
    return (
        <div className="bg-white shadow-helmi p-4 flex flex-col gap-4 rounded-xl min-h-[420px] h-full">
            <img 
                src={`${process.env.GATSBY_API_URL}${training.image}`} 
                alt={training.title_en || training.title_fr} 
                className='h-[240px] w-full object-cover rounded-md shadow-lg' 
            />
            
            <div className="flex gap-4 flex-wrap">
                {training.themes?.map((theme) => {
                  const themeName = theme.name_fr || theme.name_en || 'N/A';
                  return (
                    <div
                      key={theme.id}
                      className="bg-[#4B6BFB0D] text-[#006E9F] text-sm font-medium py-1 px-3 rounded-md"
                    >
                      {themeName}
                    </div>
                  );
                })}
            </div>
            
            <div className="text-xl font-semibold">
                {training.title_fr || training.title_en || 'No Title'}
            </div>        
            <div className='text-[#97989F] mt-auto'>{training.created_at ? formatDate(training.created_at) : ''}</div>
            
        </div>
    );
}
