import React, { useEffect, useState } from "react";
import { SortableContainer } from "react-sortable-hoc";
import ContentItem from "./ContentItem";

const ItemsList = SortableContainer(({ handleItemContentChange, items, setItems, language }) => {

    return (
        <ul className="shadow">
            {items?.map((item, index) => (
                <ContentItem
                    collection="item"
                    key={`item-${index}`}
                    index={index}
                    handleItemContentChange={handleItemContentChange}
                    item={item}
                    idx={index}
                    items={items}
                    setItems={setItems}
                    language={language}
                />
            ))}
        </ul>
    );
});

export default ItemsList;
