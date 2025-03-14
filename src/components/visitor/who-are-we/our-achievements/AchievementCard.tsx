import formatDate from '@/lib/formatDate';
import IAchievemnt from '@/models/IAchievement';
import React from 'react';

interface AchievementCardProps {
  achievement: IAchievemnt
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <div className="bg-white shadow-helmi p-4 flex flex-col gap-4 rounded-xl min-h-[420px] h-full">
      {/* Adjust the image URL if needed for your backend */}
      <img
        src={`${process.env.GATSBY_API_URL}${achievement.image}`}
        alt="achievement"
        className="h-[240px] w-full object-cover rounded-md shadow-lg"
      />

      {/* Themes: flex-wrap so they wrap on new line if many */}
      <div className="flex gap-4 flex-wrap">
        {achievement.themes?.map((theme) => {
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

      {/* Title */}
      <div className="text-xl font-semibold">
        {achievement.title_fr || achievement.title_en || 'No Title'}
      </div>

      {/* Date at the bottom */}
      <div className="text-[#97989F] mt-auto">{formatDate(achievement.date)}</div>
    </div>
  );
}
