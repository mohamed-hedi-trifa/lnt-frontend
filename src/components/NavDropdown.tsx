import { Transition } from "@headlessui/react";
import React, { useRef, useState } from "react";

type Props = {
  children: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  items?: any[];
  renderItem?: (item: any) => React.ReactNode;
  position?: "left" | "right";
  containerClassName?: string;
};

function NavDropdown({ children, items = [], renderItem = (item) => item.label, position = "left", containerClassName = "" }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleMouseEnter(e: React.FormEvent) {
    setIsOpen(true);
  }

  function handleMouseLeave() {
    setIsOpen(false);
  }

  return (
    <div
      className={`relative ${containerClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <button
        className={`relative block font-open font-normal capitalize transition duration-300 before:w-full before:h-[25px] before:absolute before:top-[95%] ${
          isOpen ? "before:block" : "before:hidden"
        }  `}
      >
        {typeof children === "function" ? children(isOpen) : children}
        {/* {children}
        <FontAwesomeIcon icon={faChevronDown} className={`ml-2 text-sm transition duration-300 ${isOpen ? "-rotate-180" : ""}`} /> */}
      </button>

      <Transition
        show={isOpen}
        enter="transition duration-300"
        enterFrom="opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition duration-300"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="opacity-0"
      >
        <ul
          className={`w-max max-w-[500px] rounded shadow-[1px_1px_5px_rgb(0,0,0,.3)] absolute top-full bg-zinc-100 translate-y-[12px] list-none ${POSITIONS[position]}`}
        >
          {items.map((item, index) => (
            <li key={index}>
              {/* <Link href={item.path || ""} className="p-1 rounded block font-normal hover:bg-slate-100 transition duration-300">
                {item.label}
              </Link> */}
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </Transition>
    </div>
  );
}

export default NavDropdown;

const POSITIONS = {
  left: "left-[0]",
  right: "right-[0]",
};
