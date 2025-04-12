import formatDate from '@/lib/formatDate';
import IAchievemnt from '@/models/IAchievement';
import React from 'react';

interface AchievementCardHomeProps {
  achievement: IAchievemnt;
}

export default function AchievementCardHome({ achievement }: AchievementCardHomeProps) {
  // Ensure themes is always an array
  const themesArray = Array.isArray(achievement.themes) ? achievement.themes : [];
  const truncateText = (text: string, limit = 120): string => {
    if (!text) return "";
    if (text.length <= limit) return text;
    const lastSpaceIndex = text.lastIndexOf(" ", limit);
    const cutIndex = lastSpaceIndex > 0 ? lastSpaceIndex : limit;
    return text.slice(0, cutIndex) + "...";
  };


  const titleText = achievement.title_fr || achievement.title_en || "";
  const truncatedTitle = truncateText(titleText, 120);
  return (
    <div className="border rounded-lg overflow-hidden h-[450px] w-[380px] flex flex-col shadow-lg">
      <div className="w-full h-48 flex-shrink-0">
        <img
          src={`${process.env.GATSBY_API_URL}${achievement.image}`}
          alt="achievement"
          className="h-full w-full object-cover "
        />
      </div>  
      <div className="px-3 py-4 flex flex-col flex-grow justify-between">
      {/* Themes: flex-wrap so they wrap on new line if many */}
      <div className="flex gap-4 flex-wrap mt-3">
        {themesArray.map((theme) => {
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
      <div className="text-xl font-semibold mt-3">
        {truncatedTitle}
      </div>

      {/* Date at the bottom */}
      <div className="text-[#97989F] mt-auto">{formatDate(achievement.date)}</div>
      </div>
    </div>
  );
}
