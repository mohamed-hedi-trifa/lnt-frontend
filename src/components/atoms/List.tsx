import React from 'react';

type ListItemProps = {
  items: {
    title: string;
    content: string;
  }[];
  spacing?:string;
};

const List: React.FC<ListItemProps> = ({ items, spacing }) => {
  return (
    <ul className={`flex flex-col gap-2 text-justify pl-4 ${spacing}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start text-lg sm:text-xl">
          <span className="mr-2 text-lg font-semibold">•</span>
          <div>
            <span className="font-semibold">{item.title}</span> {item.content}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
