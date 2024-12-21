import React from 'react';

type ListItemProps = {
  items: {
    title: string;
    content: string;
  }[];
};

const List: React.FC<ListItemProps> = ({ items }) => {
  return (
    <ul className="flex flex-col gap-4">
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
