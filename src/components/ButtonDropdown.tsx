import { Transition } from "@headlessui/react";
import React, { ReactNode, useRef, useState } from "react";

type Props = {
  children: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  items?: any[];
  item?: ReactNode;
  renderItem?: (item: any) => React.ReactNode;
  onSelect?: (item: any) => void;
  position?: "left" | "right";
  customDropdown?: boolean;
};

function ButtonDropdown({
  children,
  items = [],
  item,
  renderItem = (item) => item.label,
  onSelect,
  position = "left",
  customDropdown = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  function handleClick(e: any) {
    if (e.target.closest(".rdrDateRangeWrapper")) {
      return;
    }
    setIsOpen(!isOpen);
  }

  return (
    <button className="relative" onClick={handleClick}>
      <div
        className={`relative font-open font-normal capitalize transition duration-300 before:w-full before:h-[20px] before:absolute before:top-[95%] ${isOpen ? "before:block" : "before:hidden"}`}
        ref={dropdownRef}
      >
        {typeof children === "function" ? children(isOpen) : children}
      </div>
      <Transition
        show={isOpen}
        enter="transition duration-300"
        enterFrom="translate-y-[30px] opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition duration-300"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-[30px] opacity-0"
      >
        {customDropdown ? (
          <div onClick={() => { if (onSelect && item) onSelect(item); setIsOpen(false); }}>
            {renderItem(item)}
          </div>
        ) : (
          <ul className={`divide-y w-max max-w-[200px] p-2 rounded shadow-[1px_1px_5px_rgb(0,0,0,.3)] absolute top-full bg-white translate-y-[10px] list-none ${POSITIONS[position]}`}>
            {items && items.map((dropdownItem, index) => (
              <li
                key={index}
                onClick={() => { if (onSelect) onSelect(dropdownItem); setIsOpen(false); }}
              >
                {renderItem(dropdownItem)}
              </li>
            ))}
            {item ? (
              <li onClick={() => { if (onSelect) onSelect(item); setIsOpen(false); }}>
                {renderItem(item)}
              </li>
            ) : null}
          </ul>
        )}
      </Transition>
    </button>
  );
}

export default ButtonDropdown;

const POSITIONS = {
  left: "left-[0]",
  right: "right-[0]",
};
