import React from "react";
import LangLink from "./LangLink";
import { Accordion, AccordionBody, AccordionTitle } from "./Accordion";

type AccordionNavType = { items: any[]; level?: number; renderItem?: (item: any, level: number, isOpen: boolean) => any };

export default function AccordionNav({ items, level = 1, renderItem = (item) => item.label }: AccordionNavType) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <div className="">
      {items.map((item, index) => {
        const hasSubmenu = !!item.items;
        const isOpen = activeIndex === index;

        if (hasSubmenu) {
          return (
            <div>
              <Accordion open={isOpen}>
                <AccordionTitle className="cursor-pointer" onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}>
                  {renderItem(item, level, isOpen)}
                </AccordionTitle>
                <AccordionBody>
                  <AccordionNav items={item.items} level={level + 1} renderItem={renderItem} />
                </AccordionBody>
              </Accordion>
            </div>
          );
        }

        return <LangLink to={item.path}>{renderItem(item, level, isOpen)}</LangLink>;
      })}
    </div>
  );
}
