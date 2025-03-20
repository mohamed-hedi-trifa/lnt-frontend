// NEW: ItemsList.tsx
import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import ContentItem from "./ContentItem";

const ItemsList = ({
  handleItemContentChange,
  items,
  setItems,
  language,
  route,
  handleChange, // Add handleChange to props
  formData,
  setdisplayCinButton
}: {
  handleItemContentChange: (idx: number, e: any) => void;
  items: any[];
  setItems: (items: any[]) => void;
  language: string;
  route: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Make it optional
  formData: any[];
  setdisplayCinButton: any;
}) => {  
  // This function replaces onSortEnd from react-sortable-hoc
// ItemsList.tsx
const handleDragEnd = (event:any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
  
    // 1. Move items in array
    let newItems = arrayMove(items, oldIndex, newIndex);
  
    // 2. Update the .order property on each item
    newItems = newItems.map((item, index) => ({
      ...item,
      order: index, // or whatever logic you want for "order"
    }));
  
    // 3. Now store them in state
    setItems(newItems);
  };
  
  console.log(items)

  return (
    <DndContext 
      collisionDetection={closestCenter} 
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        // IMPORTANT: Each item here MUST have a unique "id" property
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="shadow">
          {items?.map((item, index) => (
            <ContentItem
              key={item.id}
              id={item.id} // we pass the unique id to useSortable
  
              item={item}
              idx={index}
              items={items}
              setItems={setItems}
              handleItemContentChange={handleItemContentChange}
              language={language}
              route= {route}
              handleChange={handleChange}
              formData={formData}
              setdisplayCinButton={setdisplayCinButton}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default ItemsList;
